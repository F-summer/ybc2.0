//flj 2018/9/7
//调用底层封装对象
var allGlobal = require("../util/globalAjxa.js").serverGlobal;


var allServerApi = {
 //获取用户信息和阅读信息及关键词
  getUserReaderHistory: function (data, success, error) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=27673a8f-2d6d-4fe5-96d8-e474316094f2'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: error,
    })
  },
  //获取历史阅读文章
  getHistoryNewsList: function (data, success, error) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=66a7f4b0-2446-4791-8f8d-420969488265'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: error,
    })
  }
}


module.exports.allServerApi = allServerApi;