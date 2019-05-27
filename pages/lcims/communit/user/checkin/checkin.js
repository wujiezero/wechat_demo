// pages/lcims/communit/user/checkin/checkin.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      sexradio: [
        { name: '男', value: '1' },
        { name: '女', value: '0', checked: 'true' },
      ],
      user:{
        wechatnum: '',
        localdate: '',
        sid: '',
        name: '',
        jobnum: '',
        locatenum: '',
        sex: '',
        introduction: ''
      }
  },
  bindnameinput(e){
    this.data.user.name = e.detail.value;
  },
  bindwechatnuminput(e){
    this.data.user.wechatnum = e.detail.value;
  },
  bindjobnuminput(e){
    this.data.user.jobnum = e.detail.value;
  },
  bindlocatenuminput(e){
    this.data.user.locatenum = e.detail.value;
  },
  bindintroductioninput(e){
    this.data.user.introduction = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  submitReg: function(){
    this.data.user.localdate = Date.now();
    console.log(this.data.user);
  }
})