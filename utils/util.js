export default {
  formatTime(date){
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },
  formatNumber(n){
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  toast(mes){
    wx.showToast({
      title: `${mes}`,
      icon: 'none',
      duration: 2000
    })
  }
}
