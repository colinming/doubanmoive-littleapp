//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/api'
Page({
  data: {
    id: null,
    songUrl: '',
    songLrc: '',
    songDetail: {},
    duration: ''
  },
  initData(){ // 初始化数据
    http.songUrl(this.data.id) // 歌曲 url
    .then(res => {
      // console.log(res)
      let {url} = res.data.data[0]
      this.setData({
        songUrl: url
      })

      let {song} = app.globalData
      if(!song){ // 创建 audio
        song = app.globalData.song = wx.createInnerAudioContext()
      }
      song.src = url
      song.play()

    })

    http.songLrc(this.data.id)
    .then(res => {
      // console.log(res)
      if(res.data.nolyric){ // 无歌词

      }else{
        this.setData({
          songLrc: res.data.lrc.lyric
        })
      }
    })

    http.songDetail(this.data.id)
    .then(res => {
      // console.log(res)
      this.setData({
        songDetail: res.data.songs[0]
      })
    })

  },
  onLoad(opt) {
    this.setData({
      // id: opt.id
      id: 257984
    })   
  },
  onShow(){
    this.initData()
  }
})
