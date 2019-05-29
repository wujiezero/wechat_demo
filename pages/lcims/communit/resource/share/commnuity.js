// pages/lcims/communit/resource/share/commnuity.js
var app = getApp();
var util = require('../../../../../utils/util.js');
var tmp_types;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_index: 0,
    curTypeId: 0,
    types: [],
    list: [],
  },
  jump2publish: function() {
    wx.navigateTo({
      url: '../publish/publishres',
    })
  },
  // 用户登录状态校验
  loginStatusValid: function() {
    var loginuser = app.globalData.user;
    console.log(loginuser);
    if ('' == loginuser.wechanum || '' == loginuser.jobnum) {
      wx.showToast({
        title: '请先登录哦亲～',
        duration: 2500,
        mask: true,
        icon: 'none',
      });
      setTimeout(function() {
        wx.navigateTo({
          url: '../../../../index/index'
        });
      }, 3000);
      return false;
    }
    return true;
  },
  // 加载资源类型的方法
  loadTypes: function(callback) {
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    // 异步回调必须要这样写，否则会报Cannot read property 'data' of undefined;at api request success callback function
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/RS/getTypes',
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
      success: function(res) {
        var resp = res.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          // 这里把获取到的帖子类型设置到此页面的data中
          var types = resp.Data.types;
          // console.log(types);
          tmp_types = types;
          _this.setData({
            types: tmp_types,
            curTypeId: types[0].typeid
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 1000,
          mask: true,
          icon: 'none',
        });
      }
    })
  },
  // 资源类型选择器绑定事件
  bindpickerchanged(e) {
    var index = e.detail.value;
    var types = this.data.types;
    //console.log('current type index: ' + index);
    this.setData({
      type_index: e.detail.value,
      curTypeId: types[index].typeid
    });
    //console.log(this.data);
    // 加载帖子
    this.loadRes(types[index].typeid);
    //console.log(this.data)
  },
  // 加载资源的方法
  loadRes: function(typeid) {
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    //console.log('current typeid: ' + typeid)
    wx.request({
      url: 'http://nevermore.myds.me:62/RS/getRes',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime,
        typeid: typeid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function(result) {
        var resp = result.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          // 把获取到的帖子类型设置到此页面的data中
          //console.log(resp.Data);
          _this.setData({
            list:resp.Data.resources
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 1000,
          mask: true,
          icon: 'none',
        });
      }
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 登录检查
    if (true != this.loginStatusValid()) {
      return;
    }
    // 加载帖子类型
    this.loadTypes();
  },
  onReady: function(options) {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})