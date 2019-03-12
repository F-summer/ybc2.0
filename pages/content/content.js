var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const collectApi = require('../../service/collect.js').allServerApi;
const indexApi = require('../../service/index.js').allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_url: '',
    news_title: '',
    news_thumb_url: '',
    news_id: '',
    name:'',
    update_time:'',
    good:true,
    showAll:false,
    isHeart:false,
    accouttImage:'',
    logo: '',
    showNotLike: false,
    showLoadingStatus:true,
    showYyq:true
  },
  //下一篇
  naexContentFun(e){
    let that = this;
    that.setData({
      showLoadingStatus: true
    });
    let nid = e.currentTarget.dataset.nextid;
    that.getNewsUrl(nid);
  },
  //作者跳转
  skipFun(e){
    wx.navigateTo({
      url: '/pages/public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id,
    })
  },
  //隐藏药友荟跳转按钮
  hideYyqFun(){
    this.setData({
      showYyq: false
    })
  },
  //跳转药友群
  goCommunity(e) {
    let that = this;
    let idNum = null;
    let typeName = null;
    let cityId = 0;
    // console.log(e.currentTarget.dataset.id)
    if (that.data.resData.roomid===0){
      if (that.data.resData.type===1){
        idNum = that.data.resData.categoryid;
        typeName = 'yw';
        cityId = that.data.resData.areaid;
      } else if (that.data.resData.type === 2){
        idNum = that.data.resData.categoryid;
        typeName = 'zt';
        cityId = that.data.resData.areaid;
      }
    } else if (hat.data.resData.roomid){
      idNum = that.data.resData.roomid;
      typeName='ybc'
    }
    wx.navigateToMiniProgram({
      appId: 'wx40a857971720fa97',
      path: 'pages/index/index?id=' + idNum + "&typeName=" + typeName + "&cityId=" + cityId + "&cityNmae=" + that.data.resData.areaname + "&typeofname=" + that.data.resData.name,
      extraData: {},
      envVersion: 'trial',
      success(res) {
      }
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
  formIdFun(e) {
    //console.log(e)
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
  //添加分享
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var nid = options.nid?options.nid:options.scene;
    //console.log(options.userId)
    if (nid && nid != 'undefined') {
      that.getNewsUrl(nid);
      that.getYyqMsgFun(nid);
      wx.hideToast
    } else {
      //  console.log('这里是if=false')
      wx.hideToast
      wx.showModal({
        title: '出错了',
        content: '未获取到文章地址,返回首页',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        }
      })
    }

  },
  goodFun:function(){
    if(this.data.good){
      this.setData({
        good:false
      })
    }else{
      this.setData({
        good:true
      })
    }
   
  },
  //返回首页
  backIindex(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  //添加收藏/取消收藏
  collectFun(e){
    let that = this;
    if (app.globalData.openid) {
      if (!that.data.isHeart) {
        that.data.sendId = e.currentTarget.dataset.id;
        that.setData({
          showAll: true,
          sendId: e.currentTarget.dataset.id
        });
      } else {
        wx.showLoading({
          title: '正在取消',
        })
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
          that.setData({
            isHeart: false
          });
          let addCollect = that.selectComponent("#addCollect");
          addCollect.getListFun();
        }, function (errorMsg) {
          error(errorMsg)
        })
      }
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
  //收藏成功
  successHeart(){
    let that = this;
    that.setData({
      isHeart: true
    });
  },
  deleteHtmlTag(str){
    str = str.replace(/class="[^\']*?"/gi, '').replace(/style="[^\']*?;"/gi, '').replace(/<(?!img).*?>/g, "~").trim();//去掉所有的html标签和&nbsp;之类的特殊符合
    //str = str.replace(/[^<img]\s/gi, "");
    str = str.replace(/~{1,}/gi, "</p><p>");
    str = str.replace(/^<\/p>/gi, "");
    str = str.replace(/<p>$/gi, "");
    str = str.replace(/\?\s/gi, "");
    str = str.replace(/<p>\?<\/p>/gi, "");
    //console.log(str)
    //replace(/<(?!img).*?>/g, ";")
    return str;
  },
  //获得新闻地址
  getNewsUrl: function(nid) {
    var that = this
    var url = app.globalData.postUrlTwo + app.globalData.NewsUrl;
    indexApi.contentData({
      id: nid,
      mp_openid: wx.getStorageSync('openid')
    }, function (res) {
      var article = res.data.data[0].content;
      that.setData({
        news_title: res.data.data[0].title,
        update_time: res.data.data[0].update_time,
        name: res.data.data[0].name,
        articleId: res.data.data[0].id,
        thumb_url: res.data.data[0].thumb_url,
        logo: res.data.data[0].logo,
        news_url: res.data.data[0].url,
        account_id: res.data.data[0].account_id,
        nextid: res.data.data[0].nextid
      })
      if (res.data.data[0].is_f == 1) {
        that.setData({
          isHeart: true
        });
      }else{
        that.setData({
          isHeart: false
        })
      }
      if (!res.data.data[0].url) {
        // var article = article.replace(/section|div/gi, 'p').replace(/url\("[^\']*?"/gi, '').replace(/class="[^\']*?"/gi, '').replace(/style="[^\']*?;"/gi, '').replace(/<p> <\/p>/g, '');//匹配所有section标签      
        // console.log(article)
        // console.log(article.match(/<p([\s\S]*?)<\/p>/g))
        // var pCont = article.match(/<p([\s\S]*?)<\/p>/g).join('')//匹配p标签的内容连接起来
        // var article = pCont.replace(/style="[^\']*?"/gi, ''); //把样式去除
        //console.log(that.deleteHtmlTag(article))
        let newHtml = that.deleteHtmlTag(article);
        //console.log(newHtml)
        //WxParse.wxParse('article', 'html', newHtml, that, 0);
        if (WxParse.wxParse('article', 'html', newHtml, that, 0)) {
          that.setData({
            showLoadingStatus: false
          })
        }
      } else {
        that.setData({
          showLoadingStatus: false
        })
      }
    }, function (error) {
      error(error)
    });
  },
//获取相关药友群信息
  getYyqMsgFun(nid){
    let that =this;
    indexApi.getYyqData({
      id: nid,
      mp_openid: wx.getStorageSync('openid')
    },function(res){
      that.setData({
        resData: res.data.data[0]
      })
    },function(error){
      console.log(error)
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
    let that =this;
    let addCollect = that.selectComponent("#addCollect");
    //console.log(addCollect)
    addCollect.getListFun();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    var that=this
    if (that.data.news_url.length>0){
      var path = '/pages/content/content?nid=' + that.data.articleId + "&userId=" + app.globalData.openid
    }else{
      var path = '/pages/content/content?nid=' + options.target.dataset.id + "&userId=" + app.globalData.openid
    }
   
    return {
      title: that.data.news_title,
      imageUrl:that.data.thumb_url,
      path: path
    }
  }
})