// pages/collect_index/collect_index.js
const app = getApp();
const collectApi = require('../../service/collect.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRenameAlt: false,
    showEditAlt: false,
    showHintAlt: false,
    showAllAlt: false,
    listArr: [],
    flieLength: 1,
    allPage: 0,
    collectionId: null,
    valueName: '',
    inputText: '',
    contlength: 0,
    showDelType:false
  },
  //编辑按钮出现弹框
  editFun(e) {
    this.setData({
      showAllAlt: true,
      showEditAlt: true,
      showRenameAlt: false,
      showHintAlt: false,
      collectionId: e.currentTarget.dataset.id,
      valueName: e.currentTarget.dataset.val,
      contlength: e.currentTarget.dataset.length
    })
  },
  //输入内容
  onInput(e) {
    this.setData({
      inputText: e.detail.value
    });
  },
  //重命名
  renameFun(e) {

    this.setData({
      showEditAlt: false,
      showRenameAlt: true,
      showHintAlt: false,
      showAllAlt: true,
    })
  },
  //取消编辑
  cancelEdit() {
    this.setData({
      showRenameAlt: false,
      showEditAlt: false,
      showHintAlt: false,
      showAllAlt: false
    })
  },
  //取消重命名
  cancelRename(e) {
      this.setData({
        showAllAlt: true,
        showEditAlt: true,
        showRenameAlt: false,
        showHintAlt: false,
      })
  },
  //确认重命名
  sureRename(e) {
    let that = this;
    if (that.data.inputText==''){
      wx.showToast({
        title: '收藏夹名不能为空',
        icon:'none'
      });
      return false
    }
    wx.showLoading({
      title: '修改中',
    })
    collectApi.editFile({
      mp_openid: app.globalData.openid,
      collection_name: that.data.inputText,
      collection_id: e.currentTarget.dataset.id
    }, function(successMsg) {
      wx.hideLoading();
      wx.showToast({
        title: '修改成功',
      });
      that.setData({
        showRenameAlt: false,
        showEditAlt: false,
        showHintAlt: false,
        showAllAlt: false
      });
      that.getListFun();
    }, function(errorMsg) {
      error(errorMsg)
    })

  },
  //详情页展示
  showDeatil(e) {
    wx.navigateTo({
      url: '../collect_deatil/collect_deatil?fileId=' + e.currentTarget.dataset.id + "&&index=" + e.currentTarget.dataset.index
    })
  },
  //获取文件夹列表
  getListFun() {
    let that = this;
    collectApi.getFile({
      mp_openid: app.globalData.openid
    }, function(successMsg) {
      let newArr = []
      successMsg.data.data.forEach((value, index) => {
        newArr.push(value.collection_count)
      })
      let sumNum = that.sum(newArr);
      that.setData({
        listArr: successMsg.data.data,
        flieLength: successMsg.data.data.length,
        allPage: sumNum
      });
      //console.log(sumNum)
      //console.log(successMsg.data.data)
    }, function(errorMsg) {
      error(errorMsg)
    })
  },
  sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
      s += val;
    }, 0);

    return s;
  },
  //删除收藏夹
  delFun(e) {
    let that = this;
    //console.log(e.currentTarget.dataset.id)
    if (parseInt(that.data.contlength) > 0) {
     that.setData({
       showDelType:true
     })
    }else{
      that.delServer(e.currentTarget.dataset.id,0)
    }

  },
  //删除第一种情况
  delTypeOne(){
    this.delServer(this.data.collectionId, 0)
  },
  //删除第二情况
  delTypeTowe() {
    this.delServer(this.data.collectionId, 1)
  },
  //取消删除
  cancelDel(){
    this.setData({
      showAllAlt: false,
      showEditAlt: false,
      showRenameAlt: false,
      showHintAlt: false,
      showDelType: false
    })
  },
  //删除信息
  delServer(option,at) {
    wx.showLoading({
      title: '正在删除',
    })
    let that =this;
    collectApi.delFile({
      mp_openid: app.globalData.openid,
      collection_id: option,
      action_type: at
    }, function(successMsg) {
      wx.hideLoading();
      wx.showToast({
        title: '删除成功',
      });
      that.setData({
        showAllAlt: false,
        showEditAlt: false,
        showRenameAlt: false,
        showHintAlt: false,
        showDelType:false
      })
      that.getListFun();
    }, function(errorMsg) {
      error(errorMsg)
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
    this.getListFun()
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