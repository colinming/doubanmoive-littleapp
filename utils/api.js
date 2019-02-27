let baseUrl = 'http://localhost:3000'
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
	songTypes(limit){ // 精品歌单
		return http('get', '/top/playlist/highquality', {limit})
	},
	songList(id){ // 歌单详情
		return http('get', '/playlist/detail', {id})
	},
	songUrl(id){ // 歌曲 url
		return http('get', '/song/url', {id})
	},
	songLrc(id){ // 歌词
		return http('get', '/lyric', {id})
	},
	songDetail(ids){ // 歌曲详情
		return http('get', '/song/detail', {ids})
	},
	songComments(id){ // 歌曲评论
		return http('get', '/comment/music', {id})
	}
}