<template>
  <div
    @click="selectMovieById(movieId)"
    class="movie-tile"
  >
    <div class="movie-tile__poster">
      <img :src="imgUrl" />
    </div>
    <div class="movie-tile__title">{{ title }} ({{ year }})</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MovieTileComponent',
  props: {
    movieId: {
      type: String,
      required: true,
      default: ''
    },
    imgUrl: {
      type: String,
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    year: {
      type: String,
      required: true,
      default: ''
    },
  },

  methods: {
    ...mapActions(['selectMovieById'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.movie-tile {
  background-color: $movie-card-background-color;
  border: 1px solid $movie-card-border-color;
  border-radius: 15px;
  margin: 15px;
  padding: 15px;
  display: flex;
  max-width: 300px;
  cursor: pointer;
  flex-direction: column;
  .movie-tile__title {
    font-weight: bold;
    padding-top: 15px;
  }
  .movie-tile__poster {
    width: 300px;
    height: 444px;
  }
}
</style>
