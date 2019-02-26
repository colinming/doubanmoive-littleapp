const app = getApp()
let WxParse = require('../wxParse/wxParse/wxParse.js')

Page({
	data: {
		id: '', // 页面 id
		movieDetail: {},
		storyEllipsis: '',

		actors: [],

		comments: {}
	},
	initData(){
		let This = this
		wx.request({ // 电影介绍
			url: `https://m.douban.com/rexxar/api/v2/elessar/subject/${this.data.id}`,
			success(res){
				This.setData({
					movieDetail: res.data
				})
        // WxParse.wxParse('storyEllipsis', 'html', res.data.desc, This, 5)
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
				// console.log(res.data)
				This.setData({
					comments: res.data
				})
			}
		})
		wx.request({ // 影人介绍
			url: `https://m.douban.com/rexxar/api/v2/movie/${this.data.id}/credits`,
			success(res){ 
				// console.log(res)
				This.setData({
					actors: res.data.credits
				})
			}
		})
		wx.request({ // 讨论
			url: `https://m.douban.com/rexxar/api/v2/movie/${this.data.id}/forum_topics`,
			data: {
				start: 0,
				count: 5
			},
			success(res){
				// console.log(res)
			}
		})
	},
	expendWords(){ // 展开故事简介
		console.log(123)
	},
	moreComment(){ // 加载更多短评

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