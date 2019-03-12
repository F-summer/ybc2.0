// components/navigation_twon/navigation_twon.js
var app = getApp();
var creatorAPI = require("../../service/index.js").allServerApi;
const searchApi = require('../../service/search.js').allServerApi;
const error = require('../../util/errorMsg.js');
const formidApi = require('../../service/formid.js').allServerApi;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showIs:{
      type: String,
      value:'false'
    },
    showback: {
      type: String,
      value: 'true'
    },
    color:{
      type:String,
      value:'#fff'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },
  ready() {
    let that = this;
    that.getHartFun();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    formIdFun(e) {
      //console.log(e)
      let that = this;
      formidApi.sendFormId({
        mp_openid: wx.getStorageSync("openid"),
        id: e.target.dataset.id,
        form_id: e.detail.formId,
        type: e.target.dataset.type,
        scene: 9
      }, function (res) {
       // console.log(res)
      }, function (error) {
        console.log(error)
      })
    },
    backFun() {
      wx.navigateBack();
    },
    indexFun() {
      wx.switchTab({
        url: "/pages/index/index"
      });
    },
    showSearchFun() {
      wx.navigateTo({
        url: '/pages/searchPage/searchPage',
      })
    },
    //获取热搜
    getHartFun() {
      let that = this;
      wx.getSystemInfo({
        success: function (res) {
         // console.log(res)
          let statusBarHeight = 20
          let titleBarHeight = 64
          if (res.model.indexOf('iPhone') !== -1) {
            titleBarHeight = 64;
            statusBarHeight = res.statusBarHeight + 4
          } else {
            titleBarHeight = 68;
            statusBarHeight = res.statusBarHeight + 8
          }
          that.setData({
            statusBarHeight: statusBarHeight,
            titleBarHeight: titleBarHeight,
            allHeight: titleBarHeight + res.statusBarHeight
          });
        },
        failure() {
          that.setData({
            statusBarHeight: 0,
            titleBarHeight: 0
          });
        }
      });
      searchApi.getOldHertList({
        mp_openid: wx.getStorageSync('openid')
      }, function (successMsg) {

        that.setData({
          heartArr: successMsg.data.data.hot_search
        });
      }, function (errorMsg) {
        // error(errorMsg)
      });
    },
    //带关键字跳转
    searchOption(e) {
      wx.navigateTo({
        url: '/pages/searchPage/searchPage?name=' + e.currentTarget.dataset.item,
      })
    }
  }
  
})
