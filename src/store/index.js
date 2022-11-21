import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import { fetchMovieById, fetchChristmasMovies } from '@/services/moviesService'

Vue.use(Vuex)

export const state = {
  fetchedMovies: [],
  fetchedMovieIds: [],
  selectedMovieId: null,
  selectedMovie: null
}

export const mutations = {
  setMovies: (state, payload) => { state.fetchedMovies = payload },
  setMovieIds: (state, payload) => { state.fetchedMovieIds = payload },
  setSelectedMovieId: (state, payload) => { state.selectedMovieId = payload },
  setSelectedMovie: (state, payload) => { state.selectedMovie = payload },

  addMovieToList: (state, payload) => {
    state.fetchedMovies.push(payload)
    state.fetchedMovieIds.push(payload.imdbID)
  },

  addMovieDetailsToexisting: (state, payload) => {
    const selectedIndex = state.fetchedMovies.findIndex((movie) => {
      return movie.imdbID === payload.imdbID
    })
    state.fetchedMovies[selectedIndex] = payload
  },
}

export const actions = {
  fetchInitialMovies: async ({ commit }) => {
    const christmasMovies = await fetchChristmasMovies()
    const christmasMovieIds = christmasMovies.map((movie) => {
      return movie.imdbID
    })
    commit('setMovieIds', christmasMovieIds)
    commit('setMovies', christmasMovies)
  },

  fetchMovieByIdFromRouteParams: async ({ commit, getters }, movieId) => {
    commit('setSelectedMovieId', movieId)
    /**
     * 3 possible scenarios
     *
     * 1 - movie is not previously fetched at all
     * 2 - previously fetched for home page, but lacks extra details
     * 3 - previously fetched for details page and has extra details
     */
    if (!getters.getFetchedIds.includes(movieId)) {
      const newMovie = await fetchMovieById(movieId)
      commit('addMovieToList', newMovie)
      commit('setSelectedMovie', newMovie)
    } else if (!Object.keys(getters.getSelectedMovieById).includes('detailed')) {
      const newMovieData = await fetchMovieById(movieId)
      commit('addMovieDetailsToexisting', newMovieData)
      commit('setSelectedMovie', newMovieData)
    } else {
      // if we've gotten to this point, then we know that it's already got details, so just load it
      const movie = getters.getFetchedMovies.find((movie) => movie.imdbID === movieId)
      commit('setSelectedMovie', movie)
    }
  },

  selectMovieById: ({ commit }, movieId) => {
    commit('setSelectedMovieId', movieId)
    router.push(`/movie/${movieId}`)
  },

  deselectMovie: ({ commit }) => {
    commit('setSelectedMovieId', null)
    commit('setSelectedMovie', null)
  }
}

export const getters = {
  getFetchedMovies: state => { return state.fetchedMovies },
  getFetchedIds: state => { return state.fetchedMovieIds },
  getSelectedMovie: state => { return state.selectedMovie },

  getSelectedMovieById: state => {
    return state.fetchedMovies.find((movie) => {
      return movie.imdbID === state.selectedMovieId
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
