// components/notLike/notLike.js
var app = getApp();
var indexApi = require("../../service/index.js").allServerApi;
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showNotLike:{
      type:Boolean,
      value:false
    },
    contId: {
      type: Number,
      value: null
    },
    contTitle: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showNotLikeTwon: false,
    forstArr:[],
    secondArr:[]
  },
  ready(){
    let that = this;
    that.init(0);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //取消弹框
    cancerFun() {
      let that = this;
      that.setData({
        showNotLike: false
      });
    },
    showTwonFun(e){
      let that = this;
      let num = e.currentTarget.dataset.id;
      that.setData({
        showNotLikeTwon:true
      });
      that.init(num);
    },
    backOneFun(){
      let that = this;
      that.setData({
        showNotLikeTwon: false
      });
    },
    init(option){
      let that = this;
      indexApi.getNotLikeCont({
        parent_id: option
      },function(res){
        if (option===0){
          that.setData({
            forstArr: res.data.data
          })
        }else{
          that.setData({
            secondArr: res.data.data
          })
        }
        
      },function(error){
        console.log(error)
      })
    },
    //提交反感内容
    sendNotLikeContFun(e){
      let that = this;
      if (wx.getStorageSync("openid")){
        indexApi.sendNotLikeCont({
          mp_openid: wx.getStorageSync("openid"),
          r_id: that.properties.contId,
          s_id: e.currentTarget.dataset.id,
          title: that.properties.contTitle
        }, function (res) {
          that.setData({
            showNotLike: false
          });
          var myEventDetail = {
            val: that.properties.contId,
            title: that.properties.contTitle
          } // detail对象，提供给事件监听函数
          that.triggerEvent('hideListMsg', myEventDetail);
          error("提交成功");
        }, function (errorMsg) {
          error(errorMsg)
        })
      }else{
        wx.navigateTo({
          url: '/pages/login/login',
        });
      }
    }
  }
})
