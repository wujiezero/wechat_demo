// pages/lcims/communit/resource/comment/list/comments.js
var app = getApp();
var util = require('../../../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    rid:'',
    title:'',
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var resId = options.rid;
    console.log('rid = ' + resId);
    this.setData({
      rid: resId
    })
    this.loadComments(resId);
  },
  /**
   * 加载评论方法
   */
  loadComments: function(rid) {
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/CO/getComment',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime,
        rid: _this.data.rid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (result) {
        var resp = result.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          var _comments = resp.Data.comments;
          _this.setData({
            comments:_comments
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
  /**
   * 评论标题失焦事件
   */
  titleOnBlur(e){
    var value = e.detail.value;
    this.setData({
      title:value
    })
  },
  /**
   * 评论正文失焦事件
   */
  textOnBlur(e){
    var value = e.detail.value;
    // console.log('正文内容:'+value);
    this.setData({
      text: value
    })
  },
  submitComment: function(){
    console.log('提交评论...')
    //console.log(this.data);
    // 提交快速评论
    var loginuser = app.globalData.user;
    var localtime = util.formatTime(new Date());
    var _this = this;
    wx.request({
      url: 'http://nevermore.myds.me:62/CO/postComment',
      data: {
        wechatnum: loginuser.wechatnum,
        jobnum: loginuser.jobnum,
        localtime: localtime,
        rid: _this.data.rid,
        title: _this.data.title,
        text: _this.data.text
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (result) {
        var resp = result.data;
        //console.log(resp);
        if (resp.ResultCode == 0) {
          console.log('评论成功');
          //把评论正文和标题设空
          _this.setData({
            title: '',
            text: '',
          });
          // 弹窗提示评论成功
          wx.showToast({
            title: '评论成功',
            duration: 2000,
            mask: true,
            icon: 'success',
          });
          // 重新加载评论
          _this.loadComments(_this.data.rid);
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