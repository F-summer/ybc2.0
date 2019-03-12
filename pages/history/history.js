var history = require("../../service/history.js").allServerApi;
const collectApi = require('../../service/collect.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
var app = getApp();
Page({
  data: {
    id: 11,
    news_page_index: 1,
    historInfo: [],
    totle: 0, //总阅读量
    count: 0, //七天阅读量
    search_word: "", //搜索关键字
    tips_id: "", //点击下面文章分类的id,默认为空    
    nl_flow: [],
    bottom_more: '--- 正在加载更多内容 ---',
    showAll: false,
    sendId: '',
    showNotLike: false
  },
  //启动分享
  shareFun(e) {
    let that = this;
    if (wx.getStorageSync('openid')) {
      that.setData({
        contId: e.target.dataset.id,
        showFixed: true
      });
      if (that.data.contId) {
        let canvasEle = that.selectComponent("#canvasEle");
        canvasEle.getDataFun();
      }
    } else {
      // wx.showToast({
      //   title: '请登录授权',
      //   icon: 'none'
      // })
      wx.navigateTo({
        url: '/pages/login/login',
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
  hideFun() {
    let that = this;
    that.setData({
      showFixed: false
    })
  },
  //隐藏不喜欢的内容
  hideContFun(e) {
    let that = this;
    if (this.data.nl_flow) {
      this.data.nl_flow.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_hide = true
          }
        } else {
          if (value.news_id === e) {
            value.news_hide = false
          }

        }
      });
      this.setData({
        nl_flow: that.data.nl_flow
      });
    }
  },
  //反感不喜欢
  notLickeFun(e) {
    let that = this;
    that.setData({
      showNotLike: true,
      contId: e.currentTarget.dataset.id,
      contTitle: e.currentTarget.dataset.title
    });
  },
  changcolor: function(e) {
    var ids = e.currentTarget.dataset.id //获取自定义的id   
    var urlId = e.currentTarget.dataset.urlid
    this.setData({
      id: ids, //把获取的自定义id赋给当前组件的id(即获取当前组件)  
      tips_id: urlId,
      news_page_index: 1,
      nl_flow: []
    })
    this.getNewsList(this.data.search_word, this.data.tips_id, this.data.news_page_index);
  },
  //添加收藏
  addcollect(e) {

    if (app.globalData.openid) {
      let that = this;

      that.setData({
        showAll: true,
        sendId: e.currentTarget.dataset.id
      })
    } else {
      // wx.showToast({
      //   title: '请先登录',
      //   icon: 'none'
      // })
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }

  },
  //收藏成功/取消收藏
  successHeart(e) {
    let that = this;
    if (this.data.nl_flow) {
      this.data.nl_flow.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_collection = 1
          }
        } else {
          if (value.news_id === e) {
            value.news_collection = 0
          }

        }
      });
      this.setData({
        nl_flow: that.data.nl_flow
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
      setTimeout(function() {
        wx.showToast({
          title: '取消成功',
          duration: 2000
        });
      }, 500)
      that.successHeart(e.currentTarget.dataset.id)
    }, function(errorMsg) {
      error(errorMsg)
    })

  },
  // 搜索按钮
  search: function() {
    this.setData({
      news_page_index: 1,
      nl_flow: []
    })
    this.getNewsList(this.data.search_word, this.data.tips_id, this.data.news_page_index);
  },
  getInputValue: function(e) {
    this.setData({
      search_word: e.detail.value
    })
  },
  //获取获取用户信息和阅读信息及关键词
  getUserInfo: function() {
    var that = this
    history.getUserReaderHistory({
      mp_openid: app.globalData.openid,
    }, function(success) {
      that.setData({
        historInfo: success.data.data[0].tips,
        totle: success.data.data[0].totle,
        count: success.data.data[0].count,
      })

    }, function(errMsg) {

    })

  },
  getNewsList: function(search_word, tips_id, page_index) {
    var that = this
    var pagesize = 10;
    history.getHistoryNewsList({
      mp_openid: app.globalData.openid,
      search_word: search_word, //文本框里的关键词,默认为空
      tips_id: tips_id, //点击下面文章分类的id,默认为空
      page_size: pagesize,
      page_index: page_index
    }, function(res) {
      var length = 0;
      var count = 0;
      if (res.data.result === 0) {
        length = res.data.data.length
        count = res.data.data.count
      }
      if (length > 0 && length == pagesize) {
        if (count == pagesize) {

          that.setData({
            nl_flow: that.data.nl_flow.concat(res.data.data),
            bottom_more: '--- 已经到底了 ---',
            more: false
          })
        } else {
          that.setData({
            nl_flow: that.data.nl_flow.concat(res.data.data),
            more: true
          })
        }
      } else if (length < pagesize) {
        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }
    }, function(errMsg) {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo();
    this.getNewsList(this.data.search_word, this.data.tips_id, 1);
  },
  /**
   * 跳转到内容页
   */
  RedirectUrl: function (e) {
    var url = '/pages/content/content?nid=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title + '&accountid=' + e.currentTarget.dataset.accountid;
    wx.navigateTo({
      url: url
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(options) {
    var that = this
    var ishavenews = that.data.more
    if (ishavenews) {
      wx.showLoading({
        title: '正在加载',
      })
      var next_page_index = that.data.news_page_index + 1
      that.setData({
        news_page_index: next_page_index,
      })
      this.getNewsList(this.data.search_word, this.data.tips_id, this.data.news_page_index);
      wx.hideLoading()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})