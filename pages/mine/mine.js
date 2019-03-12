// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../images/no_login_hand.png',
    nickName: '',
    loginBtn_show: false,
    mask_show: false,
    // desk_show: true,
    instruction_show: false,
    yijian: false
  },
  // 收藏夹
  collection: function() {
    var that = this
    if (app.globalData.openid) {
      wx.navigateTo({
        url: '../collect_index/collect_index',
      })
    } else {
      // wx.showModal({
      //   title: '提示',
      //   content: '请先登录',
      //   success: function(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
  },

  // 历史记录
  history: function() {
    var that = this
    if (app.globalData.openid) {
      wx.navigateTo({
        url: '/pages/history/history',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      // wx.showModal({
      //   title: '提示',
      //   content: '请先登录',
      //   success: function(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
  },
  //扫描二维码
  erweima: function() {
    wx: wx.navigateTo({
      url: '/pages/erweima/erweima',
      success: function(res) {},
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {},
    })
  },
  //打开分享小程序
  share: function() {
    var that = this
    that.setData({
      mask_show: true
    })
  },
  //分享小程序
  shareBegin: function() {
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '药百川',
      path: '/pages/index/index',
      success: function(res) {
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {
            console.log(res)
          },
          complete: function(res) {
            console.log(res)
          }
        })
      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  //关闭分享
  closeMask: function() {
    this.setData({
      mask_show: false
    })
  },
  // 添加到桌面
  addDesk: function() {
    this.setData({
      instruction_show: true
    })
  },
  //关闭添加到桌面
  close: function() {
    this.setData({
      instruction_show: false
    })
  },
  /**用户登录*/
  getUserInfo: function() {
    var that = this
    wx.login({
      success: function(e) {
        var code = e.code
        console.log(code)
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function(res) {
            var nickName = res.userInfo.nickName
            var avatarUrl = res.userInfo.avatarUrl
            that.setData({
              avatarUrl: avatarUrl,
              nickName: nickName,
              loginBtn_show: false,
              yijian: true
            })
            console.log(res);
            wx.setStorageSync('nickName', nickName)
            wx.setStorageSync('avatarUrl', avatarUrl)
            that.getOpenID(code, res.encryptedData, res.iv) //调用服务器api
            wx.getImageInfo({ //  小程序获取图片信息API
              src: avatarUrl,
              success: function(res) {
                that.data.head_img = res.path;
                that.data.allNum = 1 + that.data.allNum;
                wx.setStorageSync('head_img', res.path);
              },
              fail(err) {
                console.log(err)
              }
            })
          },
          fail: function() {
            that.setData({
              loginBtn_show: true
            })
          }
        })
      }
    })
  },

  getOpenID: function(code, encryptedData, iv) {

    //提交数据
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: app.globalData.postUrl + app.globalData.Login,
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv,
      },
      success: function(res) {
        // console.log(res.data.data)
        app.globalData.openid = res.data.data
        wx.setStorageSync('openid', res.data.data)
      }
    })
  },

  checkLogin: function() {
    var that = this
    var openid = wx.getStorageSync('openid')

    if (openid) {

      wx.checkSession({
        success: function() {
          var nickName = wx.getStorageSync('nickName')
          var avatarUrl = wx.getStorageSync('avatarUrl')
          if (nickName && avatarUrl) {
            that.setData({
              nickName: nickName,
              avatarUrl: avatarUrl,
              loginBtn_show: false
            })

          } else {
            that.setData({
              loginButton: true
            })
          }
        },
        fail: function() {
          that.setData({
            loginButton: true
          })
        }
      })
    } else {
      that.setData({
        loginButton: true
      })
    }
  },

  /* 用户登录按钮事件 */
  login: function() {
    var that = this
    var openid = wx.getStorageSync('openid')
    if (openid) {
      wx.checkSession({
        success: function() {
          var nickName = wx.getStorageSync('nickName')
          var avatarUrl = wx.getStorageSync('avatarUrl')
          if (nickName && avatarUrl) {
            that.setData({
              nickName: nickName,
              avatarUrl: avatarUrl,
              loginBtn_show: false
            })

          } else {
            that.getUserInfo()
          }
        },
        fail: function() {
          that.getUserInfo()
        }
      })
    } else {

      that.getUserInfo()
    }
  },
  //跳转反馈页
  feedbackFun() {
    let that = this;
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  /*获取电话号码*/
  getPhoneNumber: function(e) {
    /** console.log(e)
     console.log(e.detail.errMsg)
     console.log(e.detail.iv)
     console.log(e.detail.encryptedData)*/
    var that = this
    wx.checkSession({
      success: function() {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('session_key:' + that.data.session_key)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
      },
      fail: function() {
        // session_key 已经失效，需要重新执行登录流程

      }
    })
  },

  onLoad: function() {
    this.checkLogin()
    // this.getSystem();
    if (wx.getStorageSync("openid")) {
      this.setData({
        yijian: true
      })
    }
  },
  // getSystem: function() {
  //   var that = this
  //   wx.getSystemInfo({
  //     success: function(res) {
  //       if (res.system.substring(0, 3) == "iOS") {
  //         that.setData({
  //           desk_show: false
  //         })
  //       }
  //     }
  //   })
  // },
  onShow: function() {
    this.getUserInfo();
  }

})