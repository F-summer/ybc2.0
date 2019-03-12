var allGlobal = require("../util/globalAjxa.js").serverGlobal;
var allServerApi = {
  //获取群信息
  sendFormId: function (data,success, error) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=5cf6e0fd-f040-4fb9-a731-c310bc2c63c5'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data:data,
      success: success,
      error: error,
    })
  },
}


module.exports.allServerApi = allServerApi;