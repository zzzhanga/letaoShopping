// pages/goods_detail/index.js

// 渲染商品详情数据
// 点击图⽚，调出图⽚画廊，进⾏预览
// 点击收藏
// 联系客服
// 分享功能
// 加⼊购物⻋



// 引入 我们封装的函数 
import { request } from '../../request/index.js'

import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    detialData:{}

  },

  goodsDetial:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let  goods_id=options. goods_id
  console.log(goods_id)

   this.getGoodsDetailData(goods_id)

  },



  // 定义获取商品详情数据方法 
    async   getGoodsDetailData(goods_id) {
    let  res= await request({url:'/goods/detail',data:{goods_id:goods_id}})
    console.log(res)

    this.goodsDetial=res

    this.setData({
      detialData:res
    })
       

  },

  //实现突破预览功能 
  previewImg(e) {
   //获取是当前图片
    // console.log(e)
    let current=e.currentTarget.dataset.img
  //获取所有图片的的url链接数组
 let urls= this.goodsDetial.pics.map(v=>v.pics_big_url)
 console.log(urls)
  console.log(current)



    //图片预览功能
    wx.previewImage({
      current: current, // 当前显示图片的http链接
       urls:urls // 需要预览的图片http链接列表
    })

  }

  
})