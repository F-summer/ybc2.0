// pages/erweima/erweima.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene: ['https://www.yaobc.info/images/mp/ybc_share.png']
    
  },
  // 识别二维码
  previewImage: function() {
  
    let that = this
    console.log(that.data.scene);
    wx.previewImage({
      current: that.data.scene[0],
      urls: that.data.scene
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },
  // 保存照片到本地
  saveImage: function() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功')
              wx.saveImageToPhotosAlbum({
                filePath: "/images/save_erweima.png",
                success(res) {
                  console.log("授权成功");
                },
                fail: function(res) {
                  console.log(res);
                }
              })
            }
          })
        } else if (res.authSetting['scope.writePhotosAlbum']) {
          wx.saveImageToPhotosAlbum({
            filePath: "/images/save_erweima.png",
            success(res) {
              console.log("success");
            },
            fail: function(res) {
              console.log(res);
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onShareAppMessage: function() {

  }
})