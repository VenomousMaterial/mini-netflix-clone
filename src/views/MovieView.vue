<template>
  <div class="movie-view">
    <div
      v-if="getSelectedMovie"
      class="movie-view__container"
    >
      <h1 class="movie-view__title">{{getSelectedMovie.Title}} ({{getSelectedMovie.Year}})</h1>
      <img
        :src="getSelectedMovie.Poster"
        class="movie-view__poster"
      />
      <div class="movie-view__ratings">
        <div>IMDB Rating: {{getSelectedMovie.imdbRating}}</div>
        <div>Rated: {{getSelectedMovie.Rated}}</div>
      </div>
      <div class="movie-view__plot">{{getSelectedMovie.Plot}}</div>
    </div>
    <div
      v-if="!getSelectedMovie"
      class="movie-view__container"
    >
      <h1 class="movie-view__title">Movie Not Yet Loaded</h1>
      <div class="movie-view__poster placeholder"></div>
      <div class="movie-view__ratings">
        <div>IMDB Rating: 0.0</div>
        <div>Rated: N/A</div>
      </div>
      <div class="movie-view__plot"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'MovieView',

  computed: {
    ...mapGetters(['getSelectedMovieById', 'getSelectedMovie'])
  },

  methods: {
    ...mapActions(['fetchMovieByIdFromRouteParams', 'deselectMovie'])
  },

  created () {
    this.fetchMovieByIdFromRouteParams(router.history.current.params.id)
  },

  destroyed () {
    this.deselectMovie()
  }
}

</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

  .movie-view {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .movie-view__container {
      flex-direction: column;
      display: flex;
      align-items: center;
      width: 500px;
      background-color: $movie-card-background-color;
      border: 1px solid $movie-card-border-color;
      border-radius: 15px;
      margin: 15px;
      padding: 15px;
      .movie-view__title {
        text-decoration: underline;
      }
      .movie-view__poster {
        width: 300px;
        height: 444px;
      }
      .movie-view__poster.placeholder {
        width: 298px;
        height: 442px;
        background: darkgray;
        border: 1px solid black;
      }
      .movie-view__ratings {
        padding: 5px 0px 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
      }
      .movie-view__plot {
        padding-top: 15px;
        font-size: 24px;
      }
    }
  }
</style>
