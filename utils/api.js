const http = function(method, url, data) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url,
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
	songTypes(limit){ // 精品歌单
		return http('get', 'https://api.bzqll.com/music/netease/highQualitySongList', {key: 579621905, limit})
	},
	songList(id){ // 歌单详情
		return http('get', 'https://api.bzqll.com/music/netease/songList', {key: 579621905, id})
	},
	songLrc(id){ // 歌词
		return http('get', 'https://api.bzqll.com/music/netease/lrc', {key: 579621905, id})
	},
	songDetail(id){ // 歌曲详情
		return http('get', 'https://api.bzqll.com/music/netease/song', {key: 579621905, id})
	},


	mvList(params){ // mv 列表
		return http('get', 'https://u.y.qq.com/cgi-bin/musicu.fcg', params)
	},
	mvDetail(params){ // mv 详情
		return http('get', 'https://u.y.qq.com/cgi-bin/musicu.fcg', params)
	},
	mvUrl(params){ // mv 地址
		return http('get', 'https://u.y.qq.com/cgi-bin/musicu.fcg', params)
	}
}