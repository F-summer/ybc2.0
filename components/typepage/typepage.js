// components/typepage/typepage.js
const app = getApp();
const discoverableApi = require('../../service/discoverable.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActive: { // 属性名
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0 // 属性初始值（可选），如果未指定则会根据类型选择一个
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    navobj: ["综合类", "专业类", "官方类", "企业类", "其他"],
    indexof: 0,
    typeObj: []
  },
  ready(e) {
    // this.getAll();
    // console.log(this.properties.isActive)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeTab: function(e) {
      let that = this;
      this.setData({
        typeObj: []
      })
      that.setData({
        indexof: e.currentTarget.dataset.index
      });
      that.getTypeList(e.currentTarget.dataset.id)
    },
    // getTypeList(option) {
    //   let that = this;
    //   let optionNum = option ? option : that.data.navobj[0].account_type_id;
    //   discoverableApi.getTypeCommendList({
    //     mp_openid: app.globalData.openid,
    //     account_type_id: optionNum
    //   }, function(successMsg) {
    //     that.setData({
    //       typeObj: successMsg.data.data
    //     });
    //   }, function(errorMsg) {
    //     error(errorMsg)
    //   });
    // },
    addshare(e) {
      let that = this;
      wx.showLoading({
        title: '关注中',
      })
      discoverableApi.addCommend({
        mp_openid: app.globalData.openid,
        account_id: e.currentTarget.dataset.id
      }, function(successMsg) {
        wx.hideLoading();
        wx.showToast({
          title: '关注成功'
        });
        var myEventDetail = {
          val: e.currentTarget.dataset.id
        };
        that.triggerEvent('myevent', myEventDetail, {
          bubbles: false
        });
        that.getAll();
      }, function(errorMsg) {
        error(errorMsg)
      });
      // that.data.typeObj.forEach((value, index) => {
      //   if (e.currentTarget.dataset.id == value.account_id) {
      //     //console.log("删除的是最后一个",)
      //     var myEventDetail = {
      //       val: value
      //     };
      //     that.triggerEvent('myevent', myEventDetail, {
      //       bubbles: false
      //     });
      //     //console.log(that.triggerEvent)
      //     that.data.typeObj.splice(index, 1);
      //     that.setData({
      //       typeObj: that.data.typeObj
      //     });
      //     //console.log("剩下的元素", that.data.typeObj, e.currentTarget.dataset.id == value.id)
      //   }

      // });
    },
    showShare(e) {
      if (wx.getStorageSync('gosrc')) {
        wx.navigateTo({
          url: '../public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id
        });
      }
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
    getTypeList(option) {
      let that = this;
      let optionNum = option ? option : that.data.navobj[0].account_type_id;
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
  }
})