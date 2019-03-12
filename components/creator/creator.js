var creatorAPI = require("../../service/index.js").allServerApi;
var indexApi = require("../../service/index.js").allServerApi;
var app = getApp();
Component({
  properties: {
    dataArr: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: []
    }

  },
  data: {
    datalen: [],
    vertical: false,
    circular: true, //衔接滑动
    duration: 500, //滑动时间长
    autoplay: true,
    interval: 3000,
    currentSwiper: 0,
    dataLenth: 0,

  },
  ready(e) {
    this.dataChange();
    this.getGoodCreator();
   
  },
  methods: {
    swiperChange(e) {
      this.setData({
        currentSwiper: e.detail.current
      })
    },
    showShare(e) {
      if (wx.getStorageSync('gosrc')) {
        wx.navigateTo({
          url: '../public_mark_share/public_mark_share?account_id=' + e.currentTarget.dataset.id
        });
      }
    },
    dataChange() {
      let lenth = parseInt(this.data.dataArr.length) / 12;
      var linshiArr = this.data.dataArr; //总长度
      var add = 12 - this.data.dataArr.length % 12; //缺少的
      var quyuAdd = {
        account_id: "",
        account_img: "/images/wait.png",
        account_index: "0",
        account_name: "虚位以待",
        reason: ""
      }
      for (var i = 0; i < add; i++) {
        linshiArr.push(quyuAdd);
      }
      this.setData({
        dataArr: linshiArr
      })

      let index = 0;
      let arr = [];
      for (var i = 0; i < lenth; i++) {
        arr.push(i);
      }
      this.setData({
        datalen: arr,
        dataLenth: lenth
      })
    },
    changeData(option) {
      this.setData({
        dataArr: option
      });
      this.dataChange();
    },
    getGoodCreator: function () {
      var that = this
      indexApi.getGoodCreatorData({
        mp_openid: ""
      }, function (success) {
        // let crator = that.selectComponent("#creator");
        let num = wx.getStorageSync('showPageNum');
        
        that.changeData(success.data.data.slice(0, num))
      }, function (errMsg) { })

    },

  }
})