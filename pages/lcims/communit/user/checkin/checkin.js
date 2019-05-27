// pages/lcims/communit/user/checkin/checkin.js
const app = getApp();
var util = require('../../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexindex: 1,
    sexarray: ['女', '男'],
    user: {
      wechatnum: '',
      localtime: '',
      sid: '',
      name: '',
      jobnum: '',
      locatenum: '',
      sex: 1,
      introduction: ''
    }
  },
  bindnameinput(e) {
    var name = e.detail.value;
    if ('' == name) {
      wx.showToast({
        title: '留下你的大名吧～',
        duration: 1000,
        mask: true,
        icon: 'none',
      });
    }
    this.data.user.name = name;
  },
  bindwechatnuminput(e) {
    var wechatnum = e.detail.value;
    if ('' == wechatnum) {
      wx.showToast({
        title: '微信号留一个呗～',
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
        title: '工号不能不填的哦～',
        duration: 1000,
        mask: true,
        icon: 'none',
      });
    }
    this.data.user.jobnum = jobnum;
  },
  bindlocatenuminput(e) {
    var locatenum = e.detail.value;
    if ('' == locatenum) {
      wx.showToast({
        title: '留下你的座位号方便大家找到你～',
        duration: 1000,
        mask: true,
        icon: 'none',
      });
    }
    this.data.user.locatenum = locatenum;
  },
  bindintroductioninput(e) {
    var introduction = e.detail.value;
    if('' == introduction){
      wx.showToast({
        title: '简单的介绍下自己方便大家认识哟～',
        duration: 1000,
        mask: true,
        icon: 'none',
      });
    }
    this.data.user.introduction = e.detail.value;
  },
  bindsexpicker(e) {
    this.setData({
      sexindex: e.detail.value
    });
    console.log(e.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  validData: function() {
    var user = this.data.user;
    if (user.name == '') {
      wx.showToast({
        title: '姓名不可为空哦～',
        duration: 2000,
        mask: true,
        icon: 'none',
      });
      return false;
    }
    if (user.wechatnum == '') {
      wx.showToast({
        title: '微信号不可为空哦～',
        duration: 2000,
        mask: true,
        icon: 'none',
      });
      return false;
    }
    if (user.jobnum == '') {
      wx.showToast({
        title: '工号不可为空哦～',
        duration: 2000,
        mask: true,
        icon: 'none',
      });
      return false;
    }
    if (user.locatenum == '') {
      wx.showToast({
        title: '座位号不可为空哦～',
        duration: 2000,
        mask: true,
        icon: 'none',
      });
      return false;
    }
    if (user.introduction == '') {
      wx.showToast({
        title: '简单的介绍下自己方便大家认识哟～',
        duration: 2000,
        mask: true,
        icon: 'none',
      });
      return false;
    }
    return true;
  },
  submitReg: function() {
    var now = util.formatTime(new Date());
    this.data.user.localtime = now;
    console.log(this.data.user);
    if(true != this.validData()){
      return;
    }
    console.log('信息校验通过...');
    var reguser = this.data.user;
    wx.request({
      url: 'http://nevermore.myds.me:62/US/checkin',
      data:{
        name: reguser.name,
        wechatnum: reguser.wechatnum,
        jobnum: reguser.jobnum,
        locatenum: reguser.locatenum,
        sex: reguser.sex,
        introduction: reguser.introduction,
        localtime: reguser.localtime
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      method:'POST',
      dataType:'json',
      success:function(data){
        var resp = data.data;
        console.log(resp);
        if (resp.ResultCode == 0){
          wx.showToast({
            title: '注册成功啦～',
            duration: 2500,
            mask: true,
            icon: 'success',
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '../../../../index/index'
            });
          },3000);
        } else if (resp.ResultCode == 5) {
          wx.showToast({
            title: '该微信号和工号组合已经被注册过啦～',
            duration: 2500,
            mask: true,
            icon: 'none',
          });
        } else {
          wx.showToast({
            title: '注册信息未填写完整哦～',
            duration: 2500,
            mask: true,
            icon: 'none',
          });
        }
      },
      fail:function(){
        wx.showToast({
          title: '服务器连接超时啦...',
          duration: 2500,
          mask: true,
          icon: 'none',
        });
      }
    })
  }
})