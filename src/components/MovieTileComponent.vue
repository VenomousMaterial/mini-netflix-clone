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
      default: 'tt0000000'
    },
    imgUrl: {
      type: String,
      required: true,
      default: 'url.to/img'
    },
    title: {
      type: String,
      required: true,
      default: 'Buster'
    },
    year: {
      type: String,
      required: true,
      default: '1902'
    },
  },

  methods: {
    ...mapActions(['selectMovieById'])
  }
}
</script>

<style lang="scss" scoped>
.movie-tile {
  background-color: lightgrey;
  border-radius: 15px;
  margin: 15px;
  padding: 15px;
  display: flex;
  max-width: 500px;
  cursor: pointer;
  flex-direction: column;
}
</style>
