const app = getApp()

Page({
	data: {
		id: null // 页面 id
	},
	initData(){
		wx.request({ // 电影介绍
			url: `https://m.douban.com/rexxar/api/v2/elessar/subject/${this.data.id}`,
			success(res){
				console.log(res)
			}
		})
		wx.request({ // 短评
			url: `https://m.douban.com/rexxar/api/v2/movie/${this.data.id}/interests`,
			data: {
				count: 4,
				order_by: 'hot',
				start: 0
			},
			success(res){
				console.log(res)
			}
		})
		wx.request({ // 影人介绍
			url: `https://m.douban.com/rexxar/api/v2/movie/${this.data.id}/credits`,
			success(res){ 
				console.log(res)
			}
		})
		wx.request({ // 讨论
			url: `https://m.douban.com/rexxar/api/v2/movie/${this.data.id}/forum_topics`,
			data: {
				start: 0,
				count: 5
			},
			success(res){
				console.log(res)
			}
		})
	},
	onLoad(opt){
		this.setData({
			id: opt.id
		})
	},
	onShow(){
		this.initData()
	}
})