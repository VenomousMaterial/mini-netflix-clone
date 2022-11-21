<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',

  methods: {
    ...mapActions(['fetchInitialMovies'])
  },

  created () {
    this.fetchInitialMovies()
  }
}

</script>

<style lang="scss">
@import '@/styles/variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $app-text-color;
}

body {
  background: $app-background;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $app-text-color;

    &.router-link-exact-active {
      color: $app-link-text-color;
    }
  }
}
</style>
