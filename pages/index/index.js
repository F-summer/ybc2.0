var app = getApp();
var creatorAPI = require("../../service/index.js").allServerApi;
const collectApi = require('../../service/collect.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
var indexApi = require("../../service/index.js").allServerApi;
var ssubscripitionApi = require("../../service/subscription.js").allServerApi;
const searchApi = require('../../service/search.js').allServerApi;
const error = require('../../util/errorMsg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    showNotLike: false,
    showFixed: false
  },
  onHide: function () {
    this.setData({
      cardShow: false
    })
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
  //空方法组织冒泡
  nullFun() { },
  //反感不喜欢
  notLickeFun(e) {
    let that = this;
    that.setData({
      showNotLike: true,
      contId: e.currentTarget.dataset.id,
      contTitle: e.currentTarget.dataset.title
    });
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
      showNoMsg: false,
      tabnum: 0,
      bottom_more: '--- 正在加载更多内容 ---',
      more: true
    });
    if (e.currentTarget.dataset.index === 0) {
      that.getFlowNews(that.data.news_page_index);
    } else {
      that.getColumnNews(that.data.column_id, 1);
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
  //获取栏目信息
  getNavLsitFun() {
    let that = this;
    ssubscripitionApi.getNavList({
      mp_openid: app.globalData.openid
    }, function (successMsg) {
      that.setData({
        navArr: successMsg.data.data
      });
      that.setWidth();
    }, function (errorMsg) {
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
    let that = this;
    this.setData({
      showsubscriptionalt: false
    });
    that.setData({
      isactive: 0,
      column_flow: [],
      nl_flow: [],
      column_id: that.data.navArr[0].column_id,
      news_page_index: 1,
      showNoMsg: false,
      tabnum: 0,
      bottom_more: '--- 正在加载更多内容 ---',
      more: true
    });
    that.getColumnNews(that.data.navArr[0].column_id, 1);
    that.getFlowNews(1);
    this.getNavLsitFun();
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
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }

  },
  //收藏成功
  successHeart(e) {
    let that = this;
    if (this.data.nl_new instanceof Array) {
      if (this.data.nl_new.length > 0) {
        this.data.nl_new.forEach((value, index) => {
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
          nl_new: that.data.nl_new
        });
      }
    }

    if (this.data.nl_recommend instanceof Array) {
      if (this.data.nl_recommend.length > 0) {
        this.data.nl_recommend.forEach((value, index) => {
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
          nl_recommend: that.data.nl_recommend
        });
      }
    }

    if (this.data.nl_flow instanceof Array) {
      if (this.data.nl_flow.length > 0) {
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
    }

    if (this.data.column_flow instanceof Array) {
      if (this.data.column_flow.length > 0) {
        this.data.column_flow.forEach((value, index) => {
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
          column_flow: that.data.column_flow
        });
      }
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
      wx.showToast({
        title: '取消成功'
      });
      let addCollect = that.selectComponent("#addCollect");
      addCollect.getListFun();
      that.successHeart(e.currentTarget.dataset.id)
    }, function (errorMsg) {
      error(errorMsg)
    })

  },
  //隐藏不喜欢的内容
  hideContFun(e) {
    let that = this;
    if (this.data.nl_new instanceof Array) {
      if (this.data.nl_new.length > 0) {
        this.data.nl_new.forEach((value, index) => {
          if (e.detail) {
            if (value.news_id === e.detail.val) {
              value.news_hide = true
            }
          }
        });
        this.setData({
          nl_new: that.data.nl_new
        });
      }
    }
    if (this.data.nl_recommend instanceof Array) {
      if (this.data.nl_recommend.length > 0) {
        this.data.nl_recommend.forEach((value, index) => {
          if (e.detail) {
            if (value.news_id === e.detail.val) {
              value.news_hide = true
            }
          }
        });
        this.setData({
          nl_recommend: that.data.nl_recommend
        });
      }
    }

    if (this.data.nl_flow instanceof Array) {
      if (this.data.nl_flow.length > 0) {
        this.data.nl_flow.forEach((value, index) => {
          if (e.detail) {
            if (value.news_id === e.detail.val) {
              value.news_hide = true
            }

          }
        });
        this.setData({
          nl_flow: that.data.nl_flow
        });
      }
    }
    if (this.data.column_flow instanceof Array) {
      if (this.data.column_flow.length > 0) {
        this.data.column_flow.forEach((value, index) => {
          if (e.detail) {

            if (value.news_id === e.detail.val) {
              value.news_hide = true
            }

          }
        });
        this.setData({
          column_flow: that.data.column_flow
        });
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getRecommendNews()
    that.getNewNews()
    that.getFlowNews(that.data.news_page_index);
    that.setData({
      showLoadingStatus: true
    });
    if (options.scene > 0) {
      that.getNewsUrl(options.scene)
    }
    //let bottom = that.selectComponent("#bottom");
   // bottom.show()

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      nl_flow: [],
      column_flow: [],
      news_page_index: 1
    })
    wx.showNavigationBarLoading()
    if (this.data.isactive === 0) {
      this.getRecommendNews()
      this.getNewNews()
      this.getFlowNews(1)
      //this.getGoodCreator()
    } else {
      this.getColumnNews(this.data.column_id, 1);
    }
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options)
    var path = '/pages/content/content?nid=' + options.target.dataset.id
    return {
      title: options.target.dataset.title,
      imageUrl: options.target.dataset.img,
      path: path
    }
  },

  /**
   * 获取推荐新闻列表
   */
  getRecommendNews: function () {
    var that = this
    indexApi.getNewsList({
      mp_openid: wx.getStorageSync("openid"),
      page_size: 10,
      page_index: 1,
      index: 1,
      title: ''
    }, function (res) {
      if (res.data.result === 0) {
        that.setData({
          nl_recommend: res.data.data,
          isShowLoadingNum: 1,
          showLoadingStatus: false
        })
      }
    }, function (error) {

      console.log(error)
    })
    // indexApi.recommendNews({
    //   mp_openid: app.globalData.openid
    // }, function(res) {
    //   if (res.data.result === 0) {
    //     that.setData({
    //       nl_recommend: res.data.data,
    //       isShowLoadingNum: 1,
    //       showLoadingStatus: false
    //     })
    //   }
    // }, function(errMsg) {

    // })
  },
  /**
   * 获取最新新闻列表
   */
  getNewNews: function () {
    // var that = this
    // indexApi.getNewsList({
    //   mp_openid: wx.getStorageSync("openid"),
    //   page_size: 10,
    //   page_index: 1,
    //   index: 1,
    //   title: ''
    // }, function (res) {
    //   if (res.data.result === 0) {
    //     that.setData({
    //       nl_recommend: res.data.data,
    //       isShowLoadingNum: 2,
    //       showLoadingStatus: false
    //     })
    //   }
    // }, function (error) {

    //   console.log(error)
    // })
    // indexApi.newNews({
    //   mp_openid: app.globalData.openid
    // }, function(res) {
    //   if (res.data.result === 0) {
    //     that.setData({
    //       nl_new: res.data.data,
    //       isShowLoadingNum: 2,
    //       showLoadingStatus: false
    //     })
    //   }
    // }, function(errMsg) {})
  },
  //  获取推荐优质创作者
  // getGoodCreator: function() {
  //   var that = this
  //   indexApi.getGoodCreatorData({
  //     mp_openid: ""
  //   }, function(success) {
  //     //that.data.creatorArr = success.data.data;
  //     let crator = that.selectComponent("#creator");
  //     crator.changeData(success.data.data)
  //     that.setData({
  //       creatorArr: success.data.data,
  //       isShowLoadingNum: 3,
  //       showLoadingStatus: false
  //     })
  //   }, function(errMsg) {})

  // },
  /**
   * 获取信息流列表
   */
  getFlowNews: function (page_index) {
    var that = this;
    var pagesize = 5;
    indexApi.getNewsList({
      mp_openid: app.globalData.openid,
      page_index: page_index,
      page_size: pagesize,
      index: 2,
      title: ''
    }, function (res) {
      var length = 0;
      var count = 0
      if (res.data.data.length) {
        length = res.data.data.length
        count = res.data.count
      }
      if (length > 0 && length == pagesize) {
        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          bottom_more: '--- 正在加载更多 ---',
          more: true,
          showLoadingStatus: false
        })
      } else if (length < pagesize) {
        that.setData({
          nl_flow: that.data.nl_flow.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }
      // console.log("资讯", page_index, res, that.data.more)
    }, function (errMsg) {

    })
  },
  /**
   * 获取栏目信息流列表
   */
  getColumnNews: function (column_id, page_index) {
    var that = this;
    var pagesize = 5;
    indexApi.columnNews({
      mp_openid: app.globalData.openid,
      column_id: column_id,
      page_index: page_index,
      page_size: pagesize
    }, function (res) {
      that.setData({
        showLoadingStatus: false
      });
      if (!(res.data.data instanceof Array)) {
        if (that.data.tabnum === 0) {
          that.setData({
            showNoMsg: true
          })
          return;
        }
      }
      that.data.tabnum = that.data.tabnum + 1;
      var length = 0;
      var count = 0;
      that.setData({
        showNoMsg: false
      })
      if (res.data.data.length) {
        length = res.data.data.length
        count = res.data.count
      }

      if (length > 0 && length == pagesize) {
        if (count == pagesize) {
          that.setData({
            column_flow: that.data.column_flow.concat(res.data.data),
            bottom_more: '--- 已经到底了 ---',
            more: false
          })
        } else {
          that.setData({
            column_flow: that.data.column_flow.concat(res.data.data),
            more: true
          })
        }
      } else if (length < pagesize) {
        that.setData({
          column_flow: that.data.column_flow.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }
      // console.log("资讯栏目",that.data.more,res)
    }, function (errMsg) { })
  },
  // // 点击跳转到发现页面
  toDiscover: function () {
    var url = '/pages/discoverable/discoverable'
    wx.switchTab({
      url: url,
    })
  },
  /**
   * 跳转到内容页
   */
  RedirectUrl: function (e) {
    var that = this
    if (wx.getStorageSync("num") > 0) {
      wx.setStorageSync("num", wx.getStorageSync("num") + 1)
      if (wx.getStorageSync("num") == 3) {
        let bottom = that.selectComponent("#bottom");
        bottom.show()
      }
      if (wx.getStorageSync("num") == 6) {
        // wx.getSystemInfo({
        //   success: function (res) {
        //     if (res.system.substring(0, 3) != "iOS") {
              let bottom = that.selectComponent("#bottom");
              bottom.show()
        //     }
        //   }
        // })
      }
      if (wx.getStorageSync("num") == 7) {
        wx.setStorageSync("num", 7)
      }
    } else {
      wx.setStorageSync("num", 1)
    }
    if (wx.getStorageSync("num") != 3 && wx.getStorageSync("num") != 6){
      var url = '/pages/content/content?nid=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title + '&accountid=' + e.currentTarget.dataset.accountid + '&accouttImage=' + e.currentTarget.dataset.accouttimage;
      wx.navigateTo({
        url: url
      })
    }
  },
  onReachBottom: function (options) {
    var that = this
    var ishavenews = that.data.more;
    if (ishavenews) {
      wx.showLoading({
        title: '正在加载',
      })
      var next_page_index = that.data.news_page_index + 1
      that.setData({
        news_page_index: next_page_index,
      })
      if (that.data.isactive === 0) {
        that.getFlowNews(that.data.news_page_index)
      } else {
        that.getColumnNews(this.data.column_id, that.data.news_page_index);
      }


      wx.hideLoading()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    this.upDataFun();
    that.getNavLsitFun();
    let addCollect = that.selectComponent("#addCollect");
    addCollect.getListFun();
    // that.onLoad();
  },
  upDataFun() {
    let that = this;
    creatorAPI.upData({
      appid: 'wx9f13438ac4a3f56f',
      app_version: '1.1.2018.12.10'
    }, function (res) {
      that.setData({
        showLm: res.data.data.top_menu_show == 0 ? false : true,
        tuijianShow: res.data.data.top_news_show == 0 ? false : true,
        ioShow: res.data.data.information_flow_news_show == 0 ? false : true
      });
    }, function (error) {
      console.log(error)
    });
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
  hideFun() {
    let that = this;
    that.setData({
      showFixed: false
    })
  },
  getNewsUrl: function (nid) {
    var that = this
    var url = app.globalData.postUrlTwo + app.globalData.NewsUrl
    wx.request({
      url: url,
      method: 'POST',
      data: {
        id: nid,
        // title: title,
        // account_id: accountid,
        mp_openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          newsObj: res.data.data[0],
          cardShow: true
        })
        // console.log(res.data.data[0]);
      }
    })
  }

})