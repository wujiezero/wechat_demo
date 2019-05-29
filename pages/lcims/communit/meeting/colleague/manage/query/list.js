// pages/lcims/communit/meeting/colleague/manage/query/list.js
const app = getApp();
const util = require('../../../../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    members:[],
    queryUser:{},
    modalFlag:true
  },
  /**
     * 查询所有同事
     */
  queryAllMember: function () {
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/US/queryAll',
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
          _this.setData({
            members: resp.Data.users
          });
          //console.log(_this.data);
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
  /**
   * 查询点击的用户
   */
  queryThis:function(event) {
    var wechatnum = event.currentTarget.id;
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/US/queryOne',
      data: {
        wechatnum: wechatnum,
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
          _this.setData({
            queryUser:resp.Data.user,
            modalFlag:false
          })
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
    });
    
  },
  hidemodal: function() {
    console.log('关闭弹窗...')
    this.setData({
      modalFlag:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryAllMember();
  },
  
})