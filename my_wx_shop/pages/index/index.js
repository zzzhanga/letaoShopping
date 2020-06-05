// 引入 我们封装的函数 
import { request } from '../../request/index.js'

import regeneratorRuntime from '../../lib/runtime/runtime';




Page({

  /**
   * 页面的初始数据
   */
  data: {

    swiperList: [], //轮播图数据
    navList:[],  //首页导航数据
  floorList:[]//首页楼层数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用获取轮播图方法 
    this.getSwiperData()
    //调用获取首页导航栏方法
    this.getNavData()
     //调用获取首页楼层数据方法
    this.getFloorData()
  },

  
    
  //定义首页轮播图方法
    async  getSwiperData() {
    let result=  await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: result
    })

  },




  //定义首页导航栏方法 
  getNavData() {
    request({ url: '/home/catitems' }).then(result => {
      // console.log(result);
      this.setData({
        navList: result
      })

    })

  },




  /*采用es7 的  async await 方法
     定义首页楼层 方法
  */ 
    async  getFloorData() {
   let result=await  request({ url: '/home/floordata' })
   this.setData({
    floorList: result
  })


  }

})





// 初始代码
  // getSwiperData() {
  //   wx.request({
  //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
  //     success: (result) => {
  //     console.log(result);
  //     this.setData({
  //       swiperList:result.data.message
  //     })
  //      },



  //   })

  // }



  //获取首页轮播图方法
  // getSwiperData() {
  //   request({ url: '/home/swiperdata' }).then(result => {
  //     // console.log(result);
  //     this.setData({
  //       swiperList: result
  //     })

  //   })
  // },



/**  错误的写法
      *   // success:function(res) {
    //  console.log(res);

    //  this.setData({
    //    swiperList:res.data.message
    //  })
    // }
  //   success(res) {

  //   this.setData({
  //     swiperList:res.data.message
  //   })
  //  }
      */