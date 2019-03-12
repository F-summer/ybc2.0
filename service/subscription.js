var allGlobal = require('../util/globalAjxa.js').serverGlobal;
//接口同意
var allServerApi = {
  //获取我的订阅
  getNavList: function(data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=9cd57863-322d-4ae8-afa3-cdb6c9bf12ec'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //获取推荐栏目
  getUserNotList: function(data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=a5fa4a8d-d40e-46e9-bccf-45432fe41d65'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //添加订阅栏目
  addSubitem: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=08086c60-46b4-406e-83e6-91ea9ecec17a'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //删除订阅栏目
  delSubitem: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=29a3a8de-461b-4c61-b01b-6e5d71c079de'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //订阅排序
  scort: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=35c45aad-c8cd-4b9f-a612-7c64d45c0b1c'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
}

module.exports.allServerApi = allServerApi;