// components/toDesk/toDesk.js
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
    contentShow: false,
    num: wx.getStorageSync("num")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    show(){
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          if (res.system.substring(0, 3) != "iOS") {
            that.setData({
              contentShow: true,
              num: wx.getStorageSync("num"),
              phone:'android'
            })
          }else{
            that.setData({
              contentShow: true,
              num: wx.getStorageSync("num"),
              phone: 'iOS'
            })
          }
        }
      })
      
    },
    close() {
      this.setData({
        contentShow: false
      })
    }
  }
})