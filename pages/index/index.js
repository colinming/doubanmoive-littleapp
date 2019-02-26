//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    modalFlag: false,
    hotMovies: {},
    freeMovies: {},
    recentHots: {},
    types: []
  },
  initData(){ // 初始化数据
    let This = this
    wx.request({ // 影院热映
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
      data: {
        start: 0,
        count: 8
      },
      success(res){
        This.setData({
          hotMovies: res.data
        })
      }
    })
    wx.request({ // 免费在线观看的新片
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
      data: {
        start: 0,
        count: 8
      },
      success(res){
        This.setData({
          freeMovies: res.data
        })
      }
    })
    wx.request({ // 近期热门电影
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
      data: {
        start: 0,
        count: 8
      },
      success(res){
        This.setData({
          recentHots: res.data
        })
      }
    })
  },
  selectType(e){ // 跳转分类
    let params = e.currentTarget.dataset
    if(params.showArrow){
      console.log('跳转分类')
    }
    
  },  
  movieDetail(e){ // 跳转电影详情页
    wx.navigateTo({
      url: `../moviedetail/moviedetail?id=${e.currentTarget.dataset.id}`
    })
    // console.log(e.currentTarget.dataset)
  },
  getAuth(e){ // 用户授权
    console.log(e)
  },
  onLoad() {
    let types = [
      {name: '经典', url: '', showArrow: true},
      {name: '冷门佳片', url: '', showArrow: true},
      {name: '豆瓣高分', url: '', showArrow: true},
      {name: '动作', url: '', showArrow: true},
      {name: '喜剧', url: '', showArrow: true}
    ]
  
    if(types.length%2 === 1){ // 奇数
      types.push({name: '', url: '', showArrow: false})
    }  

    this.setData({
      types,
      // modalFlag: true
    })
    
    // this.userLogin()

  },
  onShow(){
    this.initData()
  }
})
