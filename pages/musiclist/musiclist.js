//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/api'
Page({
  data: {
    id: null,
    songList: {}
  },
  initData(){ // 初始化数据
    http.songList(this.data.id)
    .then(res => {
    	// console.log(res.data.playlist)
    	this.setData({
    		songList: res.data.playlist
    	})
      app.globalData.songList = res.data.playlist.tracks
    })
  },
  playAll(){ // 点击播放全部按钮
  	let {id} = this.data.songList.tracks[0]
  	wx.navigateTo({
  		url: `../musicplay/musicplay?id=${id}`
  	})
  },
  onLoad(opt) {
    this.setData({
    	id: opt.id
    })
  },
  onShow(){
  	this.initData()
  }
})
