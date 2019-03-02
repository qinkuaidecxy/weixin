// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    inshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.getUser();
      
      },
      getUser(){
        //获取用户信息
        wx.getUserInfo({
          success: (data) => {

            this.setData({
              userInfo: data.userInfo
            });
          },
          fail: () => {
            console.log("请求失败");
          }
        });
        //判断用户是否授权
        wx.getSetting({
          success: (data) => {
            if (data.authSetting["scope.userInfo"]) {
              this.setData({
                inshow: false
              })
            }
          }
        });
      },
      //用户是否同意授权按钮
      YesandNo(data){
        if (data.detail.rawData) {
          this.getUser();
        }
      },
      quehuan (){
        //点击切换list页面
        wx.switchTab({
          url: "/pages/list/list"
        })
      },
   
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})