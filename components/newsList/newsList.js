// components/newsList/newsList.js
var app = getApp();
var creatorAPI = require("../../service/index.js").allServerApi;
const collectApi = require('../../service/collect.js').allServerApi;
var indexApi = require("../../service/index.js").allServerApi;
var ssubscripitionApi = require("../../service/subscription.js").allServerApi;
const formidApi = require('../../service/formid.js').allServerApi
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    getAtherVal: {
      type: String,
      value: ''
    },
    typeNum: {
      type: String,
      value: 1
    },
    pageIndex: {
      type: Number,
      value: 1
    },
    serchType: {
      type: Boolean,
      value: false
    },
    sickVal: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arrList: [],
    bottom_more: '--- 正在加载更多内容 ---',
    more: true,
    news_page_index: 1,
    nl_flow: [],
    creatorArr: [],
    navArr: [],
    isactive: 0,
    showAll: false,
    widthnum: "100%",
    sendId: null,
    column_flow: [],
    column_id: 0,
    showLoadingStatus: false,
    isShowLoadingNum: 0,
    showsubscriptionalt: false,
    showNoMsg: false,
    tabnum: 0,
    arrLength: true,
    haveMsg: true,
    contId:''
  },
  ready() {
    let that = this;
    //that.init();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏不喜欢的内容
    hateFun() {
      console.log(this.properties.sickVal)
      let that = this;
      if (this.data.arrList.length > 0) {
        this.data.arrList.forEach((value, index) => {
          if (value.news_id === that.properties.sickVal) {
            value.news_hide = true
          }
        });
        this.setData({
          arrList: that.data.arrList
        });
      }
    },
    skipFun(e) {
      wx.navigateTo({
        url: '/pages/public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id,
      })
    },
    formIdFun(e) {
      console.log(e)
      let that = this;
      formidApi.sendFormId({
        mp_openid: wx.getStorageSync("openid"),
        id: e.target.dataset.id,
        form_id: e.detail.formId,
        type: e.target.dataset.type,
        scene: 9
      }, function (res) {
        console.log(res)
      }, function (error) {
        console.log(error)
      })
    },
    //反感不喜欢
    notLickeFun(e) {
      let that = this;
      console.log(e)
      var myEventDetail = {
        val: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', myEventDetail);
    },
    //导航切换
    showNav(e) {
      let that = this;
      that.setData({
        showLoadingStatus: true,
      });
      that.setData({
        isactive: e.currentTarget.dataset.index,
        column_flow: [],
        nl_flow: [],
        column_id: e.currentTarget.dataset.id,
        news_page_index: 1,
        bottom_more: '',
        showNoMsg: false,
        tabnum: 0
      });
      that.getColumnNews(that.data.column_id, 1);
      if (e.currentTarget.dataset.index === 0) {
        that.getFlowNews(that.data.news_page_index)
      }
    },
    setWidth() {
      var query = wx.createSelectorQuery();

      let length = this.data.navArr.length;
      let width = length * (28 + 15);
      this.setData({
        widthnum: width + "px"
      })
    },
    getNavLsitFun() {
      let that = this;

      ssubscripitionApi.getNavList({
        mp_openid: app.globalData.openid
      }, function(successMsg) {
        that.setData({
          navArr: successMsg.data.data
        });
        that.setWidth();
      }, function(errorMsg) {
        error(errorMsg)
      })
    },
    //展示栏目弹框
    showdiscoverableFun(e) {
      this.setData({
        showsubscriptionalt: true
      })
    },
    //取消栏目框
    hidediscoverableFun(e) {
      this.setData({
        showsubscriptionalt: false
      });
      this.getNavLsitFun();
    },
    //添加收藏
    addcollect(e) {
      if (app.globalData.openid) {
        let that = this;
        that.setData({
          showAll: true,
          sendId: e.currentTarget.dataset.id
        });
        var myEventDetail = {
          val: e.currentTarget.dataset.id
        } // detail对象，提供给事件监听函数
        this.triggerEvent('myeventShear', myEventDetail);
      } else {
        wx.navigateTo({
          url: '/pages/login/login',
        });
        // wx.showToast({
        //   title: '请先登录',
        //   icon: 'none'
        // })
      }

    },
    //收藏成功
    successHeartFun(option) {
      let that = this;
      if (this.data.arrList.length > 0) {
        this.data.arrList.forEach((value, index) => {
          if (option) {
            if (value.news_id === option) {
              value.news_collection = 1
            }

          } else {
            if (value.news_id === e) {
              value.news_collection = 0
            }

          }
        });
        this.setData({
          arrList: that.data.arrList
        });
      }
    },
    //取消收藏
    removeCollect(e) {
      wx.showLoading({
        title: '正在取消',
      })
      let that = this;
      //that.successHeart(that.properties.sendId)
      collectApi.heartServer({
        mp_openid: app.globalData.openid,
        collection_id: '',
        news_id: e.currentTarget.dataset.id,
        action_type: 0
      }, function(successMsg) {

        wx.hideLoading();
        wx.showToast({
          title: '取消成功'
        });
        let addCollect = that.selectComponent("#addCollect");
        addCollect.getListFun();
        that.successHeart(e.currentTarget.dataset.id)
      }, function(errorMsg) {
        error(errorMsg)
      })

    },
    RedirectUrl: function(e) {
      var url = '/pages/content/content?nid=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title + '&accountid=' + e.currentTarget.dataset.accountid + '&accouttImage=' + e.currentTarget.dataset.accouttimage;
      wx.navigateTo({
        url: url
      })

      
    },
    init() {
      let that = this;
      that.setData({
        bottom_more: "--- 正在加载更多内容 ---"
      });
      indexApi.getNewsList({
        mp_openid: wx.getStorageSync("openid"),
        page_size: 10,
        page_index: that.properties.pageIndex,
        index: 2,
        title: '' || that.properties.getAtherVal
      }, function(successMsg) {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        if (successMsg.data.data instanceof Array) {
          if (that.properties.serchType) {
            that.data.arrList = []
          }
          if (successMsg.data.data.length > 0) {
            that.data.arrList = that.data.arrList.concat(successMsg.data.data)
            that.setData({
              haveMsg: true,
              arrList: that.data.arrList,
              arrLength: that.data.arrList.length
            })
          }
          if (successMsg.data.data.length < 10) {
            that.tishiMsg()
          }
        } else {
          if (that.properties.pageIndex <= 1) {
            that.setData({
              haveMsg: false
            });
            that.tishiMsg()
          } else {
            that.tishiMsg()
          }
        }
      }, function(error) {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        console.log(error)
      })
    },
    //文字提示信息
    tishiMsg() {
      let that = this;
      that.setData({
        bottom_more: "---我已经到底了---",
        showTsBtn: true
      });
      that.triggerEvent('myeventNews');
    },
    shareFun(e) {
      var myEventDetail = {
        val: e.target.dataset.id
      } // detail对象，提供给事件监听函数
      this.triggerEvent('shareFunPage', myEventDetail);
    }
  }
})