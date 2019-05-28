// pages/lcims/communit/meeting/signin/signin.js
var app = getApp();
var util = require('../../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    members:[
      {id:"1",name:"aa",wechatnum:"wn-a1"},
      {id:"2",name:"bb",wechatnum:"wn-b1"},
      {id:"3",name:"cc",wechatnum:"wn-c1"}
      ] //参加会议的成员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 会议/聚会签到方法
  meetingSign: function(){
    var loginuser = app.globalData.user;
    var me = { id: "3", name: loginuser.wechatnum, wechatnum: loginuser.wechatnum }
    var tmp_members = this.data.members;
    tmp_members.push(me);
    this.setData({
      members:tmp_members
    })
    console.log(this.data.members)
  },
  // 取消行程方法
  cancleSign: function(){
    // 1.发请求从数据库删除记录
    // 2.重新查询member列表，setData
  },
  // 查询参加活动的成员
  loadMenbers: function(){

  }
})