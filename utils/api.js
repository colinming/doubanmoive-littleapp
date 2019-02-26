let baseUrl = 'https://music.163.com/weapi/'
const http = function(method, url, data) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: `${baseUrl}${url}`,
      data,
      method,
      header: {
        // 'content-Type': 'application/x-www-form-urlencoded' 
        'content-Type': 'application/json'
      },
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
export default {
	newSong(){
		return http('post', 'personalized/newsong')
	}
}