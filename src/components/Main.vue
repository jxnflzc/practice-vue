<template>
  <el-container>
    <el-aside width="12%" >
      <left></left>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import left from '@/components/common/Left'
export default {
  name: 'Main',
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
.el-table td, .el-table th {
  text-align: left;
}
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
