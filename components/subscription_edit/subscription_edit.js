// components/subscription_edit/subscription_edit.js
const app = getApp();
var ssubscripitionApi = require("../../service/subscription.js").allServerApi;
const formidApi = require('../../service/formid.js').allServerApi;
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    contData: [],
    notHoveArr: [],
    isactive: 0,
    notUser: false,
    atherActive: null,
    getVal: '',
    itemW: 152,
    itemH: 68,
    pl: 32,
    pr_b: 24,
    num: 4,
    top: 144,
    thisVal: '',
    indexNumof: '',
    delectNum:0
  },
  ready(e){
    this.rpxFun()
    if (app.globalData.openid) {
      this.setData({
        notUser: true
      })
      this.getNavLsitFun();

    } else {
      this.setData({
        notUser: false
      })
    }
    this.getUserNotListFun()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //关闭弹框
    heidalt(e){
      let that =this;
      let newobjArr = []
      that.data.contData.forEach((value,index)=>{
        if(index>0){
          newobjArr.push(value.column_id)
        }
      });
      let newobjStr = newobjArr.join(',');
      ssubscripitionApi.scort({
        mp_openid: wx.getStorageSync('openid'),
        channel_index: newobjArr
      }, function (successMsg) {
        var myEventDetail = {
          val: ''
        };
        that.triggerEvent('hideal', myEventDetail, {
          bubbles: false
        });
      }, function (errorMsg) {
        var myEventDetail = {
          val: ''
        };
        that.triggerEvent('hideal', myEventDetail, {
          bubbles: false
        });
      });
      
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
    getNavLsitFun() {
      let that = this;
      ssubscripitionApi.getNavList({
        mp_openid: app.globalData.openid
      }, function (successMsg) {
        that.changeData(successMsg.data.data)
      }, function (errorMsg) {
        error(errorMsg)
      });
    },
    getUserNotListFun() {
      let that = this;
      ssubscripitionApi.getUserNotList({
        mp_openid: app.globalData.openid
      }, function (successMsg) {
        that.setData({
          notHoveArr: successMsg.data.data
        })
      }, function (errorMsg) {
        error(errorMsg)
      })
    },
    //去登录
    loginFun() {
      // wx.switchTab({
      //   url: '../mine/mine',
      // });
      wx.navigateTo({
        url: '/pages/login/login',
      });
      this.heidalt()
    },
    //添加订阅栏目
    addSub(e) {
      let that = this;
      ssubscripitionApi.addSubitem({
        mp_openid: app.globalData.openid,
        column_id: e.currentTarget.dataset.id
      }, function (successMsg) {
        that.getNavLsitFun();
        that.getUserNotListFun()
      }, function (errorMsg) {
        error(errorMsg)
      })
    },
    //删除加订阅栏目
    delSub(e) {
      let that = this;
      ssubscripitionApi.delSubitem({
        mp_openid: app.globalData.openid,
        column_id: e.currentTarget.dataset.id
      }, function (successMsg) {
        that.getNavLsitFun();
        that.getUserNotListFun()
      }, function (errorMsg) {
        error(errorMsg)
      })
    },
    //触摸开始
    touchstart(e) {
      let that = this;
      that.data.delectNum = 0;
      if (e.currentTarget.dataset.index > 0) {
        that.setData({
          atherActive: e.currentTarget.dataset.index,//点击的索引
          getVal: e.currentTarget.dataset.val,//获取点击的值
          thisVal: e.currentTarget.dataset.val,//记录点击的值
          indexNumof: e.currentTarget.dataset.index,//记录点击的索引
          getBlockId:e.currentTarget.dataset.id,//获取点击的id
          letterMsg:{
            column_id: e.currentTarget.dataset.id,
            column_name: e.currentTarget.dataset.val
          }
        })
      }
      //console.log(e)
    },
    //触摸移动
    touchmove(e) {
      let that = this;
      let getX = e.touches[0].clientX;
      let getY = e.touches[0].clientY;
      that.data.contData.forEach((value, index) => {
        let isW = getX > value.cleanL && getX < (this.data.itemW + value.cleanL);//判断移动左距离是否相等
        let isH = getY > value.cleanT && getY < (this.data.itemH + value.cleanT);//判断移动上距离是否相等
        if (isW && isH) {
          if (index !== 0 && index !== that.data.indexNumof) {
            if (that.data.newIndexNumof!==index){
              that.data.delectNum = 0;
            }
            that.data.delectNum = that.data.delectNum + 1;
            if (that.data.delectNum===1){
              that.data.contData.splice(that.data.indexNumof, 1);
              that.data.contData.splice(index, 0, that.data.letterMsg);
              that.data.newIndexNumof = index;
              that.data.indexNumof = index;
            }
          //   that.data.thisVal = value.column_name;
          //   that.data.thisid = value.column_id;
          //   that.data.indexNumof = index;
          //   value.column_name = that.data.getVal;
          //   value.column_id = that.data.getBlockId
          //   that.data.contData[that.data.atherActive].column_name = that.data.thisVal;
          //   that.data.contData[that.data.atherActive].column_id = that.data.thisid;
            that.changeData(that.data.contData)
            that.setData({
              atherActive: index,
              contData: that.data.contData
            });
            
          }
        }
      });
      that.setData({
        contData: that.data.contData
      })
    },
    //触摸移除
    touchend(e) {
      let that = this;
      
      that.setData({
        atherActive: null
      })
    },
    //换算单位
    rpxFun(e){
      let that = this;
      wx.getSystemInfo({
        success: function (res) {
          let rpx = res.windowWidth / 750;
          let iw = that.data.itemW;
          let iH = that.data.itemH;
          let itemWidth = rpx * iw;
          let itemHeight = rpx * iH
          that.setData({
            itemW: parseInt(itemWidth),
            itemH: parseInt(itemHeight),
            pl: parseInt(rpx * that.data.pl),
            pr_b: parseInt(rpx * that.data.pr_b),
            top: parseInt(rpx * that.data.top)
          })
        }
      })
    },
    //二次修改数据
    changeData(options) {
      let that =this;
      let isNum = that.data.num
      let hangNum = Math.ceil(options.length / isNum)
      options.forEach((value, index) => {
        let ofnum = (index + 1) % isNum;
        if ((index + 1) % isNum === 0) {
          value.cleanL = that.data.itemW * (isNum - 1) + that.data.pl + that.data.pr_b * (isNum - 1);
        } else if ((index + 1) % isNum == 1) {
          value.cleanL = that.data.pl
        } else {
          value.cleanL = that.data.itemW * (ofnum - 1) + that.data.pl + that.data.pr_b * (ofnum - 1);
        }
        let numH = Math.ceil((index + 1) / isNum);
        value.cleanT = that.data.itemH * numH + that.data.pr_b + that.data.top
      })
      that.setData({
        contData: options
      })
    }
  },
  
})
