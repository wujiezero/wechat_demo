//app.js
App({
  data:{
    types:[],
    
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    islogin: false,
    userInfo: null,
    user:{
      wechatnum:'', //微信号
      jobnum:'' // 工号
    },
    
  }
})

// 第一个tabBar一定要是首页，否则不显示tabBar
// 会导致跳转功能失效
// "tabBar": {
//   "color": "#a9b7b7",
//     "selectedColor": "#11cd6e",
//       "borderStyle": "black",
//         "list": [
//           {
//             "pagePath": "pages/index/index",
//             "text": "首页",
//             "iconPath": "icons/buttons/home.png",
//             "selectedIconPath": "icons/buttons/home.png"
//           },
//           {
//             "pagePath": "pages/lcims/communit/meeting/meetingmain",
//             "text": "会议助手",
//             "iconPath": "icons/buttons/home.png",
//             "selectedIconPath": "icons/buttons/home.png"
//           },
//           {
//             "pagePath": "pages/lcims/communit/resource/share/commnuity",
//             "text": "社区",
//             "iconPath": "icons/buttons/home.png",
//             "selectedIconPath": "icons/buttons/home.png"
//           }
//         ]
// },