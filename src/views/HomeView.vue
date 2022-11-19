<template>
  <div class="home">
    <h2>Christmas is just around the corner!</h2>
    <MovieTileListComponent />
  </div>
</template>

<script>
import MovieTileListComponent from '@/components/MovieTileListComponent.vue'

export default {
  name: 'HomeView',
  components: {
    MovieTileListComponent,
  }
}
</script>
