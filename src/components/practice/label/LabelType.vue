<template>
  <div id="main" style="width: 600px; height: 400px; margin: 20px auto 20px auto"></div>
</template>

<script>
import echarts from 'echarts'
import { queryLabelTypeCount } from '@/api'
import { Message } from 'element-ui'
export default {
  name: 'LabelType',
  data () {
    return {
      charts: '',
      opinion: ['布尔型'],
      opinionData: [
        {
          name: '布尔型',
          value: 3
        }
      ]
    }
  },
  methods: {
    queryLabelTypeCount () {
      queryLabelTypeCount(this.queryLabelModel)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            let types = response.data.data
            this.opinion = []
            this.opinionData = []
            types.forEach(item => {
              this.opinion.push(item.labelType.desc)
              this.opinionData.push({
                name: item.labelType.desc,
                value: item.count
              })
            })
            // 查询完再画图，否则可能图画不出来
            this.drawPie('main')
          } else {
            Message.error('查询失败')
          }
        })
    },
    drawPie (id) {
      console.log(this.opinionData)
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.opinion
        },
        series: [
          {
            name: '标签分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData
          }
        ]
      })
      console.log(this.opinionData)
    }
  },
  mounted () {
    this.queryLabelTypeCount()
  }
}
</script>

<style scoped>

</style>
