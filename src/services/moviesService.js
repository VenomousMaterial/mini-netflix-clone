import axios from 'axios'

import {
  OMDB_URL_ID,
  OMDB_URL_SEARCH,
  OMDB_API_KEY_PARAM
} from '@/constants/urls'

export const fetchMovieById = async (movieId) => {
  return await axios.get(
    OMDB_URL_ID + movieId + OMDB_API_KEY_PARAM
  ).then(
    (response) => { return { detailed: true, ...response.data } }
  ).catch(
    (error) => {
      // in a production app, this is where error logging would take place
      console.log(error)
    }
  )
}

export const fetchChristmasMovies = async () => {
  return await axios.get(
    OMDB_URL_SEARCH + 'christmas' + OMDB_API_KEY_PARAM
  ).then(
    (response) => response.data.Search
  ).catch(
    (error) => {
      // in a production app, this is where error logging would take place
      console.log(error)
    }
  )
}
