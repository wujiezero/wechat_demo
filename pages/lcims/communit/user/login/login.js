// pages/lcims/communit/user/login/login.js
const app = getApp();
var util = require('../../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      wechatnum:'',
      jobnum:''
    }
  },
  bindwechatnuminput(e){
    var wechatnum = e.detail.value;
    if ('' == wechatnum) {
      wx.showToast({
        title: '请输入微信号哦～',
        duration: 1000,
        mask: true,
        icon: 'none',
      });
    }
    this.data.user.wechatnum = wechatnum;
  },
  bindjobnuminput(e) {
    var jobnum = e.detail.value;
    if ('' == jobnum) {
      wx.showToast({
        title: '请输入工号哦～',
        duration: 1000,
        mask: true,
        icon: 'none',
      });
    }
    this.data.user.jobnum = jobnum;
  },
  // 登陆前的校验方法
  loginValid: function(){
      var user = this.data.user;
      if('' == user.wechatnum){
        wx.showToast({
          title: '微信号不能不填的哦～',
          duration: 1000,
          mask: true,
          icon: 'none',
        });
        return false;
      }
      if ('' == user.jobnum) {
        wx.showToast({
          title: '工号不能不填的哦～',
          duration: 1000,
          mask: true,
          icon: 'none',
        });
        return false;
      }
      return true;
  },
  // 登录按钮点击事件
  tap2login: function(){
    var loginuser = this.data.user;
    console.log(loginuser);
    if(true != this.loginValid()){
      return;
    }
    //console.log('开始发送请求');
    var localtime = util.formatTime(new Date());
    wx.request({
      url: 'http://nevermore.myds.me:62/US/login',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: function (data) {
        var resp = data.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          wx.showToast({
            title: '登录成功啦～',
            duration: 2500,
            mask: true,
            icon: 'success',
          });
          // 登录成功后，设置微信号和工号到全局参数
          app.globalData.user.wechatnum = loginuser.wechatnum;
          app.globalData.user.jobnum = loginuser.jobnum;
          app.globalData.islogin = true;
          setTimeout(function () {
            wx.navigateTo({
              url: '../../../../index/index'
            });
          }, 3000);
        } else if (resp.ResultCode == 5) {
          wx.showToast({
            title: '登录信息不正确～',
            duration: 2500,
            mask: true,
            icon: 'none',
          });
        } else {
          wx.showToast({
            title: '服务器忙...',
            duration: 2500,
            mask: true,
            icon: 'none',
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 2500,
          mask: true,
          icon: 'none',
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('islogin:' + app.globalData.userInfo)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})