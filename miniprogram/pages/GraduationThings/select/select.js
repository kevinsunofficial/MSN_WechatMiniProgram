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
     windowWidth: 0, //屏幕宽度
     windowHeight: 0, //屏幕高度
     iconWidth: 0, //单个图标大小
     scrollTop: 0,
     autoScroll: null, //ID of the autoScroll timer
     autoScrollOn: false,
     lastScroll: 0,
     icons: [{img:'/images/100Things/001.png',selected:false},
     {img:'/images/100Things/002.png',selected:false},
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
          iconWidth: res.windowWidth * 0.25, //分享图片box宽度
        })
      }
    })
    console.log(that.data.windowHeight,that.data.windowWidth)

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
      for(var i=0; i<that.data.icons.length; i++){
        this.animate('#the'+i, [{
          transform: 'translateY(0px)',
          offset: 0,
        }, {
          // transform: 'translateY(-' + Math.random()*1500 +'px)',
          offset: 1,
        }], 2000, {
          scrollSource: '#scroller',
          timeRange: 2000,
          startScrollOffset: 0,
          endScrollOffset: 3200,
        }) 
      }
    }).exec()

    that.startAutoScroll()
  },

  startAutoScroll: function(){
    var that = this
    if(!this.data.autoScrollOn){
      console.log("starting")
      that.data.autoScroll = setInterval(function() {
        if(/(^-?[0,2]$)/.test(that.data.lastScroll))
          that.setData({        
            autoScrollOn:true,
            scrollTop: that.data.scrollTop + 2,
          })
        else{
          setTimeout(()=>{
            that.setData({
              lastScroll: 0
            })
          },100)
        }
      }, 40)
    }
  },

  onScrollStart: function(event){
    // console.log("clearing" + this.data.autoScroll)
    clearInterval(this.data.autoScroll)
    this.setData({
      autoScrollOn: false
    })
  },
  onScrollEnd: function(event){
    // var that = this
    // var pos = 0;
    // wx.createSelectorQuery().select("#scroller").fields({
    //   scrollOffset: true, 
    // },(res)=> {
    //   pos = res['scrollTop']
    // }).exec(()=> {
    //   this.setData({
    //     scrollTop: pos,
    //   })
        this.startAutoScroll()
    // });
    // this.setData({
    //   scrollEnd: true
    // })
  },
  onScroll:function(e){
    if(!/(^-?[0,2]$)/.test(e.detail.deltaY))
      this.setData({
        scrollTop: e.detail.scrollTop,
        lastScroll: e.detail.deltaY
      })
    // if (!this.data.autoScrollOn) {
    //   setTimeout(()=>{
    //     console.log("setting")
    //     this.setData({lastScroll: 2})
    //   },1000)
    // } 
  },

  debug: function(event){
    console.log(event)
  },
  //onTouch记录用户选了啥
  onTouch: function(event){
    var that = this
    var id = event.currentTarget.id
    that.setData({
      ['icons[' + id.substring(3) + '].selected']: 1^that.data.icons[id.substring(3)].selected
    })
  },

  toResult: function(){
    wx.navigateTo({
      url: '/pages/GraduationThings/showResult/showResult'
    })
  }
})