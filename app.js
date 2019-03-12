const ald = require('./utils/ald-stat.js');
var creatorAPI = require("/service/index.js").allServerApi;
App({
  globalData: {
    userInfo: null,
    postUrl: 'https://www.yaobc.info/api/test/api.ashx?action=',
    postUrlTwo: 'https://www.yaobc.info/api/test/api.ashx?action=',
    /* postUrl: 'http://localhost:55708/api/sp/api.ashx?action=',  */
    /*获取新闻*/
    News: '48a63e63-576a-40fb-bd40-5c54bb074fa1',
    /*用户登录*/
    Login: 'f2971551-cae6-4810-94ec-fbcaeeb3763e',
    /*数据解密*/
    AESDecrypt: '20b735bc-6482-4614-9053-19651ab9244f',
    /*获取文章url*/
    NewsUrl: '2afe046a-c83a-4ac2-ae1a-69a2776b0b45',
    openid: wx.getStorageSync('openid'),
    statusBarHeight:0,
    titleBarHeight:0
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo;
              that.getImageInfo(res.userInfo.avatarUrl)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getImageInfo(url) { //  图片缓存本地的方法
    if (typeof url === 'string') {
      wx.getImageInfo({ //  小程序获取图片信息API
        src: url,
        success: function(res) {
          wx.setStorageSync('head_img', res.path);
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
  upDataFun() {
    let that = this;
    creatorAPI.upData({
      appid: 'wx9f13438ac4a3f56f',
      app_version: '1.1.2018.12.10'
    }, function(res) {
      // "version": 1,//版本号
      // "clearcatch": 1,//是否清除缓存 0清除 1 保留
      // "first_column_name": "推荐",//第一栏目名称
      // "top_menu_show": 1,//是否展示顶部菜单 0不显示 1显示
      // "top_news_show": 1,//是否展示推荐新闻 0不显示 1显示
      // "information_flow_news_show": 1,//是否展示信息流新闻 0不显示 1显示
      // "account_index_page_num": 25,//创作者首页展示每页数量
      //  "account__click_jump": 0//点击公众号头像是否跳转到公众号文章列表页 0不跳转 1跳转

      if (res.data.data.clearcatch) {
        //console.log("不清除缓存", wx.getStorageSync('openid'));
      } else {
        let hasPhoneNum = wx.getStorageSync('hasPhoneNum');
        let openid = wx.getStorageSync('openid');
        wx.clearStorage();
        wx.setStorageSync('openid', openid);
        wx.setStorageSync('hasPhoneNum', hasPhoneNum);
        //console.log("清除缓存",wx.getStorageSync('openid'));
      }
      if (res.data.data.top_menu_show) {
        wx.setStorageSync('showTopMenu', true)
        //console.log("显示头部菜单",wx.getStorageSync('showTopMenu'));
      } else {
        wx.setStorageSync('showTopMenu', false)
        //console.log("不显示头部菜单",wx.getStorageSync('showTopMenu'));
      }
      if (res.data.data.top_news_show) {
        wx.setStorageSync('showNewSTj', true)
        //console.log("显示推荐新闻",wx.getStorageSync('showNewSTj'));
      } else {
        wx.setStorageSync('showNewSTj', false)
        //console.log("不显示推荐新闻",wx.getStorageSync('showNewSTj'));
      }
      if (res.data.data.information_flow_news_show) {
        wx.setStorageSync('showIoNews', true);
        //console.log("显示信息流新闻",wx.getStorageSync('showIoNews'));
      } else {
        wx.setStorageSync('showIoNews', false)
        //console.log("不显示信息流新闻",wx.getStorageSync('showIoNews'));
      }
      //创作者数量展示
      if (res.data.data.account_index_page_num) {
        wx.setStorageSync('showPageNum', res.data.data.account_index_page_num);
        //console.log("优质创作者数量：", wx.getStorageSync('showPageNum'));
      }
      //药友会名称
      if (res.data.data.yyh_title) {
        wx.setStorageSync('yyhTitle', res.data.data.yyh_title);
        //console.log("优质创作者数量：", wx.getStorageSync('showPageNum'));
      }
      //药友会描述
      if (res.data.data.yyh_describe) {
        wx.setStorageSync('yyhDescribe', res.data.data.yyh_describe);
        //console.log("优质创作者数量：", wx.getStorageSync('showPageNum'));
      }
      if (res.data.data.account__click_jump) {
        wx.setStorageSync('gosrc', true)
        //console.log("跳转",wx.getStorageSync('gosrc'));
      } else {
        wx.setStorageSync('gosrc', false)
        //console.log("不跳转", wx.getStorageSync('gosrc'));
      }
    }, function(error) {
      console.log(error)
    });
  },
  onShow() {
    this.upDataFun();
    
    // this.aldstat.sendEvent('小程序启动花费时间', {
    //   "花费时长": 'd'
    // })
  },
})