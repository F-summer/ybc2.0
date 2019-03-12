// client/pages/1_0/discoverable/discoverable.js
const app = getApp();
const discoverableApi = require('../../service/discoverable.js').allServerApi;
const debug = require('../../util/debuger.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gzObj: [],
    isActive: 0,
    widthPx: '100%',
    loginType: true,
    haveCommend: false,
    widthHeight: "100%",
    topnume:0,
    idname:'index1'
  },
  //改变宽度
  changeData(len) {
    let width = len * (80 + 18) + 'rpx'
    this.setData({
      widthPx: width
    });
  },
  //查看详情页面
  showShare(e) {
    if (wx.getStorageSync('gosrc')){
      wx.navigateTo({
        url: '../public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id
      });
    }
  },
  //获取用户已经关注的信息
  getDiscoverable() {
    let that = this;
    discoverableApi.getDiscoverableList({
      mp_openid: app.globalData.openid
    }, function(successMsg) {
      let len = successMsg.data.data.length + 1;
      that.changeData(len);
      that.setData({
        gzObj: successMsg.data.data
      });
      if (successMsg.data.data.length > 0 && successMsg.data.data instanceof Array) {
        that.setData({
          haveCommend: true
        });
      } else {
        that.setData({
          haveCommend: false
        });
      }

    }, function(errorMsg) {

    })
  },

  //用户是否已经登录
  loginOr() {
    if (app.globalData.openid) {
      this.setData({
        loginType: true
      });
      this.getDiscoverable();

    } else {
      this.data.loginType = false;
      this.setData({
        loginType: false
      });

    }
    this.getChildeFun();
  },
  //调用子组件方法
  getChildeFun() {
    // let typepage = this.selectComponent("#typepage");
    // typepage.getAll();
    // let recmmendSwiper = this.selectComponent("#recmmendSwiper");
    // recmmendSwiper.getRecommendList();
  },
  //未登录，跳转登录页面
  loginBind() {
    // wx.switchTab({
    //   url: '/pages/mine/mine',
    // })
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },
  changeTab(e){
    console.log(e)
    this.setData({
      idname:'iddd'
    })
  },
  //监听滚动条
  scrollTopFun(e) {
    // let typepage = this.selectComponent("#typepage");
    // typepage.getAll();
    let that = this;
    that.topnume = e.detail.scrollTop;
    // that.setData({
    //   topnume: e.detail.scrollTop
    // })
  },
  //设置高度
  setHeight: function(e) {
    this.setData({
      widthHeight: wx.getSystemInfoSync().screenHeight + "px"
    })
  },
  injoyCreator(){
    wx.navigateTo({
      url: '/pages/feedback/feedback?type=creator',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loginOr();
    this.setHeight();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})