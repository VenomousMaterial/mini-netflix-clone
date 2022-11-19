<template>
  <div class="about">
    <div
      v-if="getSelectedMovieById"
    >
      <h1>{{getSelectedMovieById.Title}} ({{getSelectedMovieById.Year}})</h1>
      <img :src="getSelectedMovieById.Poster"/>
      <div>desc: {{getSelectedMovieById.Plot}}</div>
    </div>
    <div
      v-if="!getSelectedMovieById"
    >
      Not loaded yet
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'MovieView',

  computed: {
    ...mapGetters(['getSelectedMovieById'])
  },

  methods: {
    ...mapActions(['fetchMovieById'])
  },

  created () {
    this.fetchMovieById(router.history.current.params.id)
  }
}

</script>
