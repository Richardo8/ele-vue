<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <storeList></storeList>
  </div>
</template>

<script>
  import storeList from './components/commond/storeList.vue'
export default {
  name: 'app',
  components: {
          storeList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
