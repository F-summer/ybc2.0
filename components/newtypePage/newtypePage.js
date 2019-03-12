// components/newtypePage.js
const app = getApp();
const discoverableApi = require('../../service/discoverable.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActive: { 
      type: Number, 
      value: 0 
    },
    topnum: { 
      type: Number, 
      value: 0
    },
    widthHeight: { 
      type: String, 
      value: '100%' 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeObj: [],
    navobj: [],
    indexof: 0,
    typename:'index18'
  },
  ready(e) {
    this.getAll();
    this.getTypeList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeTab: function(e) {
      let that = this;
      var myEventDetail = {
        val: "index"+e.currentTarget.dataset.id
      };
      that.triggerEvent('tabchange', myEventDetail, {
        bubbles: false
      });
      that.setData({
        indexof: e.currentTarget.dataset.index,
        typename: "index" + e.currentTarget.dataset.id
      });
      //that.getTypeList(e.currentTarget.dataset.id)
    },
    getTypeList(option) {
      let that = this;
      let optionNum = option;
      //let optionNum = option ? option : that.data.navobj[0].account_type_id;
      discoverableApi.getAllTypeMsg({
        mp_openid: app.globalData.openid
      }, function (successMsg) {
        that.setData({
          typeObj: successMsg.data.data
        });
      }, function (errorMsg) {
        error(errorMsg)
      });
    },
    showShare(e) {
      wx.navigateTo({
        url: '../public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id
      })
    },
    //获取所有公众号信息
    getAll() {
      //debug("id号", app.globalData.openid)
      let that = this;
      discoverableApi.getalllist({
        mp_openid: ''
      }, function(successMsg) {
        that.setData({
          navobj: successMsg.data.data
        });
        that.setData({
          indexof: 0
        });
        that.getTypeList(successMsg.data.data[0].account_type_id)
      }, function(errorMsg) {
        error(errorMsg)
      });


    },
    delcommit(e) {
      let that = this;
      var myEventDetail = {
        val: e.currentTarget.dataset.id
      };
      that.triggerEvent('delcommt', myEventDetail, {
        bubbles: false
      });
    },
    //设置到顶部
    active(option) {
      //console.log(option)
    }
  }
})