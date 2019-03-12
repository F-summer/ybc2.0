// pages/subscription_edit/subscription_edit.js
const app = getApp();
var ssubscripitionApi = require("../../service/subscription.js").allServerApi;
const error = require('../../util/errorMsg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contData: [],
    notHoveArr:[],
    isactive: 0,
    notUser:false,
    atherActive:null,
    getVal:'',
    itemW:152,
    itemH:68,
    pl:32,
    pr_b:24,
    num:4,
    top:40,
    thisVal:'',
    indexNumof:''
  },
  getNavLsitFun() {
    let that = this;
    ssubscripitionApi.getNavList({
      mp_openid: app.globalData.openid
    }, function (successMsg) {
      let isNum = that.data.num
      let hangNum = Math.ceil(successMsg.data.data.length / isNum)
      successMsg.data.data.forEach((value,index)=>{
        let ofnum = (index + 1) % isNum;
        if ((index + 1) % isNum===0){
          value.cleanL = that.data.itemW * (isNum-1) + that.data.pl + that.data.pr_b * (isNum-1);
        }else if ((index + 1) % isNum ==1){
          value.cleanL = that.data.pl
        }else{
          value.cleanL = that.data.itemW * (ofnum - 1) + that.data.pl + that.data.pr_b * (ofnum - 1);
        }
        let numH = Math.ceil((index + 1) / isNum);
        value.cleanT = that.data.itemH * numH + that.data.pr_b + that.data.top
      })
      that.setData({
        contData: successMsg.data.data
      })
    }, function (errorMsg) {
      error(errorMsg)
    })
  },
  getUserNotListFun(){
    let that = this;
    ssubscripitionApi.getUserNotList({
      mp_openid: app.globalData.openid
    }, function (successMsg) {
      that.setData({
        notHoveArr: successMsg.data.data
      })
    }, function (errorMsg) {
      error(errorMsg)
    })
  },
  loginFun(){
    // wx.switchTab({
    //   url: '../mine/mine',
    // })
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },
  //添加订阅栏目
  addSub(e){
    let that = this;
    ssubscripitionApi.addSubitem({
      mp_openid: app.globalData.openid,
      column_id: e.currentTarget.dataset.id
    },function(successMsg){
      that.getNavLsitFun();
      that.getUserNotListFun()
    },function(errorMsg){
      error(errorMsg)
    })
  },
  //删除加订阅栏目
  delSub(e) {
    let that = this;
    ssubscripitionApi.delSubitem({
      mp_openid: app.globalData.openid,
      column_id: e.currentTarget.dataset.id
    }, function (successMsg) {
      that.getNavLsitFun();
      that.getUserNotListFun()
    }, function (errorMsg) {
      error(errorMsg)
    })
  },
  //触摸开始
  touchstart(e){
    let that = this;
    if (e.currentTarget.dataset.index>0){
      that.setData({
        atherActive: e.currentTarget.dataset.index,
        getVal: e.currentTarget.dataset.val,
        thisVal: e.currentTarget.dataset.val,
        indexNumof: e.currentTarget.dataset.index
      })
    }
    console.log(e)
  },
  //触摸移动
  touchmove(e){
    let that = this;
    let getX = e.touches[0].clientX;
    let getY = e.touches[0].clientY;
    that.data.contData.forEach((value, index) => {
      let isW = getX > value.cleanL && getX < (this.data.itemW + value.cleanL);
      let isH = getY > value.cleanT && getY < (this.data.itemH + value.cleanT);
      if (isW&&isH){
        if(index!==0){
          that.data.thisVal = value.column_name;
          that.data.indexNumof = index;
          value.column_name = that.data.getVal;
          that.data.contData[that.data.atherActive].column_name = that.data.thisVal;
          that.setData({
            atherActive: index,
            contData: that.data.contData
          });
        }
      }
    });
    
    that.setData({
      contData: that.data.contData
    })
  },
  //触摸移除
  touchend(e){
    let that =this;
    that.setData({
      atherActive: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    wx.getSystemInfo({
      success: function (res) {
        let rpx = res.windowWidth/750;
        let iw = that.data.itemW;
        let iH = that.data.itemH;
        let itemWidth = rpx * iw;
        let itemHeight = rpx * iH
        that.setData({
          itemW: parseInt(itemWidth),
          itemH: parseInt(itemHeight),
          pl: parseInt(rpx * that.data.pl),
          pr_b: parseInt(rpx * that.data.pr_b),
          top:parseInt(rpx*that.data.top)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.openid) {
      this.setData({
        notUser:true
      })
      this.getNavLsitFun();
     
    }else{
      this.setData({
        notUser: false
      })
    }
    this.getUserNotListFun()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})