/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Haoxiang_z
 */


var app = getApp();
const bgm = wx.getBackgroundAudioManager()

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
     load: 0,    
     complete: 0,
     imgNum: 8,
     userName: 'zhx',
     mainPage: 'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/Mainpage.jpg',
     background: 'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/background.jpg',
     mainLogo:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/ThingsLogo.png',
     resultTop:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/ResultTop.png',
     resultBot:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/ResultBot.png',
     icons: [{img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐8-lime.png',selected:false,phrase:"骑过一次lime滑板车"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活1-二手交易.png',selected:false,phrase:"达成一次二手交易"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活10-道别.png',selected:false,phrase:"认真道别一次"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活11-桑拿.png',selected:false,phrase:"在AFC蒸一次桑拿"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活12-Kathy阿姨.png',selected:false,phrase:"在NC和Kathy阿姨拥抱"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活13-看病.png',selected:false,phrase:"在UVA Hospital看病"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活14-超市会员.png',selected:false,phrase:"办过UVA附近超市的会员卡"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活15-CHO.png',selected:false,phrase:"在CHO坐飞机"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活19-测covid.png',selected:false,phrase:"做过COVID Testing"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活2-看雪.png',selected:false,phrase:"亲眼见过夏村的一场雪"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活20-northground.png',selected:false,phrase:"光顾Northground"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活21-1515.png',selected:false,phrase:"在1515自习"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活22-过年.png',selected:false,phrase:"和朋友一起过年"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活23-bus.png',selected:false,phrase:"坐Bus去Barracks"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活24-火警.png',selected:false,phrase:"被火警轰出建筑"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活25-prime.png',selected:false,phrase:"办过Amazon Prime"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活3-东方店.png',selected:false,phrase:"在东方店买过两大箱的食物"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活4-过夜.png',selected:false,phrase:"在别人的宿舍/家里过夜"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活5-校园恋爱.png',selected:false,phrase:"谈过一场校园恋爱"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活6-不同国家的朋友.png',selected:false,phrase:"结实不同国籍的朋友"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活7-卫衣.png',selected:false,phrase:"穿UVA的卫衣出门"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活8-租房.png',selected:false,phrase:"和朋友一起租房"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活9-毕业照.png',selected:false,phrase:"在Rotunda拍毕业照"},
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活16-plus dollar.png',selected:false,phrase:"半学期花完Plus Dollars"},     
    //  {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活17-忘记ID.png',selected:false,phrase:"忘带ID把自己锁在宿舍外面"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活18-nickel.png',selected:false,phrase:"保留着开学典礼上发的Nickel"},
    ],
 },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //background music
    bgm.src = 'https://6d73-msnprototype-2pun5-1300672980.tcb.qcloud.la/GraduationThings/Supermarket%20Flowers%20%5BPiano%20Karaoke%20Instrumental%5D%20Ed%20Sheeran.mp3?sign=9ce69e52d10802aa5db65df856f00967&t=1619960980'
    bgm.title = 'Supermarket Flowers'
    bgm.onEnded(()=>{
      bgm.src = 'https://6d73-msnprototype-2pun5-1300672980.tcb.qcloud.la/GraduationThings/Supermarket%20Flowers%20%5BPiano%20Karaoke%20Instrumental%5D%20Ed%20Sheeran.mp3?sign=9ce69e52d10802aa5db65df856f00967&t=1619960980'
    })

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
    //preload images and font
        wx.loadFontFace({
          family: 'FZ',
          source: 'url("https://6d73-msnprototype-2pun5-1300672980.tcb.qcloud.la/GraduationThings/FZDaBiaoSong-B06S.ttf?sign=d5bdff9d77ebc103cd43b30da561f2da&t=1619001145")',
        })
    for(let i = 0; i < that.data.icons.length;i++){
      wx.cloud.downloadFile({
        fileID: that.data.icons[i].img,
        success: res =>{
          that.setData({
            ['icons[' + i + '].img']: res.tempFilePath,
          })
          that.imgLoad()
        }
      })
    }
    that.cacheImage(that.data.mainLogo,'mainLogo')
    that.cacheImage(that.data.background,'background')
    that.cacheImage(that.data.resultTop,'resultTop')
    that.cacheImage(that.data.resultBot,'resultBot')
  },

  cacheImage: function(id, name){
    var that = this
    wx.cloud.downloadFile({
      fileID: id,
      success: res =>{
        that.setData({
          [name]: res.tempFilePath,
        })
      },
    })
  },

  getInfo: function() {
    var that = this
    wx.getUserProfile({
      desc: '用于生成最终图片', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        that.setData({
          userName: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, 
          success(downloadRes) {
            if (downloadRes.statusCode === 200) {
              that.setData({
                avatar: downloadRes.tempFilePath
              })
            }
          }
        })
        //跳到下页
        that.setData({
          mainPageAnimation1: 'slideOutLeft',
        })
        setTimeout(()=>{
          that.setData({
            hidden1: true,
          })
        },600)
      }
    })
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/this.data.imgNum).toFixed(2)*100)
    })
    console.log("complete precent: ", this.data.complete)
  },

  handleNameInput: function(e){
    this.data.userName = e.detail.value
  },
  handleDoubleTap: function(e) {
    var that = this
    if(e.timeStamp - that.lastTap < 350){
      this.setData({
        mainPageAnimation1: 'slideOutLeft',
      })
      setTimeout(()=>{
        this.setData({
          hidden1: true,
        })
      },600)
    }
    that.lastTap = e.timeStamp
  },

  beginSelect: function() {
    if(this.data.userName){
      this.setData({
        mainPageAnimation2: 'slideOutLeft',
      })
      setTimeout(()=>{
        this.setData({
          hidden2: true,
        })
        this._animate()
      },600)
    }else{
      wx.showToast({
        title: '请输入姓名啦（生成图片用~）',
        icon: 'none',
        duration: 1500
      }) 
    }
  },

  _animate: function() {
    var that = this
    wx.createSelectorQuery().select('#scroller').fields({
      scrollOffset: true, 
      size: true,
    }, (res) => {
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
          if(that.data.scrollTop < that.data.maxScrollTop)
            that.setData({        
              autoScrollOn:true,
              scrollTop: that.data.scrollTop + 1.3,
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