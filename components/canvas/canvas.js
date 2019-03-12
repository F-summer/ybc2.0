// components/canvas/canvas.js
const canvas = require('../../util/canvas.js');
const creatorAPI = require("../../service/index.js").allServerApi;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showFixed:{
      type:Boolean,
      value:false
    },
    contId:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 750,
    height: 918,
    headR: 55,
    pX: 40,
    headY: 364,
    logoY: 748,
    logoImg: '/images/logo.jpg',
    bannerH: 341,
    logoW: 140,
    lineH: 720,
    LineWidth: 670,
    title: '罗氏亮相首届进博会，个体化医疗助力健康创新新升级疗助力健康创新新升级',
    head_img:'',
    allNum:0,
    news_title:'',
    thumb_url:null,
    news_id:'',
    bannerImg:'',
    erweima:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //转换单位
    changRpx(){
      //海报宽度
      let that =this,
          rpxNum = that.data.rpxNum;
      that.setData({
        pW :750/rpxNum,
        pH : 918 / rpxNum,
        imgH : 340 / rpxNum,
        headT : 24 / rpxNum + that.data.imgH,
        leftW : 40 / rpxNum,
        userNameT: 40 / rpxNum + that.data.imgH,
        textT: 16 / rpxNum + that.data.userNameT,
        lineT : 720 / rpxNum,
        logoT : 748 / rpxNum,
        logoTextT: 68 / rpxNum + that.data.lineT
      })
        
    },
    //生成海报
    haibao() {
      wx.showLoading({
        title: '下载中,请稍等'
      });
      let that = this;
      let dataValArr = that.data.dataArr;
      //that.getImageInfo(headImgInfo);
      that.drawFun(that.data.dataArr);
      // if (that.data.allNum == 3) {
        
      // }
    },
    //绘画过程
    drawFun(item){
      let that = this;
      let title = item[0];
      //that.getImageInfo(item)
      const ctx = wx.createCanvasContext('myCanvas', that);
      ctx.setFillStyle('#ffffff');
      let canvasW = that.data.width;
      let canvasH = that.data.height;
      let userName = wx.getStorageSync('nickName')
      ctx.fillRect(0, 0, canvasW, canvasH);
      //that.getImageInfo(ctx,item)
      that.drawBanner(ctx, wx.getStorageSync('bannerImg'));
      that.drawLogo(ctx, wx.getStorageSync('erweima'));
      that.drawHead(ctx, wx.getStorageSync('head_img'));
      that.drawLine(ctx);
      that.drawEwmMsg(ctx, userName);
      that.drawUserName(ctx, userName);
      that.drawTitle(ctx, title);
      ctx.draw();
      that.saveImg();
    },
    //绘制logo二维码
    drawLogo(...item) {
      let that = this,
        leftW = that.data.pX,
        topH = that.data.logoY,
        logoWH = that.data.logoW
      item[0].drawImage(item[1], leftW, topH, logoWH, logoWH);
    },
    //绘制头像
    drawHead(...item) {
      item[0].save(); //保存当前环境的状态
      let that = this,
        r = that.data.headR,
        d = r * 2,
        leftW = that.data.pX,
        topH = that.data.headY;
      item[0].arc(leftW + r, topH + r, r, 0, 2 * Math.PI);
      item[0].clip();
      item[0].drawImage(item[1], leftW, topH, d, d);
      item[0].restore();
    },
    //绘制banner图
    drawBanner(...item) {
      item[0].save(); //保存当前环境的状态
      let that = this,
        bannerW = that.data.width,
        bannerH = that.data.bannerH;
      item[0].drawImage(item[1], 0, 0, bannerW, bannerH);
      item[0].restore();
    },
    //绘制底线
    drawLine(ctx) {
      let that = this,
        leftW = that.data.pX,
        lineTop = that.data.lineH,
        lineW = that.data.LineWidth;
      ctx.setFillStyle('#ebebeb');
      ctx.moveTo(leftW, lineTop);
      ctx.lineTo(lineW + leftW, lineTop);
      ctx.stroke()
    },
    //绘制用户名称
    drawUserName(...item) {
      let that = this;
      item[0].setTextAlign('left')
      item[0].setFontSize(36);
      item[0].setFillStyle('#333')
      item[0].fillText(item[1], 173, 401);
      item[0].setFontSize(26);
      item[0].setFillStyle('#999999')
      item[0].fillText('我正在药百川上读这篇文章', 173, 450);
    },
    //绘制文章标题
    drawTitle(...item) {
      let that = this;
      const CONTENT_ROW_LENGTH = 24; // 正文 单行显示字符长度
      let [contentLeng, contentArray, contentRows] = this.textByteLength(item[1], CONTENT_ROW_LENGTH);
      item[0].setTextAlign('left');
      item[0].setFillStyle('#333')
      item[0].setFontSize(48);
      let contentHh = 48 * 1.3;
      for (let m = 0; m < contentArray.length; m++) {
        item[0].fillText(contentArray[m], 40, 543 + contentHh * m);
      }
    },
    //绘制底文
    drawEwmMsg(...item) {
      item[0].setTextAlign('left')
      item[0].setFontSize(24);
      item[0].setFillStyle('#333');
      item[0].fillText('长按小程序码', 220, 787);
      item[0].fillText(`${item[1]}邀你进入药百川阅读全文`, 220, 847);
    },
    //封装文字折行
    textByteLength(text, num) { // text为传入的文本  num为单行显示的字节长度
      let strLength = 0; // text byte length
      let rows = 1;
      let str = 0;
      let arr = [];
      for (let j = 0; j < text.length; j++) {
        if (text.charCodeAt(j) > 255) {
          strLength += 2;
          if (strLength > rows * num) {
            strLength++;
            arr.push(text.slice(str, j));
            str = j;
            rows++;
          }
        } else {
          strLength++;
          if (strLength > rows * num) {
            arr.push(text.slice(str, j));
            str = j;
            rows++;
          }
        }
      }
      arr.push(text.slice(str, text.length));
      return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
    },
    //保存在本地
    saveImg() {
      let that = this;
      setTimeout(function() {
        //console.log("下载")
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width:1216,
          height:1942,
          canvasId: 'myCanvas',
          complete: res => {
           // console.log(res)
            if (res.errMsg === 'canvasToTempFilePath:ok') {
              wx.hideLoading();
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                  wx.hideLoading();
                  wx.showModal({
                    title: '海报已保存到系统相册',
                    content: '快去分享到朋友圈，叫小伙伴来围观吧！',
                    success(res) {
                      if (res.confirm) {
                        that.hideFun();
                        that.data.allNum = 0;
                      }else{
                        that.hideFun();
                        that.data.allNum = 0;
                      }
                    }
                  })
                 
                },
                fail(res) {
                  console.log(res)
                  wx.hideLoading()
                }
              })
            } else {

            }
          }
        }, that)
      }, 500);
    },
    //  图片缓存本地的方法
    getImageInfo(item) {
      let that = this;
      //console.log(options)
      let imgArr = new Array();
      item.forEach((value,index)=>{
       //console.log(index,"图片",value)
        if (index>0){
          that.downloadFun(value,index)
        }
      });
    },
    //尺寸转换
    rpxFun(){
      let that = this;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.windowHeight) // 获取可使用窗口高度
          let windowHeight = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
          that.setData({
            rpxNum: 750 / res.windowWidth
          });
        }
      }) 
    },
    //获取数据
    getDataFun(){
      let that = this;
      that.data.allNum = 0;
      creatorAPI.getPosterData({
        id: that.properties.contId
      },function(res){
        if (res.data.data[0].length > 30){
          res.data.data[0] = res.data.data[0].substring(0,30)+"…"
        }
        let dataVal =res.data.data;
        that.setData({
          news_title: dataVal[0],
          thumb_url:dataVal[1],
          news_id: that.properties.contId,
          dataArr: dataVal
        });
        that.data.dataArr = dataVal;
        that.getImageInfo(dataVal);
      },function(error){
        console.log(error)
      })
    },
    //隐藏
    hideFun(){
      this.triggerEvent('myevent');
    },
    //下载图片到本地
    downloadFun(...item){
      //console.log("参数",item)
      let that = this;
      wx.getImageInfo({ //  小程序获取图片信息API
        src: item[0],
        success: function (res) {
          //console.log("图片本地地址：", res.path, item[1], item[0]);
          if(item[1]==1){
            that.setData({
              bannerImg: res.path
            });
            that.data.bannerImg = res.path;
            that.data.allNum = 1 + that.data.allNum;
            wx.setStorageSync('bannerImg', res.path)
          }else if(item[1]==2){
            that.setData({
              erweima: res.path
            });
            that.data.erweima = res.path;
            that.data.allNum = 1 + that.data.allNum;
            wx.setStorageSync('erweima', res.path);
          }
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  }
})