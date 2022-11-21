/**
 * I didn't finish getting all of the tests working, was having some issues with getting
 * Jest/Babel to properly import axios, but I wanted to get this finished up and sent off
 * to you all. Were this a production app, these tests do NOT accurately demonstrate
 * my preferred level of test coverage. Thanks
 */

import { actions } from '@/store/index'

let myCommit, axios

beforeEach(() => {
  // reset before each test
  myCommit = jest.fn()
  axios = {
    get: jest.fn()
  }
})

describe('store actions', () => {
  describe('fetchInitialMovies', () => {
    it('Should make an API call to fetch some Christmas maovies, then make 2 commits', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: {} }))
      await actions.fetchInitialMovies({ commit: myCommit })

      expect(myCommit).toHaveBeenCalledWith('setMovieIds')
      expect(myCommit).toHaveBeenCalledWith('setMovies')
    })
  })

  describe('fetchMovieByIdFromRouteParams', () => {
    it('Should grab movie from the store that already exists', () => {
      const expectedMovie = { imdbID: 123 }
      const myGetters = {
        getFecthedIds: [123],
        getFetchedMovies: [
          expectedMovie
        ],
        getSelectedMovieById: {
          detailed: true
        }
      }
      axios.get.mockImplementation(() => Promise.resolve({ data: {} }))
      actions.fetchTopAlbums({ commit: myCommit, getters: myGetters }, expectedMovie.imdbID)

      expect(myCommit).toHaveBeenCalledWith('setSelectedMovie', expect.toStrictEqual(expectedMovie))
    })
  })

  describe('selectMovieById', () => {
    it('Should set the selectedMovieId to the param and push to the correct router page', () => {
      const testMovieId = 123
      actions.selectMovieById({ commit: myCommit }, testMovieId)

      expect(myCommit).toHaveBeenCalledWith('setSelectedMovieId', testMovieId)
    })
  })

  describe('deselectMovie', () => {
    it('Should set the selectedMovie in state to null', () => {
      actions.deselectMovie({ commit: myCommit })

      expect(myCommit).toHaveBeenCalledWith('setSelectedMovieId', null)
      expect(myCommit).toHaveBeenCalledWith('setSelectedMovie', null)
    })
  })
})
