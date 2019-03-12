// components/navigation_one/navigation_one.js
var app = getApp();
var creatorAPI = require("../../service/index.js").allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
const searchApi = require('../../service/search.js').allServerApi;
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){
    let that = this;
    that.getHartFun()
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
          //console.log(res)
          let statusBarHeight=20
          let titleBarHeight = 64
          if (res.model.indexOf('iPhone') !== -1) {
            titleBarHeight = 64;
            statusBarHeight = res.statusBarHeight + 4
          } else {
            titleBarHeight = 68;
            statusBarHeight = res.statusBarHeight + 8
          }
          that.setData({
            statusBarHeight: statusBarHeight ,
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
      }, function(successMsg) {
        
        that.setData({
          heartArr: successMsg.data.data.hot_search
        });
      }, function(errorMsg) {
        // error(errorMsg)
      })
    },
    //带关键字跳转
    searchOption(e){
      wx.navigateTo({
        url: '/pages/searchPage/searchPage?name='+e.currentTarget.dataset.item,
      })
    }
  }
})