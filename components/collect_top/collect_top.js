// components/collect_top.js
const app = getApp();
const collectApi = require('../../service/collect.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flieLength:{
      type: Number,
      value:1
    },
    allPage:{
      type:Number,
      value:0
    },
    stlyeType: {
      type: String,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showAllAlt:false,
    inputText:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //创建收藏夹
    addFile(){
      this.setData({
        showAllAlt:true
      })
    },
    onInput(e){
      this.setData({
        inputText: e.detail.value
      });
    },
    cancelFile(){
      this.setData({
        showAllAlt: false
      });
    },
    //添加收藏夹
    sureFile(){
      let that = this;
      if (that.data.inputText === '') {
        wx.showToast({
          title: '收藏夹名称不能为空',
          icon: 'none'
        });
        return false
      }
      wx.showLoading({
        title: '添加中',
      });
      collectApi.addFile({
        mp_openid: app.globalData.openid,
        collection_name: that.data.inputText,
        news_id:''
      },function(successMsg){
        wx.hideLoading();
        wx.showToast({
          title: '添加成功'
        });
        that.setData({
          showAllAlt: false
        });
        var myEventDetail = {
          val: app.globalData.openid
        };
        that.triggerEvent('myevent', myEventDetail, {
          bubbles: false
        });
      },function(errorMsg){
        error(errorMsg)
        //console.log(errorMsg)
      })
    }
  }
})