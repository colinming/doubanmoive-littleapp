//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/api'
import utils from '../../utils/util'
Page({
  data: {
    diskShow: false,

    tabbar: [
      {title: '歌曲'},
      {title: 'mv'},
      {title: '搜索'}
    ],
    currentIndex: 0,
    songsTypes: [], // 榜单
    clientHeight: 0
  },
  initData(){ // 初始化数据
    http.songTypes(24)
    .then(res => {
      // console.log(res.data)
      if(res.data.code === 200){
        let {playlists} = res.data.data
        this.setData({
          songsTypes: playlists
        })
      }else{
        utils.toast(res.errMsg)
      }
    })
  },
  selectType(e){ // 切换类型
    let {index} = e.target.dataset
    this.setData({
      currentIndex: index
    })
  },
  changeContent(e){
    this.setData({
      currentIndex: e.detail.current
    })
  },
  onLoad() {
    let This = this
    wx.getSystemInfo({
      success(res){
        // console.log(res)
        This.setData({
          clientHeight: (res.windowHeight-40)*res.pixelRatio
        })
      }
    })
  },
  onShow(){
    this.initData()
    if(app.globalData.diskShow){
      this.setData({
        diskShow: true
      })
    }
  }
})
