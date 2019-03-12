// client/pages/1_1/discoverable_edit/discoverable_edit.js
const app = getApp();
const discoverableApi = require('../../service/discoverable.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: 1,
    dataArr: [],
    start: { x: 0, y: 0 }
  },
  //获取用户已经关注的信息
  getDiscoverable() {
    let that = this;
    //console.log(app.globalData.openid)
    discoverableApi.getDiscoverableList({
      mp_openid: app.globalData.openid
    }, function (successMsg) {
      that.setData({
        dataArr: successMsg.data.data
      });
      that.getChildeFun()
    }, function (errorMsg) {

    })
  },
  //调用子组件方法
  getChildeFun() {
    let typepage = this.selectComponent("#typepage");
    typepage.getAll();
    // let recmmendSwiper = this.selectComponent("#recmmendSwiper");
    // recmmendSwiper.getRecommendList();
  },
  //传递数据，获取数据
  onMyevent: function(e) {
    this.data.dataArr.push(e.detail.val);
    this.setData({
      dataArr: this.data.dataArr
    })
    // console.log(this.data.dataArr);
  },
  //删除关注
  delShare(e) {
    let that = this;
    console.log(e.detail)
    wx.showModal({
      title: '取消关注',
      content: '取消关注后将无法及时获取信息!请问是否确认取消?',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '执行中',
          })
          discoverableApi.cancelCommend({
            mp_openid: app.globalData.openid,
            account_id: e.currentTarget.dataset.id || e.detail.val
          }, function (successMsg) {
            wx.hideLoading();
            wx.showToast({
              title: '已取消关注'
            });
            that.getDiscoverable();
            that.getChildeFun();
            //console.log(successMsg.data.data)
            // that.data.dataArr.forEach((value, index) => {
            // if (e.currentTarget.dataset.id == value.account_id) {
            //     that.data.dataArr.splice(index, 1);
            //     that.setData({
            //       dataArr: that.data.dataArr
            //     })
            //   }
            // })
          }, function (errorMsg) {
            error(errorMsg)
          })
          
          
        } 
      }
    })

  },
  //查看详情页面
  showShare(e) {
    if (wx.getStorageSync('gosrc')) {
      wx.navigateTo({
        url: '../public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDiscoverable();
    this.getChildeFun();
    
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