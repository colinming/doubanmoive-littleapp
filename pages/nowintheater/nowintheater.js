const app = getApp()

Page({
	data: {
		nowPage: 1,
  	start: 0,
  	count: 18,
  	hotMovieList: []
	},
	initData(start, count){
  	let This = this
  	wx.request({ // 近期热门电影
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
      data: {
        start,
        count
      },
      success(res){
      	let total = res.data.total
      	let page = Math.ceil(total/This.data.count)
      
      	if(This.data.nowPage <= page){
      		if(This.data.start > 0){
      			wx.showToast({
			        title: '加载更多',
			        icon: 'none',
			        mask: true,
			        duration: 2000
			      })
      		}
      		This.setData({
      			hotMovieList: This.data.hotMovieList.concat(res.data.subject_collection_items)
      		})
      	}else{
      		wx.showToast({
		        title: '没有更多数据',
		        icon: 'none',
		        mask: true,
		        duration: 2000
		      })
      	}       
      }
    })
  },
  onPullDownRefresh() { // 下拉刷新
  	this.setData({
  		start: 0,
  		nowPage: 1,
  		hotMovieList: []
  	})
  	this.initData(this.data.start, this.data.count)
  	setTimeout(function () {
	    // 不加这个方法真机下拉会一直处于刷新状态，无法复位
	    wx.stopPullDownRefresh()
	  }, 1000)
  },
  onReachBottom() { // 上拉加载更多
  	this.data.nowPage++
  	this.data.start += 18
  	this.initData(this.data.start, this.data.count)
	},
	onShow(){
		this.setData({
			start: 0,
			nowPage: 1,
			hotMovieList: []
		})
		this.initData(this.data.start, this.data.count)
	}
})