// pages/lcims/communit/meetting/meettingmain.js
var app = getApp;
var util = require('../../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 去地图页
  jump2map: function(){
    wx.navigateTo({
      url: 'map/map',
    })
  },
  // 去签到页
  jump2signin: function(){
    wx.navigateTo({
      url: 'signin/signin',
    })
  },
  jump2colleaguequery: function() {
    wx.navigateTo({
      url: 'colleague/manage/query/list',
    })
  }

  
})