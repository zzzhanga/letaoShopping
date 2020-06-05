// pages/search/index.js

// 引入 我们封装的函数 
import { request } from '../../request/index.js'

import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    query: '',
    searchList:[],
    isShow:false,
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  //定义搜索方法 
  handlerInput(e) {
    // console.log(e.detail.value)
    let query = e.detail.value
    this.setData({
      query,
      isShow:true
    })
    // 调用数据获取
    this.getSearchData(query)
  },
  //定义获取请求数据的方法 
  async  getSearchData() {

    let query = this.data.query

    let res = await request({ url: '/goods/qsearch', data: { query } })
    console.log(res)
    this.setData({
      searchList:res
    })

  },
  //给按钮绑定点击事件 
  handlerTap() {
   this.setData({
     isShow:false,
     searchList:'',
     inputValue:''
   })
  }



})