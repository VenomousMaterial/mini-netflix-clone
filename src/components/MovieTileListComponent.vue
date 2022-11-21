<template>
  <div
    class="movie-tile-list"
  >
    <MovieTileComponent
      v-for="movie in getFetchedMovies"
      :key="movie.imdbID"
      :movie-id="movie.imdbID"
      :img-url="movie.Poster"
      :title="movie.Title"
      :year="movie.Year"
    />
  </div>
</template>

<script>
import MovieTileComponent from '@/components/MovieTileComponent.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MovieTileListComponent',
  components: {
    MovieTileComponent
  },
  computed: {
    ...mapGetters(['getFetchedMovies'])
  },
}
</script>

<style lang="scss">
.movie-tile-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
