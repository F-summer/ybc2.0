var public_mark = require("../../service/public_mark.js").allServerApi;
const collectApi = require('../../service/collect.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom_more: '--- 正在加载更多内容 ---',
    publick_info: {},
    nl_flow: [],
    account_id: '',
    news_page_index: 1,
    showAll: false,
    showNotLike: false,
  },
  //启动分享
  skipFun(e) {
    return false
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
  hideFun() {
    let that = this;
    that.setData({
      showFixed: false
    })
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
  //隐藏不喜欢的内容
  hideContFun(e) {
    let that = this;
    if (this.data.nl_flow) {
      this.data.nl_flow.forEach((value, index) => {
        value.news.forEach((val, ind) => {
          if (e.detail) {
            if (val.news_id === e.detail.val) {
              val.news_hide = true
            }
          } else {
            if (val.news_id === e) {
              val.news_hide = false
            }

          }
        })

      });
      this.setData({
        nl_flow: that.data.nl_flow
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    that.setData({
      account_id: options.account_id
    })


    wx.showLoading({
      title: '正在加载',
      mask: true,
      success: function () {
        that.getPublickInfo()
        that.getPublicNews(1)
      },
      complete: function () {
        wx.hideLoading()
      }
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      nl_flow: [],
    })
    wx.showNavigationBarLoading()
    this.getPublicNews(1)
    this.getPublickInfo()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()

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
        value.news.forEach((val, ind) => {
          if (e.detail) {
            if (val.news_id === e.detail.val) {
              val.news_collection = 1
            }
          } else {
            if (val.news_id === e) {
              val.news_collection = 0
            }

          }
        })

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
    }, function (successMsg) {

      wx.hideLoading();
      setTimeout(function () {
        wx.showToast({
          title: '取消成功',
          duration: 2000
        });
      }, 500)
      that.successHeart(e.currentTarget.dataset.id)
    }, function (errorMsg) {
      error(errorMsg)
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var path = '/pages/content/content?nid=' + options.target.dataset.id
    return {
      title: options.target.dataset.title,
      imageUrl: options.target.dataset.img,
      path: path
    }
  },

  // 获取公众号信息
  getPublickInfo: function () {
    var that = this
    public_mark.getPublicNewsInfo({
      mp_openid: app.globalData.openid,
      account_id: that.data.account_id,
    }, function (success) {

      that.setData({
        publick_info: success.data.data
      })

      wx.setNavigationBarTitle({
        title: success.data.data[0].account_name //页面标题为路由参数
      })
    }, function (errMsg) {

    })
  },
  /**
   * 获取推荐新闻列表
   */
  getPublicNews: function (page_index) {
    var that = this
    var pagesize = 1;
    public_mark.getPublicNewsList({
      mp_openid: app.globalData.openid,
      account_id: that.data.account_id,
      page_size: pagesize, //天数
      page_index: page_index //页数
    }, function (res) {

      var length = 0;
      // var count = 0
      if (res.data.data.length) {
        length = res.data.data.length
        // count = res.data.count
      }

      if (length > 0 && length == pagesize) {
     
        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          more: true
        })
        if (that.data.nl_flow.length < 4) {
          that.loadData();    //数据长度不够再次调用
        }

    
      } else if (length < pagesize) {
        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }
    },
      function (errMsg) {

      });
  },

  /**
   * 跳转到内容页
   */
  RedirectUrl: function (e) {
    var url = '/pages/content/content?nid=' + e.currentTarget.dataset.id
    wx.navigateTo({
      url: url
    })
  },
  onReachBottom: function (options) {
    this.loadData();
  },
  loadData: function () {
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
      that.getPublicNews(that.data.news_page_index)
      wx.hideLoading()
    }
  }

})
