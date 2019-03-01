// pages/detail/detail.js
let detas = require("../../datas/list-data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      
      dataobj:{},
      index:null,
      musics: false,
      showandhide:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      dataobj:detas.list_data[index],
      index
    });
    let huangcun = wx.getStorageSync("name")
    console.log(huangcun)
    if (!huangcun) {
      wx.setStorageSync("name", {})
    };
    if (huangcun[index]){
    this.setData({
      // showandhide:huangcun[index]
      showandhide:true
      });
    }
  },
  shoucan(){
    let s = !this.data.showandhide;
    this.setData({
      showandhide:s
    });
    let title = this.data.showandhide?"收藏成功":"取消收藏";
    wx.showToast({
      title,
      icon:"success"
      
    });
    let { index } = this.data;
    wx.getStorage({
      key: 'name',
      success:(datas) => {
        
        let obj = datas.data;
        obj[index] = this.data.showandhide;
        wx.setStorage({
          key: "name",
          data: obj,
          success: () => {

          }
        })
      },
    })
    
  },
 
  handlemusic(){
    this.setData({
      musics: !this.data.musics
    })
    let { dataUrl, title } = this.data.dataobj.music;
      const Backgroundmusic = wx.getBackgroundAudioManager();
      Backgroundmusic.src = dataUrl;
      Backgroundmusic.title = title;
    if (this.data.musics){
      Backgroundmusic.play();
    console.log("aaa")
    }
    else{
      console.log("sss")
      Backgroundmusic.pause()
    }
  },
})