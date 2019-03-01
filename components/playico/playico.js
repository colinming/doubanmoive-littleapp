const app = getApp()
import http from '../../utils/api'
import utils from '../../utils/util'
Component({
  data: {
  	
  },
  properties: {
  	diskShow: Boolean
  },
  methods: {
  	tapDisk(){ // 点击碟片图标
	  	wx.navigateTo({
	  		url: `../../pages/musicplay/musicplay?currentIndex=${Number(app.globalData.currentIndex)}`
	  	})
	  }
  }
})