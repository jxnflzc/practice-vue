<template>
    <div>
      <el-carousel height="500px" type="card" :interval="4000">
        <el-carousel-item v-for="item in pictures" :key="item">
          <img :src="item" class="bannerImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      pictures: [
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=193499896,620656702&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1488968933,783972890&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3802460919,3655505293&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359940152,2857854682&fm=26&gp=0.jpg'
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item img {
  alignment: center;
}

.bannerImg{
  width: 100%;
  height: inherit;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
