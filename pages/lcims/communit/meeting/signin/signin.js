// pages/lcims/communit/meeting/signin/signin.js
var app = getApp();
var util = require('../../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    members:[] //参加会议的成员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMenbers();
  },
  // 会议/聚会签到方法
  meetingSign: function(){
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/SI/sign',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        var resp = res.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          wx.showToast({
            title: '签到成功～',
            duration: 2000,
            mask: true,
            icon: 'success',
          });
          _this.loadMenbers();
        } else {
          wx.showToast({
            title: '签到失败:' + resp.ResultDesc,
            duration: 2000,
            mask: true,
            icon: 'none',
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 2000,
          mask: true,
          icon: 'none',
        });
      }
    })
  },
  // 取消行程方法
  cancleSign: function(){
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/SI/unSign',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        var resp = res.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          wx.showToast({
            title: '取消成功~',
            duration: 2000,
            mask: true,
            icon: 'success',
          });
          _this.loadMenbers();
        } else {
          wx.showToast({
            title: '取消失败:' + resp.ResultDesc,
            duration: 2000,
            mask: true,
            icon: 'none',
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 2000,
          mask: true,
          icon: 'none',
        });
      }
    })
  },
  // 查询参加活动的成员
  loadMenbers: function(){
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/SI/querySign',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        var resp = res.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          var _members = resp.Data.signs;
          // console.log(_members);
          _this.setData({
            members: _members
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 1000,
          mask: true,
          icon: 'none',
        });
      }
    })
  }
})