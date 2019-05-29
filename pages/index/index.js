//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到数字社区',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    islogin:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 跳转到注册页
  jump2checkin: function () {
    wx.navigateTo({
      url: '../lcims/communit/user/checkin/checkin'
    })
  },
  // 跳转到登录页
  jump2login: function () {
    wx.navigateTo({
      url: '../lcims/communit/user/login/login'
    })
  },
  // 跳转到社区主页
  jump2community: function(){
    wx.navigateTo({
      url: '../lcims/communit/resource/share/commnuity',
    })
  },
  // 跳转到会议助手首页
  jump2meetingmain: function(){
    wx.navigateTo({
      url: '../lcims/communit/meeting/meetingmain',
    })
  },
  // 跳转到小程序推荐页面
  jump2apprecommend: function() {
    wx.navigateTo({
      url: '../lcims/communit/amusement/recommend/recapps',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          //hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      islogin:app.globalData.islogin
    })
    // console.log(this.data.islogin);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
