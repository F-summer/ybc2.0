// component/recmmend_swiper.js
const app = getApp();
const discoverableApi = require('../../service/discoverable.js').allServerApi;
const debug = require('../../util/debuger.js');
const error = require('../../util/errorMsg.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActive: { // 属性名
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0 // 属性初始值（可选），如果未指定则会根据类型选择一个
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    movies: [],
    newData: [],
    swiperCurrent: 0,
  },
  ready(e) {
    //this.getRecommendList();

    // console.log(this.properties.isActive)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      //console.log(e)
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    showShare(e) {
      wx.navigateTo({
        url: '../public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id
      })
    },
    //处理数据
    dataChang() {
      let len = this.data.movies.length;
      let array = this.data.movies;
      let size = 3;
      let ArrNum = Math.ceil(len / size);
      let moreArr = [];
      //console.log(ArrNum)
      for (var x = 0; x < ArrNum; x++) {
        let start = x * size;
        let end = start + size;
        moreArr.push(array.slice(start, end));
      }
      this.setData({
        newData: moreArr
      });
    },
    //添加关注
    addshare(e) {
      let that = this;
      wx.showLoading({
        title: '关注中',
      })
      discoverableApi.addCommend({
        mp_openid: app.globalData.openid,
        account_id: e.currentTarget.dataset.id
      }, function(successMsg) {
        wx.hideLoading();
        wx.showToast({
          title: '关注成功'
        });
        var myEventDetail = {
          val: e.currentTarget.dataset.id
        };
        that.triggerEvent('myevent', myEventDetail, {
          bubbles: false
        });
        that.getRecommendList();
      }, function(errorMsg) {
        error(errorMsg)
      });
      // this.data.movies.forEach((value, index) => {
      //   if (e.currentTarget.dataset.id == value.account_id) {
      //     var myEventDetail = {
      //       val: value
      //     };
      //     that.triggerEvent('myevent', myEventDetail, {
      //       bubbles: false
      //     });
      //     that.setData({
      //       swiperCurrent: 0
      //     })
      //     //console.log("删除的是最后一个",)
      //     that.data.movies.splice(index, 1);
      //     //console.log("剩下的元素", that.data.movies)
      //     that.dataChang();

      //   }

      // });
    },
    //获取推荐列表
    getRecommendList() {
      let that = this;
      discoverableApi.recommendList({
        mp_openid: app.globalData.openid
      }, function(successMsg) {
        that.setData({
          movies: successMsg.data.data
        });
        that.dataChang();
      }, function(errorMsg) {
        error(errorMsg)
      })
    },
  }

})