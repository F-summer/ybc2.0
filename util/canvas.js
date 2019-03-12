const canvas = function(){
  console.log("开始绘制")
  const ctx = wx.createCanvasContext('notes');
  ctx.clearRect(0, 0, 0, 0);//在给定矩形内清空一个矩形
  const arr2 = ['/images/logo.jpg'];    // 有图片海报背景图&&海报正文图片
  const WIDTH = 750;
  const HEIGHT =918;
  //  绘制图片模板的 底图
  ctx.setStrokeStyle("#ffffff");
  // ctx.drawImage(arr2[0], 0, 0, WIDTH, HEIGHT);
  ctx.drawImage(arr2[0], 40, 748, 140, 140);//绘制logo二维码
  ctx.save();//保存当前环境的状态
  let r = 55;
  let d = r * 2;
  let cx = 364;
  let cy = 40;
  ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
  ctx.clip();
  let headImg = wx.getStorageSync('avatarUrl');
  console.log(headImg)
  ctx.drawImage(headImg, cx, cy, d, d);
  ctx.restore();
  ctx.draw();
  setTimeout(function () {
    wx.canvasToTempFilePath({
      canvasId: 'notes',
      fileType: 'jpg',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
            });
          },
          fail() {
            wx.hideLoading()
          }
        })
      }
    })
  }, 500);
}
module.exports = canvas;