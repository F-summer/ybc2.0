// pages/collect_deatil/collect_deatil.js
const app = getApp();
const collectApi = require('../../service/collect.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrMsg: [],
    listArr: [{
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      },
      {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      },
      {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      },
      {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      },
      {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }, {
        "collection_id": 1,
        "collection_name": "默认收藏夹",
        "collection_count": 0,
        "collection_index": 0,
        "collection_type": 0,
        "collection_img": "http://...xxx.png",
        "last_update_time": "2018-09-13 12:00"
      }
    ],
    indexNum: 0,
    flieLength: 1,
    allPage: 0,
    leftH: 0,
    pageNum: 1,
    bottom_more: '--- 正在加载更多内容 ---',
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
  hideFun() {
    let that = this;
    that.setData({
      showFixed: false
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
  //隐藏不喜欢的内容
  hideContFun(e) {
    let that = this;
    if (this.data.arrMsg) {
      this.data.arrMsg.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_hide = true
          }
        } else {
          if (value.news_id === e) {
            that.data.arrMsg.splice(index, 1)
            value.news_hide = false
          }

        }
      });
      this.setData({
        arrMsg: that.data.arrMsg
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
  /**
   * 跳转到内容页
   */
  RedirectUrl: function (e) {
    var url = '/pages/content/content?nid=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title + '&accountid=' + e.currentTarget.dataset.accountid;
    wx.navigateTo({
      url: url
    })
  },
  //获取内容
  getListFun() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    collectApi.getFile({
      mp_openid: app.globalData.openid
    }, function (successMsg) {
      wx.hideLoading();
      let newArr = []
      successMsg.data.data.forEach((value, index) => {
        newArr.push(value.collection_count)
      })
      let sumNum = that.sum(newArr);
      that.setData({
        listArr: successMsg.data.data,
        flieLength: successMsg.data.data.length,
        allPage: sumNum
      });
    }, function (errorMsg) {
      error(errorMsg)
    })
  },
  getContListFun(search_word, page_index) {
    var that = this
    var pagesize = 10;
    collectApi.getContList({
      mp_openid: app.globalData.openid,
      collection_id: search_word,
      page_size: pagesize,
      page_index: page_index
    }, function (res) {
      var length = 0;
      var count = 0;
      if (res.data.result === 0) {
        length = res.data.data.length
        count = res.data.data.count
      }
      if (length > 0 && length == pagesize) {
        if (count == pagesize) {
          that.setData({
            arrMsg: that.data.arrMsg.concat(res.data.data),
            bottom_more: '--- 已经到底了 ---',
            more: false
          })
        } else {
          that.setData({
            arrMsg: that.data.arrMsg.concat(res.data.data),
            more: true,
            bottom_more: '--- 正在加载更多内容 ---',
          })
        }
      } else if (length < pagesize) {
        that.setData({
          arrMsg: that.data.arrMsg.concat(res.data.data),
          bottom_more: '--- 已经到底了 ---',
          more: false
        })
      }
    }, function (errMsg) {
      // console.log("推荐创作者失败" +errMsg);
    })
  },
  sum(arr) {
    var s = 0;
    arr.forEach(function (val, idx, arr) {
      s += val;
    }, 0);

    return s;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      indexNum: options.fileId,
      leftH: parseInt(options.index) * 93
    })
    this.getListFun();
    this.getContListFun(options.fileId, this.data.pageNum)
  },
  choiceType(e) {
    this.setData({
      arrMsg: []
    });
    this.getContListFun(e.currentTarget.dataset.id, 1);
    this.setData({
      indexNum: e.currentTarget.dataset.id,
      pageNum: 1
    });
  },
  //添加收藏
  addcollect(e) {
    if (app.globalData.openid) {
      let that = this;
      //console.log(e.currentTarget.dataset.id)
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
    if (this.data.arrMsg) {
      this.data.arrMsg.forEach((value, index) => {
        if (e.detail) {
          if (value.news_id === e.detail.val) {
            value.news_collection = 1
          }
        } else {
          if (value.news_id === e) {
            that.data.arrMsg.splice(index, 1)
            value.news_collection = 0
          }

        }
      });
      this.setData({
        arrMsg: that.data.arrMsg
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
      console.log(that.properties)
      wx.hideLoading();
      setTimeout(function () {
        wx.showToast({
          title: '取消成功',
          duration: 2000
        });
      }, 100)
      that.getListFun();
      that.successHeart(e.currentTarget.dataset.id)
    }, function (errorMsg) {
      error(errorMsg)
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  lower(options) {
    var that = this
    var ishavenews = that.data.more
    if (ishavenews) {
      wx.showLoading({
        title: '正在加载',
      })
      var next_page_index = that.data.pageNum + 1
      that.setData({
        pageNum: next_page_index,
      })
      this.getContListFun(this.data.indexNum, this.data.pageNum);
      wx.hideLoading()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})