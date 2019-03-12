Page({

     data: {
          loadNumber: 0,
          goodsList: [{
                    goodsId: '1',
                    goodsTitle: '玩具熊1',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '2',
                    goodsTitle: '玩具熊2',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '3',
                    goodsTitle: '玩具熊3',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '4',
                    goodsTitle: '玩具熊4',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               }
          ],
          goodsList1: [{
                    goodsId: '5',
                    goodsTitle: '玩具熊5',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '6',
                    goodsTitle: '玩具熊6',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '7',
                    goodsTitle: '玩具熊7',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '8',
                    goodsTitle: '玩具熊8',
                    goodsPrice: '200.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               }
          ],
          goodsList2: [{
                    goodsId: '21',
                    goodsTitle: '玩具熊9',
                    goodsPrice: '300.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '22',
                    goodsTitle: '玩具熊10',
                    goodsPrice: '300.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               },
               {
                    goodsId: '23',
                    goodsTitle: '玩具熊11',
                    goodsPrice: '300.00',
                    goodsType: '毛绒玩具',
                    goodsTime: '2017-6-12'
               }
          ]
     },

     onReachBottom: function() { //上拉加载
          wx.showLoading({
               title: '正在加载',
          })
          //加载次数加一
          this.setData({
               loadNumber: this.data.loadNumber + 1
          })
          if (this.data.loadNumber == 1) {
               this.setData({
                    goodsList: this.data.goodsList.concat(this.data.goodsList1) //将返回的数据拼接到现有数据后面
               });
          } else if (this.data.loadNumber == 2) {
               this.setData({
                    goodsList: this.data.goodsList.concat(this.data.goodsList2) //将返回的数据拼接到现有数据后面
               });
          }
          setTimeout(function() {
               wx.hideLoading()
          }, 1000)
     }
})