var allGlobal = require('../util/globalAjxa.js').serverGlobal;
//接口同意
var allServerApi = {
  //获取我的关注
  getDiscoverableList: function (data,success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=df825d24-d48b-4274-b39d-27da193fec56'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data:data,
      success: success,
      error: errorMsg
    });
  },
  //获取关注类别
  getalllist: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=30201f40-0818-4bb1-a5a3-43949145687d'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //获取推荐列表
  recommendList: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=65817185-0909-4d9f-991c-87b1e9462153'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //通过类型获取列表
  getTypeCommendList: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=f151fc23-fc3c-436b-b163-a958cf380f31'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //取消关注
  cancelCommend: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=b7017307-48c4-45f3-a6bc-9b70bf794261'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //添加关注
  addCommend: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=4458ad3d-f3e6-4c9b-99d9-4c3076023147'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //发现首页获取分类全部消息
  getAllTypeMsg: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=a073ed54-46e3-48b5-8cf7-9e03b2637e2b'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
}

module.exports.allServerApi = allServerApi;
