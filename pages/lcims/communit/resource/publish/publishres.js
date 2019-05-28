// pages/lcims/communit/resource/publish/publishres.js
var app = getApp();
var util = require('../../../../../utils/util.js');
var tmp_types;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    type_index:0,
    curTypeId:1,
    title:'',
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 未登录，返回主页。
    if(true != this.loginStatusValid()){
      return;
    }
    this.loadTypes();
    
  },
  // 登录校验
  loginStatusValid: function () {
    var loginuser = app.globalData.user;
    console.log(loginuser);
    if ('' == loginuser.wechanum || '' == loginuser.jobnum) {
      wx.showToast({
        title: '请先登录哦亲～',
        duration: 1500,
        mask: true,
        icon: 'none',
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../../../../index/index'
        });
      }, 3000);
      return false;
    }
    return true;
  },
  loadTypes: function (callback) {
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
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
      success: function (res) {
        var resp = res.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          // 这里把获取到的帖子类型设置到此页面的data中
          var types = resp.Data.types;
          // console.log(types);
          
          _this.setData({
            types: types,
            curTypeId: types[0].typeid
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
  },
  // 资源分类选择器绑定事件
  bindpickerchanged(e){
    var index = e.detail.value;
    var types = this.data.types;
    //console.log('current type index: ' + index);
    this.setData({
      type_index: e.detail.value,
      curTypeId: types[index].typeid
    });
  },
  // 正文输入框绑定事件
  bindtext(e){
    this.setData({
      text:e.detail.value
    })
  },
  // 标题输入框绑定事件
  bindtitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  publishRes: function(){
    console.log('准备发布资源...');
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    console.log(loginuser);
    console.log(localtime);
    console.log(this.data);
    wx.request({
      url: 'http://nevermore.myds.me:62/RS/postRes',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime,
        title: this.data.title,
        text: this.data.text,
        typeid:this.data.curTypeId
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
            title: '发布成功啦～快去社区看看吧',
            duration: 2500,
            mask: true,
            icon: 'success',
          });
        } else {
          wx.showToast({
            title: '啊哦～没发布成功...'+resp.ResultDesc,
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
  }
})