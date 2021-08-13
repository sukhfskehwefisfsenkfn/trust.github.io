<template>
  <div>
    <div v-if="show_record">
    	<div class="prompt">还没有任何记录~</div>
    </div>
    <!-- 当前是有记录信息的 -->
    <div v-else>
    	<div class="table th">
    		<div class="date">时间</div>
    		<div class="busi">分数</div>
    		<div class="mark">最后得分</div>
    		<div class="net">备注</div>
    	</div>
    	<RecordList v-for="(record,index) in records" :key="index" :record='record'></RecordList>
    	<p class="text-footer" v-if="!more">没有更多数据</p>
    	<p class="text-footer" v-else>加载中...</p>
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import RecordList from '@/components/RecordList'
export default {
  components: {
    RecordList
  },
  data () {
    return {
      userinfo: {},
      show_record: false,
      records: [],
      page: 0,
      more: true
    }
  },
  methods: {
    async getRecords (init) {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      if (init) {
        this.page = 0
        this.more = true
      }
      if (this.page === 0) {
        this.records = []
      }
      try {
        const data = {
          openid: this.userinfo.openId,
          page: this.page
        }
        const res = await get('/weapp/getrecords', data)
        console.log('从后端传过来的信息：', res)
        this.records = this.records.concat(res.records)
        if (res.records.length < 15 && this.page > 0) {
          this.more = false
        }
        if (this.records.length === 0) {
          this.show_record = true
        } else {
          this.show_record = false
        }
        wx.hideToast()
      } catch (e) {
        console.log('错误信息：', e)
        wx.hideToast()
      }
    }
  },
  onReachBottom () {
    if (!this.more) {
      return
    }
    this.page = this.page + 1
    console.log('当前在第几页：', this.page)
    this.getRecords()
  },
  onPullDownRefresh () {
    this.getRecords(true)
    wx.stopPullDownRefresh()
  },
  onShow () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo.openId) {
      this.userinfo = userinfo
      console.log('用户信息：', this.userinfo)
      this.getRecords(true)
    }
  },
  onShareAppMessage () {
    return {
      title: '真自律',
      path: '/pages/index/main'
    }
  }
}
</script>

<style lang='scss' scoped>
.add{
    margin-top: 20px;
    margin-bottom: 10px;
    text-align:center;
  p{
      font-size: 15px;
  }
}
.th {
  width: 100%;
  height: 30px;
  line-height:30px;
  background: #EA5149;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  display: flex;
}
.prompt{
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}
.date{
  width: 23%;
  padding-left: 60px;
}
.busi{
  width: 10%;
  margin-left: 5px;
}
.mark{
    width: 20%;
  margin-left: 10px;
}
.net{
  width: 20%;
  margin-left: 20px;
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
  padding-top: 5px;
}

</style>