//flj 2018/9/6
//调用底层封装对象
var allGlobal = require("../util/globalAjxa.js").serverGlobal;

var allServerApi = {
  //获取推荐新闻
  recommendNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=3a67fc71-8c34-49c5-9786-fa314ebfc288'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取最新新闻
  newNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=2aef2c5b-2566-4ae5-aad2-372adde7aa68'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取资讯新闻
  flowNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=7493ef64-61f1-44e7-b025-da119f9e8d2b'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取栏目内容列表
  columnNews: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=c417900e-7a7b-48c2-a737-315cbe569ce1'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //推荐优质创作者
  getGoodCreatorData: function(data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=65817185-0909-4d9f-991c-87b1e9462153'),
      contType:"application/x-www-form-urlencoded",
      method:'POST',
      data:data,
      success:success,
      error:errMsg,
    })
  },
  //反感获取内容接口
  getNotLikeCont: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=2939c36b-67f5-4cf8-a519-e12f9acb157f'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //提交反感内容
  sendNotLikeCont: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=ff158c4c-faf4-4faa-9a61-4b1ac09da918'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取新闻列表信息流（修改版）
  getNewsList: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=851a180f-a0f2-4323-9a86-6e563af5a91e'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取海报信息
  getPosterData: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=d4b4d137-c561-4690-9415-510cac9a423b'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //处理配置文件
  upData: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=1de503c7-cefd-45a0-bf77-1764fd2d404f'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取文章详情
  contentData: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=2afe046a-c83a-4ac2-ae1a-69a2776b0b45'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
  //获取药友群信息文章详情
  getYyqData: function (data, success, errMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=5237a4a5-cb07-499b-a418-1a357ada27bd'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: errMsg,
    })
  },
}

module.exports.allServerApi = allServerApi;