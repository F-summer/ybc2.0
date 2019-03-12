// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardShow:{
      type:Boolean
    },
    newsObj:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close:function(){
      this.setData({
        cardShow:false
      })
    },
    tiaozhuan:function(e){
      wx.navigateTo({
        url: '/pages/content/content?nid=' + e.currentTarget.dataset.id,
      })
    }
  }
})
