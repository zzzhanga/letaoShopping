// 引入 我们封装的函数 
import { request } from '../../request/index.js'

import regeneratorRuntime from '../../lib/runtime/runtime';

/**
 * 用户实现上拉加载/ 下拉刷新 
 * 1 配置上拉加载 
 * 2 监听（找到）上拉加载事件 
 * 3  判断当前页面是第几页 
 *   3.1 如果当前页面是最后一页或者说大于等于最后一页 给用户提示是最后一页没有更多数据了
 *    如何求数据的总页数？
 *     求出总页面数    Math.ceil (总数据/每一页加载的数据量)
 *       total  
 *      let totalPage=Math.ceil(total/pagesize )  ==3    
 *   3.2 如果是小于最后一页 那么需要加载下一页数据 并且 还需要把之前页面的数据跟当前页面的数据进行组合

 * 下拉刷新
 * 
 * 1 配置下拉刷新 
 * 2 找到监听下拉刷新的函数/方法 
 * 3  清空 之前的所有的数据  goodsList变成空数组  pagenum 重新置为1 
 * 3  重新加载最新的数据 
 */





// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
      id:0,
      value:'综合',
      isActive:true
    },
    {
      id:1,
      value:'销量',
      isActive:false
    }, {
      id:2,
      value:'价格',
      isActive:false
    }
  ],

  goodsList:[],//定义商品列表

  },


  // query	否	string	关键字
  // cid	否	string	分类id
  // pagenum	否	number	页码
  // pagesize	否	number	页容量

   params:{
     cid:'',
     url:'/goods/search',
     query:'',
     pagesize:10,  //每次加载10条数据
     pagenum:1  //初始化第一页
   },

   totalPage:0, //初始定义总页面数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  
    this.params.cid=options.cid   || ""
    this.params.query=options.query ||""

    //调用获取数据的方法
    this.getGoodsListData()

  },

  /**
   * changeSelected  父组件更改子组件传递过来的值
   */

  changeSelected(e) {
    // console.log(e)
    // console.log(e.detail)
    let myid=e.detail
    let mytabs=this.data.tabs; //取值可以值
    console.log(mytabs)
      mytabs.forEach((v,i)=>{
        // console.log(v)
        // console.log(i)
        v.isActive=false  //干掉所有人
        if(v.id==myid) {
            v.isActive=true  //留下自己
        }
      })
      this.setData({
        tabs:mytabs    //设置值
      })

  },

  // 定义获取数据的方法 
    async getGoodsListData() {

  let myparams= this.params
  // console(myparams)


       let res= await request({url:myparams.url,data:{cid:myparams.cid,query:myparams.query,pagesize:myparams.pagesize,pagenum:myparams.pagenum}})
       console.log(res)

       this.totalPage=Math.ceil(res.total/myparams.pagesize)
       console.log(this.totalPage)  //总共有多少页
  
       this.setData({  //...this.data.goodsList 之前的数据   ...res.goods //当前获取到的数据
         goodsList:[...this.data.goodsList,...res.goods]
       })
       wx.stopPullDownRefresh() //数据回来之后关闭下拉刷新样式
    
  },

  // 监听上拉触底事件  
  onReachBottom() {
    //  let isFlag=this.params.pagenum
    if(this.params.pagenum-this.totalPage>=0) {
      wx.showToast({
        title: '最后一页了',
      })   
    }else {

      this.params.pagenum++  //去请求下一页数据
      wx.showToast({
        title: '第'+this.params.pagenum+'页',
      })

      this.getGoodsListData() //重新获取数据

    }  
  },

  //onPullDownRefresh()  下拉刷新 
  onPullDownRefresh(){
//     wx.showLoading({
//       title: '刷新',
//     })
//     setTimeout(()=>{
// wx.hideLoading()

//     },2000)


  this.params.pagenum=1;  
  this.setData({
    goodsList:[]
  })

  this.getGoodsListData()
   

  
  
  }
  
})