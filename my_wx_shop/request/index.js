let count=0  //表示初始请求次数

export const request = (params) => {
  //发送的时候加一个loading效果
  wx.showLoading({
    title: '正在加载...',
  })

  count++



  let baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url:baseUrl+params.url,
      fail: (err) => {
        reject(err)
      },
      success: (res) => {
        resolve(res.data.message)
      },
      complete:()=>{   //不管成功或者失败都需要执行的函数
        count--;

        if(count==0) {

          wx.hideLoading()

        }
       

      }
    })
  })

}