//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/api'
Page({
  data: {
    songList: [],
    currentIndex: 0,
    ifPlay: true,
    songUrl: '',
    
    songLrc: {},
    currentLrc: '',

    songDetail: {},
    duration: 0,
    currentTime: 0,
    isDown: false,

    listShow: false,
    orderShow: false,
    orders: [
      '../static/images/order.png',
      '../static/images/single-recycle.png',
      '../static/images/random.png'
    ],
    orderIndex: 0, // 默认列表循环
    orderTitle: '顺序播放'
  },
  initData(id){ // 初始化数据
    http.songDetail(id)
    .then(res => {
      // console.log(res)
      let {data} = res.data
      this.setData({
        songDetail: data
      })


      let {url} = data
      this.setData({
        songUrl: url
      })

      this.play(url) // 播放歌曲
    })

    http.songLrc(id)
    .then(res => {
      if(!res.data){ // 无歌词

      }else{
        let lrc = res.data, 
            reg = /\[(.*?)](.*)/g,
            obj = {}
        
        lrc.replace(reg, ($0, $1, $2) => {
          obj[$1.substring(0, 5)] = $2
        })
        
        this.setData({
          songLrc: obj
        })
      }
    })

  },
  play(url){ // 播放歌曲方法
    let {song} = app.globalData
    if(!song){ // 创建 audio
      song = app.globalData.song = wx.createInnerAudioContext()
    }
    song.src = url
    song.play()
    song.onTimeUpdate(res => {
      this.setData({
        duration: song.duration
      })
      if(!this.data.isDown){
        this.setData({
          currentTime: song.currentTime
        })
      }

      // 自动切换下一首
      if(Math.floor(song.duration) === Math.floor(song.currentTime)&&this.data.orderIndex === 0){
        this.nextSong()
      }

      let m = Math.floor(song.currentTime/60),
          s = Math.floor(song.currentTime%60)

      var ct = (m<10?'0'+m:m)+':'+(s < 10?'0'+s:s)

      if(ct in this.data.songLrc&&'el-'+ct!==this.data.currentLrc){
        this.setData({
          currentLrc: 'el-'+ct
        })
      }

    })

  },
  timeChange(){ // 拖动进度
    this.setData({
      isDown: true
    })
  },
  change(e){ // 拖动最后一次抬起
    this.setData({
      isDown: false,
      currentTime: e.detail.value
    })
    app.globalData.song.seek(e.detail.value)
  },
  orderTap(){ // 播放顺序弹窗
    switch (this.data.orderShow) {
      case false:
        this.setData({
          orderShow: true
        })
        break
      case true:
        this.setData({
          orderShow: false
        })
        break
    }
  },
  selectOrder(e){ // 选择播放顺序
    let {orderIndex} = e.target.dataset 
    app.globalData.song.onEnded(e=>{
      
      switch (orderIndex) {
        case 0: // 顺序播放
          this.nextSong()
          this.setData({
            orderTitle: '顺序播放'
          })
          break
        case 1: // 单曲循环
          this.setData({
            orderTitle: '单曲循环'
          })
          this.play()
          break
        case 2: // 随机播放
          let {songList} = app.globalData
          let currentIndex = parseInt(Math.random()*songList.length-1)
          this.initData(songList[currentIndex].id)
          
          this.setData({
            currentIndex,
            orderTitle: '随机播放'
          })
          
          break
      }
    })
    
    this.setData({
      orderIndex,
      orderShow: false
    })
  },
  preSong(){ // 上一首
    let {currentIndex} = this.data
    currentIndex--
    if(currentIndex < 0){
      currentIndex = app.globalData.songList.length-1
    }
    this.setData({
      currentIndex
    })
    let {songList} = app.globalData
    this.initData(songList[currentIndex].id)
   
    this.setData({
      ifPlay: true 
    })
  },
  pauseSong(){ // 暂停歌曲
    this.setData({
      ifPlay: false 
    })
    app.globalData.song.pause()
  },
  playSong(){ // 点击播放按钮
    this.setData({
      ifPlay: true 
    })
    app.globalData.song.play()
  },
  nextSong(){ // 下一首
    let {currentIndex} = this.data
    currentIndex++
    if(currentIndex > app.globalData.songList.length-1){
      currentIndex = 0
    }
    this.setData({
      currentIndex
    })
    let {songList} = app.globalData
    this.initData(songList[currentIndex].id)
   
    this.setData({ // 改变播放按钮状态
      ifPlay: true 
    })
    
  },
  showList(){ // 展示歌单列表
    this.setData({
      listShow: true,
      orderShow: false
    })
  },
  closeList(){ // 隐藏歌单列表
    this.setData({
      listShow: false
    })
  },
  selectSong(e){ // 选择歌曲
    let {currentIndex} = e.currentTarget.dataset
    this.setData({
      currentIndex
    })
    this.initData(app.globalData.songList[currentIndex].id)    
    this.playSong()
    
    this.closeList()
  },
  onLoad(opt) {
    console.log('onLoad')
    app.globalData.diskShow = false    
    this.setData({
      currentIndex: Number(opt.currentIndex),
      songList: app.globalData.songList
    })
    this.initData(app.globalData.songList[this.data.currentIndex].id) 
    
  },
  onShow(){
    console.log('onShow')
    if(!app.globalData.diskShow){ //回到页面，再次获取 currentTime, duration
      this.play()
    }
    
    let params = {
      data: {
        comm: {"ct":24},
        mv_list: {
          module: "MvService.MvInfoProServer",
          method: "GetAllocMvInfo",
          param: {
            start: 0,
            size: 20,
            version_id: 7, // 版本
            area_id: 16, // 区域
            order: 1 // 0 最热 1 最新
          }
        }
      }
    }
    // http.mvList(params)
    // .then(res => { // 需要得到 vid
    //   console.log(res.data)
    // })


    let detailParams = {
      data: {
        getMvInfo: { 
          module: "video.VideoDataServer",
          method: "get_video_info_batch",
          param: { 
            vidlist: ["y0027sobcrh"], // 动态参数
            required: ["vid","type","sid","cover_pic","duration","singers","video_switch","msg","name","desc","playcnt","pubdate","isfav","fileid","filesize","pay","pay_info","uploader_headurl","uploader_nick","uploader_uin","uploader_encuin"]
          }
        }
      }
    } 
    // http.mvDetail(detailParams)
    // .then(res => {
    //   console.log(res.data)
    // })

    let urlParams = {
      data: {
        getMvUrl: {
          module: "gosrf.Stream.MvUrlProxy",
          method: "GetMvUrls",
          param: {
            vids: ["y0027sobcrh"], // 动态参数
            request_typet: 10001
          }
        }
      }
    }
    // http.mvUrl(urlParams)
    // .then(res => {
    //   console.log(res.data.getMvUrl)
    //   // 取 freeflow_url 地址直接播放
    // })


    

  },
  onHide(){
    console.log('onHide')
  },
  onUnload(){ // 页面卸载时触发
    app.globalData.currentIndex = this.data.currentIndex
    app.globalData.diskShow = true
  }
})
