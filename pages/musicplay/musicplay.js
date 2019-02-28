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

    listShow: false
  },
  initData(id){ // 初始化数据
    http.songUrl(id) // 歌曲 url
    .then(res => {
      // console.log(res)
      let {url} = res.data.data[0]
      this.setData({
        songUrl: url
      })

      this.play(url) // 播放歌曲

    })

    http.songLrc(id)
    .then(res => {
      // console.log(res)
      if(res.data.nolyric){ // 无歌词

      }else{
        let {lyric} = res.data.lrc, 
            reg = /\[(.*?)](.*)/g,
            obj = {}
        
        lyric.replace(reg, ($0, $1, $2) => {
          obj[$1.substring(0, 5)] = $2
        })
        
        this.setData({
          songLrc: obj
        })
      }
    })

    http.songDetail(id)
    .then(res => {
      // console.log(res)
      this.setData({
        songDetail: res.data.songs[0]
      })
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
      if(Math.floor(song.duration) === Math.floor(song.currentTime)){
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
  orderTap(){ // 播放顺序
    console.log('播放顺序')
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
   
    this.playSong()
  },
  pauseSong(){ // 暂停歌曲
    this.setData({
      ifPlay: false 
    })
    app.globalData.song.pause()
  },
  playSong(){ // 播放歌曲
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
   
    this.playSong()
    
  },
  showList(){ // 展示歌单列表
    this.setData({
      listShow: true
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
    // this.setData({
    //   currentIndex: Number(opt.currentIndex)
    // })  
  },
  onShow(){
    
    http.songList(988690134)
    .then(res => {
      this.setData({
        songList: res.data.playlist.tracks
      })
      app.globalData.songList = res.data.playlist.tracks
      this.setData({
        currentIndex: 1
      })
      this.initData(app.globalData.songList[this.data.currentIndex].id)      
   
    })

    // this.initData(app.globalData.songList[this.data.currentIndex].id)    
  }
})
