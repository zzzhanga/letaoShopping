// pages/category/index.js
// 引入 我们封装的函数 
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,//元素初始索引
   
    leftMenuList:[],//定义左边分类的数据
    rightMenuList:[], //定义右边分类的数据
    scrollTop:0  //滚动初始位置

  },
  cates:[],//定义所有分类的数据 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCatesData()
    // 1 先判断本地缓存里面有没有数据 如果没有我们就发送请求获取数据
    // 2 如果有数据  继续判断 这个数据过期没有  设置以下过期时间为5分钟 如果在5分钟内
    // 还是使用之前缓存数据 如果大于5分钟 重新发送请求获取新的数据
    let cates=wx.getStorageSync('cates')
    console.log(cates)
    
    
    if(!cates) { //表示缓存里面没有数据那么就重新发送请
        this.getCatesData()
        console.log(1)
    }else { //表示缓存里面有数据
    
      if((Date.now()-cates.time)>1000*60*5) { //当前的时间把缓存的数据时间大于5分钟
        console.log(2)
        this.getCatesData()
     
      }else  {  //小于5分钟  
        console.log(3)
        // let newCates=cates.data
        this.cates=cates.data
        let leftMenuList=this.cates.map(v=>v.cat_name) 
        let rightMenuList=this.cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
        
      }

     }


  },

  // 定义获取分类数据的方法 
  // getCatesData() {
  //   request({url:'/categories'}).then(res=>{
  //     console.log(res);
  //     this.cates=res  //存储一下数据 
  //     //构造左边的数据
  //     let leftMenuList=this.cates.map(v=>v.cat_name) 
  //     let rightMenuList=this.cates[0].children
  //     this.setData({
  //       leftMenuList,
  //       rightMenuList
  //     })
      
  //   })
  // }

  /**
   * 更改成es7 的方法 
   * 
   */
   async  getCatesData() {
    let res= await request({url:'/categories'})
    console.log(res);
    this.cates=res  //存储一下数据 
   
    // wx.getStorageSync('cates') //获取本地缓存的数据
    // //采用本地缓存  存数据
    wx.setStorageSync('cates', {time:Date.now(),data:this.cates})

    
    //构造左边的数据
    let leftMenuList=this.cates.map(v=>v.cat_name) 
    let rightMenuList=this.cates[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },

  /**
   *  定义我们左边分类（高亮切换 右边数据切换）方法
   * 
   */
  handlerChangeItem(e) {
    // console.log(e)
    let index=e.currentTarget.dataset.index
    console.log(index)
    //   let {index}=e.currentTarget.dataset
    //   console.log(index)

    // this.cates

    let rightMenuList=this.cates[index].children
    // let leftMenuList=this.cates.map(v=>v.cat_name) 
    this.setData({
      rightMenuList,  //重新构造右边的数据
      //  leftMenuList, // 重新构造左边的数据
       currentIndex:index, //重新构造初始化高亮的索引
       scrollTop:0   //初始构造右边的初始滚动位置
       
    })




      






  
  }



})

// bug 优化 
// 2  数据请求的时候每次带的路径太长 提取公共路径
// 3  如果一旦请求多了 会出现回调地狱的问题 可以采用 es7  async await  
// 1  数据量太大 页面加载很慢 需要做缓存 