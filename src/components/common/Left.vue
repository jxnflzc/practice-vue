<template>
  <div>
    <img src="@/assets/logo.png" />
    <el-menu
      default-active="/home"
      router
      class="el-menu-vertical-demo">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-text="item.name"></span>
        </template>
        <el-menu-item-group v-for="sub in item.sub" :key="sub.path">
          <el-menu-item :class="sub.icon" :index="sub.path" v-text="sub.name"></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import menu from '@/config/menu'
export default {
  name: 'Left',
  data () {
    return {
      menu: menu
    }
  }
}
</script>

<style scoped>

</style>
