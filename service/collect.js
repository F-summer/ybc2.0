var allGlobal = require('../util/globalAjxa.js').serverGlobal;
//接口同意
var allServerApi = {
  //添加文件夹
  addFile: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=9cff1671-55ee-4d89-af74-472e24886cc0'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //修改文件夹
  editFile: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=13805704-6b5c-4195-98dc-5ed12426312c'),
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
  },
  //用户取消或收藏文件夹
  heartServer: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=9d12ff78-7622-4590-bf91-72b725eda5aa'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //删除收藏夹
  delFile: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=421d8ff7-e7e0-4972-abd8-f99cc2c90c2e'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  },
  //获取用户收藏夹内容列表
  getContList: function (data, success, errorMsg) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=0dfe0308-9dce-49cc-8131-270d35af1a1f'),
      contType: 'application/x-www-form-urlencoded',
      method: 'POST',
      data: data,
      success: success,
      error: errorMsg
    });
  }
}

module.exports.allServerApi = allServerApi;