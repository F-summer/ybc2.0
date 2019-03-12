//flj 2018/9/6
//调用底层封装对象
var allGlobal=require("../util/globalAjxa.js").serverGlobal;

//获取公众号文章
var allServerApi={
  getPublicNewsList:function(data,success,error){
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=c7a41a77-2dfd-4af9-8dfd-4fe8416abada'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: error,
    })
  },
  //获取公众号顶部信息
   getPublicNewsInfo: function (data, success, error) {
    allGlobal.request({
      url: allGlobal.getServerUrl('/api.ashx?action=0d73ab3c-25bb-4eb1-ad8d-38b49085626a'),
      contType: "application/x-www-form-urlencoded",
      method: 'POST',
      data: data,
      success: success,
      error: error,
    })
  }
} 


module.exports.allServerApi = allServerApi;