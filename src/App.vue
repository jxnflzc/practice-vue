<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive">
      <el-aside width="12%">
        <left></left>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import left from './components/common/Left'
export default {
  name: 'App',
  components: {
    left: left
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
