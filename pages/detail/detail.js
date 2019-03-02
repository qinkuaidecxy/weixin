// pages/detail/detail.js
let detas = require("../../datas/list-data.js");
let appdatas = getApp();
// console.log(appdatas);
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
    let index = options.index;//获取当前页面下标
    this.setData({
      dataobj:detas.list_data[index],
      index
    });
    //读取缓存
    let huangcun = wx.getStorageSync("name")
    
    if (!huangcun) {//初始化缓存
      wx.setStorageSync("name", {})
    };
    if (huangcun[index]){//读取缓存判断是否已经点赞，改变本地收藏状态数据
    this.setData({
      // showandhide:huangcun[index]
      showandhide:true
      });
    };

    const Backgroundmusic = wx.getBackgroundAudioManager();
    Backgroundmusic.onPlay(() =>{//设置本地播放状态为true
      this.setData({
        musics: true,
      });
      appdatas.data.ismusic = true;
      appdatas.data.pegeIndex = index;
    }); 
    if (appdatas.data.ismusic && appdatas.data.pegeIndex===index){
      this.setData({
        musics: true,
      });
    };

    Backgroundmusic.onPause(() => {//设置本地播放状态为false
      this.setData({
        musics: false,
      });
      appdatas.data.ismusic = false;
    })
  },
  shoucan(){   //点击收藏按键事件
    let s = !this.data.showandhide;//切换收藏状态
    this.setData({
      showandhide:s
    });
    let title = this.data.showandhide?"收藏成功":"取消收藏";
    wx.showToast({//提示事件
      title,
      icon:"success"
      
    });
    let { index } = this.data;
    wx.getStorage({//获取缓存数据从而更新缓存数据
      key: 'name',
      success:(datas) => {
        
        let obj = datas.data;
        obj[index] = this.data.showandhide;
        wx.setStorage({//更新缓存数据
          key: "name",
          data: obj,
          success: () => {

          }
        })
      },
    })
    
  },
 
  handlemusic(){//点击切换播放状态
    let musicpduan = !this.data.musics;
    this.setData({
      musics: musicpduan
    })
    let { dataUrl, title } = this.data.dataobj.music;
      const Backgroundmusic = wx.getBackgroundAudioManager();
      
    if (!musicpduan){
      // Backgroundmusic.play();
      // console.log("aaa")
      Backgroundmusic.pause();
    }
    else{
      Backgroundmusic.src = dataUrl;
      Backgroundmusic.title = title;
    }
  },
  fenxian(){//点击分享
    wx.showActionSheet({
      itemList:[
        "分享到朋友圈","分享到qq空间","分享到微博"
      ]
    })
  }
})