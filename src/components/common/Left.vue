<template>
  <div>
    <img src="@/assets/logo.png" />
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-price-tag"></i>
          <span>标签</span>
        </template>
        <el-menu-item index="2-1">标签查看</el-menu-item>
        <el-menu-item index="2-2">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Left'
}
</script>

<style scoped>

</style>
