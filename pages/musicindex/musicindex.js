//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/api'
Page({
  data: {

  },
  initData(){ // 初始化数据
    let This = this
  },
 
  onLoad() {
    
  },
  onShow(){
    http.newSong()
    .then(res => {
      console.log(res)
    })
    // console.log(http)
  }
})
