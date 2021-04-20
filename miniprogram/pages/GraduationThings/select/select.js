/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Haoxiang_z
 */


var app = getApp();

Page({

  data: {
     statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
     windowWidth: 0, 
     windowHeight: 0, 
     iconWidth: 0, //单个图标大小
     scrollTop: 0,
     maxScrollTop: 0,
     autoScroll: null, //ID of the autoScroll timer
     autoScrollOn: false,
     scrollY: true,
     count: 0,
     background: 'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/background.jpg',
     icons: [{img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐8-lime.png',selected:false,phrase:"骑过一次lime滑板车"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活1-二手交易.png',selected:false,phrase:"达成一次二手交易"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活11-桑拿.png',selected:false,phrase:"在AFC蒸一次桑拿"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食堂自习_画板 1.png',selected:false},
     {img:'/images/100Things/005.png',selected:false},
     {img:'/images/100Things/006.png',selected:false},
     {img:'/images/100Things/007.png',selected:false},
     {img:'/images/100Things/008.png',selected:false},     
     {img:'/images/100Things/003.png',selected:false},
     {img:'/images/100Things/004.png',selected:false},
     {img:'/images/100Things/005.png',selected:false},
     {img:'/images/100Things/006.png',selected:false},
     {img:'/images/100Things/007.png',selected:false},
     {img:'/images/100Things/008.png',selected:false}],
 },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取设备信息高度。计算出其他的高度等
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          iconWidth: res.windowWidth * 0.27, //分享图片box宽度
        })
      }
    })
    console.log(that.data.windowHeight,that.data.windowWidth)
    wx.cloud.downloadFile({
      fileID: "cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/FZDaBiaoSong-B06S.ttf",
      success: res =>{
        wx.loadFontFace({
          family: 'FZ',
          source: 'url("' + res.tempFilePath + '")',
        })
      }
    })
    for(let i = 0; i < that.data.icons.length;i++){
      wx.cloud.downloadFile({
        fileID: that.data.icons[i].img,
        success: res =>{
          that.setData({
            ['icons[' + i + '].img']: res.tempFilePath,
          })
          console.log(that.data.icons)
        }
      })
    }
  },

  onReady() {
    var that = this
    that._animate()
  },

  _animate: function() {
    var that = this
    wx.createSelectorQuery().select('#scroller').fields({
      scrollOffset: true, 
      size: true,
    }, (res) => {
      console.log(res);
      this.setData({
        maxScrollTop: res.scrollHeight - res.height,
      })
      // for(var i=0; i<that.data.icons.length; i++){
      //   this.animate('#the'+i, [{
      //     transform: 'translateY(0px)',
      //     offset: 0,
      //   }, {
      //     transform: 'translateY(-' + Math.random()*100 +'px)',
      //     offset: 1,
      //   }], 2000, {
      //     scrollSource: '#scroller',
      //     timeRange: 2000,
      //     startScrollOffset: 0,
      //     endScrollOffset: 3200,
      //   }) 
      // }
    }).exec()

    that.startAutoScroll()
  },

  startAutoScroll: function(){
    var that = this
    if(!this.data.autoScrollOn){
      that.data.autoScroll = setInterval(function() {
          if(that.data.scrollTop < 3000)
            that.setData({        
              autoScrollOn:true,
              scrollTop: that.data.scrollTop + 0,
            })
      }, 10)
    }
  },

  onScrollStart: function(event){
    // console.log("clearing" + this.data.autoScroll)
    clearInterval(this.data.autoScroll)
    this.setData({
      autoScrollOn: false,
    })
  },
  onScrollEnd: function(event){
    var that = this
    var pos = 0;
    wx.createSelectorQuery().select("#scroller").fields({
      scrollOffset: true, 
    },(res)=> {
      pos = res['scrollTop']
    }).exec(()=> {
      this.setData({
        scrollTop: pos,
        scrollY: false
      })
      that.startAutoScroll()
      setTimeout(()=>{
        this.setData({
          scrollY: true
        })
      },40)
    })

  },

  debug: function(event){
    console.log(event)
  },
  
  onTouch: function(event){
    var that = this
    var id = event.currentTarget.id
    

    that.setData({
      ['icons[' + id.substring(3) + '].selected']: 1^that.data.icons[id.substring(3)].selected,
      ['icons[' + id.substring(3) + '].animation']: "bounceIn",
      count: that.data.count + 1 - that.data.icons[id.substring(3)].selected*2,
    })
    setTimeout(()=>{
      that.setData({
        ['icons[' + id.substring(3) + '].animation']: ""
      })
    }, 500)
    // wx.createSelectorQuery().select(".animated").boundingClientRect().exec((res)=> {
    //   console.log(res)
    // })
  },

  toResult: function(){
    wx.navigateTo({
      url: '/pages/GraduationThings/showResult/showResult'
    })
  }
})