//flj 2018/9/7
//调用底层封装对象
var allGlobal = require("../util/globalAjxa.js").serverGlobal;
var allServerApi = {
  //获取群信息
  getData: function( success, error) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=01ce4708-b672-4cab-a3bd-a927fc24c306'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      success: success,
      error: error,
    })
  },
}


module.exports.allServerApi = allServerApi;