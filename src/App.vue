<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/movie">About</router-link>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
