var allGlobal = require('../util/globalAjxa.js').serverGlobal;
//接口同意
var allServerApi = {
  //记录搜索历史
  sendOldHertList: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=be1a03d0-af61-483f-8185-e3b9504574c3'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //热搜标签
  getOldHertList: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=c8794054-07c0-4d8b-9519-b2af750321fb'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //清除搜索历史
  clearOldList: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=484d0b65-ece8-464a-b9ce-3fbe894277fe'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //获取文件夹
  getFile: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=86205ce5-bace-4c38-9229-18c94cb5afa6'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  }
}

module.exports.allServerApi = allServerApi;