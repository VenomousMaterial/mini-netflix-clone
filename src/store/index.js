import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'

import {
  OMDB_URL_ID,
  OMDB_URL_SEARCH,
  OMDB_API_KEY_PARAM
} from '@/constants/urls'

Vue.use(Vuex)

export const state = {
  fetchedMovies: [],
  fetchedMovieIds: [],
  selectedMovieId: null
}

export const mutations = {
  setMovies: (state, payload) => { state.fetchedMovies = payload },
  setMovieIds: (state, payload) => { state.fetchedMovieIds = payload },
  setSelectedMovieId: (state, payload) => { state.selectedMovieId = payload },

  addMovieToList: (state, payload) => {
    state.fetchedMovies.push(payload)
    state.fetchedMovieIds.push(payload.imdbID)
  },

  addMovieDetailsToexisting: (state, payload) => {
    console.log('test', payload)
    const selectedIndex = state.fetchedMovies.findIndex((movie) => {
      return movie.imdbID === state.selectedMovieId
    })
    state.fetchedMovies[selectedIndex] = payload
  },
}

export const actions = {
  fetchInitialMovies: async ({ commit }) => {
    await axios.get(OMDB_URL_SEARCH + 'christmas' + OMDB_API_KEY_PARAM)
      .then((response) => {
        const movieIds = response.data.Search.map((movie) => {
          return movie.imdbID
        })
        commit('setMovieIds', movieIds)
        commit('setMovies', response.data.Search)
      }).catch((error) => {
        // in a production app, this is where error logging would take place
        console.log(error)
      })
  },

  // work on saving the detailed data after fetching it,
  // then displaying it in the movie view

  fetchMovieById: async ({ commit, getters }, movieId) => {
    if (!getters.getSelectedMovieById.detailed) {
      try {
        return await axios.get(
          OMDB_URL_ID + movieId + OMDB_API_KEY_PARAM
        ).then((response) => {
          if (getters.getFetchedIds.includes(movieId)) {
            response.data.detailed = true
            console.log('gerer', response.data)
            commit('addMovieDetailsToexisting', response.data)
          } else {
            commit('addMovieToList', response.data)
          }
          commit('setSelectedMovieId', movieId)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },

  selectMovieById: ({ commit }, movieId) => {
    commit('setSelectedMovieId', movieId)
    router.push(`/movie/${movieId}`)
  }
}

export const getters = {
  getFetchedMovies: state => { return state.fetchedMovies },
  getFetchedIds: state => { return state.fetchedMovieIds },
  getSelectedMovieId: state => { return state.selectedMovieId },

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
