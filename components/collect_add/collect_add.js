// components/collect_add/collect_add.js
const app = getApp();
const collectApi = require('../../service/collect.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showAll: {
      type: Boolean,
      value: false
    },
    sendId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    objList: [],
    inputText: ''
  },
  ready(e) {
    this.getListFun();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancel(e) {
      this.setData({
        showAll: false
      })
    },
    formIdFun(e){
      console.log(e)
      let that = this;
      formidApi.sendFormId({
        mp_openid: wx.getStorageSync("openid"),
        id: that.properties.sendId,
        form_id: e.detail.formId,
        type: e.target.dataset.type,
        scene:9
      }, function (res) {
        console.log(res)
      }, function (error) {
        console.log(error)
      })
    },
    //获取文件夹列表
    getListFun() {
      if (app.globalData.openid){
       let that = this;
       collectApi.getFile({
         mp_openid: app.globalData.openid
       }, function (successMsg) {
         that.setData({
           objList: successMsg.data.data
         })
         //console.log(successMsg.data.data)
       }, function (errorMsg) {
         error(errorMsg)
       })
     }
    },
    //输入框内容
    onInput(e) {
      this.setData({
        inputText: e.detail.value
      });
    },
    //确认并收藏
    sureFile() {
      let that = this;
      if (that.data.inputText===''){
        wx.showToast({
          title: '收藏夹名称不能为空',
          icon:'none'
        });
        return false
      }
      wx.showLoading({
        title: '收藏中',
      })
      collectApi.addFile({
        mp_openid: app.globalData.openid,
        collection_name: that.data.inputText,
        news_id: that.properties.sendId
      }, function(successMsg) {
        wx.hideLoading();
        wx.showToast({
          title: '收藏成功'
        });
        that.setData({
          showAll: false
        });
        that.getListFun();
        var myEventDetail = {
          val: that.properties.sendId
        };
        that.triggerEvent('myevent', myEventDetail, {
          bubbles: false
        });
      }, function(errorMsg) {
        error(errorMsg)
        //console.log(errorMsg)
      })
    },
    //添加到收藏夹中
    saveHeartFun(e){
      wx.showLoading({
        title: '收藏中',
      })
      let that = this;
      //console.log(that.properties.sendId)
      collectApi.heartServer({
        mp_openid: app.globalData.openid,
        collection_id: e.currentTarget.dataset.id,
        news_id: that.properties.sendId,
        action_type:1
      }, function (successMsg) {
        wx.hideLoading();
        wx.showToast({
          title: '收藏成功'
        });
        that.setData({
          showAll: false
        });
        that.getListFun();
        var myEventDetail = {
          val: that.properties.sendId
        };
        that.triggerEvent('myevent', myEventDetail, {
          bubbles: false
        });
      }, function (errorMsg) {
        error(errorMsg)
        //console.log(errorMsg)
      })
      
    }
  }
})