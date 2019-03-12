// pages/searchPage/searchPage.js
const app = getApp();
const errorFun = require("../../util/errorMsg.js");
const searchApi = require('../../service/search.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headTop: true,
    haveResult: false,
    searchVal: '请输入关键字',
    getAtherVal: '',
    pageIndex: 1,
    textcont: "---上拉加载更多---",
    showNotLike: false,
    showAll:false,
    sendId:null,
    showClearBtn:false,
    serchType:false,
    contId:''
  },
  formIdFun(e) {
    console.log(e)
    let that = this;
    formidApi.sendFormId({
      mp_openid: wx.getStorageSync("openid"),
      form_id: e.detail.formId,
      type: e.target.dataset.type,
      scene: 9
    }, function (res) {
      console.log(res)
    }, function (error) {
      console.log(error)
    })
  },
  //反感框显示
  showNotLikeFun(option){
    console.log(option)
    let that = this;
    that.setData({
      showNotLike: true,
      contId: option.detail.val,
      contTitle: option.detail.title
    });
  },
  //搜藏夹显示
  collectShowFun(option){
    console.log(option)
    let that = this;
    that.setData({
      showAll: true,
      sendId: option.detail.val
    });
  },
  //隐藏不喜欢的内容
  hideContFun(e){
    let that = this;
    that.setData({
      sickVal: e.detail.val
    })
    let newsList = that.selectComponent("#newsList");
    newsList.hateFun();
  },
  //分享
  shareFun(option) {
    let that = this;
    if (wx.getStorageSync('openid')) {
      that.setData({
        contId: option.detail.val,
        showFixed: true
      });
      if (that.data.contId) {
        let canvasEle = that.selectComponent("#canvasEle");
        canvasEle.getDataFun();
      }
    } else {
      // wx.showToast({
      //   title: '请登录授权',
      //   icon: 'none'
      // })
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
  },
  hideFun() {
    let that = this;
    that.setData({
      showFixed: false
    })
  },
  //输入内容记录
  oninputFun(e){
    let that = this;
    let serachV = e.detail.value 
    that.setData({
      getAtherVal: serachV
    });
  },
  //搜索开始
  onSearch(e) {
    let that = this;
    let serachV =  e.currentTarget.dataset.value
    that.setData({
      haveResult: true,
      showClearBtn:true,
      serchType:true,
      pageIndex:1,
      notHaveMsg:false,
      getAtherVal: e.currentTarget.dataset.value
    });
    wx.showLoading({
      title: '查询中',
    })
    if (wx.getStorageSync('openid')){
      searchApi.sendOldHertList({
        mp_openid: wx.getStorageSync('openid'),
        content: serachV
      }, function (successMsg) {
        //console.log(successMsg)
      }, function (errorMsg) {
        //console.log(errorMsg)
      })
    }
    that.component();
  },
  //取消
  cancerFun() {
    wx.navigateBack({
      delta: 1
    })
  },
  //显示清除按钮
  showClearFun(){
    let that = this;
    that.setData({
      showClearBtn: true
    });
  },
  //接收热门搜索/搜索历史传来的值
  changSearchVal(e) {
    let that = this;
    that.setData({
      getAtherVal: e.detail.val,
      haveResult: true,
      showClearBtn: true,
      serchType: true,
      pageIndex: 1,
      notHaveMsg: false
    });
    wx.showLoading({
      title: '查询中',
    })
    that.component();
  },
  component() {
    let that = this;
    let newsList = that.selectComponent("#newsList");
    newsList.init();
  },
  //添加收藏
  addcollect(e) {
    if (app.globalData.openid) {
      let that = this;
      that.setData({
        showAll: true,
        sendId: e.currentTarget.dataset.id
      });
      var myEventDetail = {
        val: e.currentTarget.dataset.id
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myeventShear', myEventDetail);
    } else {
      // wx.showToast({
      //   title: '请先登录',
      //   icon: 'none'
      // })
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }

  },
  //收藏成功
  successHeart(e) {
    let that = this;
    let getNewId = e.detail.val
    let newsList = that.selectComponent("#newsList");
    newsList.successHeartFun(getNewId);
  },
  //清除搜索框
  clearFun(){
    let that = this;
    that.component();
    that.setData({
      haveResult: false,
      showClearBtn: false,
      getAtherVal: '',
      serchType:false,
      pageIndex: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.name) {
      that.setData({
        searchVal: options.name,
        getAtherVal: options.name,
        haveResult: true
      });
      that.component();
      that.showClearFun();
      // that.component();
    }
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
    let that = this;
    if (that.data.notHaveMsg)
      return false
    that.setData({
      pageIndex: that.data.pageIndex + 1,
      serchType:false
    });
    wx.showLoading({
      title: '加载中',
    })
     that.component();
  },
  //改变提示文字
  changeText() {
    let that = this;
    that.setData({
      textcont: "---我已经到底了---",
      notHaveMsg: true
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options);
    let that =this;
    if (options.from ==='menu'){
      console.log(that.data.getAtherVal)
      let serachV = that.data.getAtherVal||'';
      var path = '/pages/searchPage/searchPage?name=' + serachV
      return {
        title: '药百川',
        path: path
      }
    }
    
    if (options.target){
      var path = '/pages/content/content?nid=' + options.target.dataset.id
      return {
        title: options.target.dataset.title,
        imageUrl: options.target.dataset.img,
        path: path
      }
    }
    
  }
})