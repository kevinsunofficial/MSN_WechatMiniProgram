/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * Trial page
 */
var app = getApp();

Page({

  data: {
    // canvas
     vw: 0, //屏幕宽度
     vh: 0, //屏幕高度
     canvasUrl: '', //canvas
     qrCode:'/images/msnQRcode.jpg', //小程序码https图片路径
     canvasTempFile: '', //canvas临时图片
     show: [],
     userName: '',
 },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length-2];
    var tmp = [];
    const dpr = wx.getSystemInfoSync().pixelRatio
    console.log(dpr)
    for(var i = 0; i < prevPage.data.icons.length; i++){
      if (prevPage.data.icons[i].selected)
        tmp.push(prevPage.data.icons[i])
    }
    this.setData({
      show: tmp,
      userName: prevPage.data.userName,
      mainLogo: prevPage.data.mainLogo,
      avatar: prevPage.data.avatar,
      resultTop: prevPage.data.resultTop,
      resultBot: prevPage.data.resultBot,
      qrcode: prevPage.data.qrcode,
      textColor: prevPage.data.textColor,
      count: tmp.length,
    })
    //获取设备信息高度。计算出其他的高度等
    wx.getSystemInfo({
      success: function(res) {
        let cal_height = Math.max(res.windowHeight, res.windowWidth*(1.27 + Math.floor((that.data.count-1)/4)*0.33) || 0)*dpr
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          vw: res.windowWidth*dpr,
          vh: res.windowHeight*dpr,
          iconSide: res.windowWidth*.21*dpr,
          leftMargin: res.windowWidth*.045*dpr,
          imgHeight: cal_height,
          dpr: dpr,
        })
        console.log("vh: " + res.windowHeight*dpr, "imgHeight: " + cal_height)
      }
    })
    
    // that.loadFont().then(()=>{
      that.generate(dpr)
    // })
  },

  loadFont(){
    return new Promise((resolve,reject)=>{
      wx.loadFontFace({
        family: 'FZ',
        scopes: ['native','webview'],
        global: true,
        source: 'url("https://6d73-msnprototype-2pun5-1300672980.tcb.qcloud.la/GraduationThings/FZDaBiaoSong-B06S.ttf?sign=d5bdff9d77ebc103cd43b30da561f2da&t=1619001145")',
        complete: function(res) {
          console.log(res)
          resolve(res)
        }
      })
    })
  },

  loadAndDrawImg(canvas, ctx, image, a,b,c,d){
    const tmp = canvas.createImage()
    tmp.src = image
    tmp.onload = function (res) {
      ctx.drawImage(tmp,a,b,c,d)
    }
  },

  loadImg(canvas, image){
    return new Promise((resolve,reject)=>{
      let tmp = canvas.createImage()
      tmp.src = image
      tmp.onload = function (res) {
        resolve(tmp)
      }
    })
  },

  async generate(dpr){        
    var that=this
    let ctx = wx.createCanvasContext('myCanvas') 
    //background
    ctx.save();
    ctx.fillStyle = "#fffbf0";                                         // 设置画布背景色
    ctx.fillRect(0,0,that.data.vw,that.data.imgHeight); // 填充整个画布
    ctx.restore();
    ctx.save()
    ctx.beginPath()
    ctx.drawImage(that.data.resultTop,0,0,that.data.vw,that.data.vw/1079*715)
    let tmp_height = that.data.vw/1079*240
    ctx.drawImage(that.data.resultBot,0,that.data.imgHeight-tmp_height,that.data.vw,tmp_height)
        //name + avatar
        ctx.save()
        ctx.beginPath()
        ctx.arc(that.data.vw*0.16,that.data.vw*0.27,that.data.vw*0.11,0,2*Math.PI)
        ctx.clip()
        ctx.drawImage(that.data.avatar, that.data.vw*0.05, that.data.vw*0.16, 
          that.data.vw*0.22, that.data.vw*0.22)
        ctx.closePath(); 
        ctx.restore()
        ctx.setFillStyle(that.data.textColor)
        ctx.font = 'bold ' + Math.floor(that.data.vw/15) + 'px FZ'
        ctx.setTextAlign('center')
        ctx.fillText(that.data.count, 
          that.data.vw*0.806, that.data.vw/1079*655)
        ctx.font = '' + 20*dpr +'px FZ'
        ctx.setTextAlign('center')
        ctx.fillText(that.data.userName,that.data.vw*0.16, that.data.vw*0.45)


    //画logos
    ctx.setFillStyle('#222222')
    for(let i=0;i<that.data.show.length;i++){
      let x_offset = (that.data.iconSide*1.11)*(i%4) + that.data.leftMargin,
        y_offset = that.data.vw*0.33*Math.floor(i/4) + that.data.vw*0.72;
      ctx.save();
      ctx.beginPath();
      ctx.drawImage(that.data.show[i].img, x_offset, y_offset, 
        that.data.iconSide, that.data.iconSide);
      that.drawText(ctx,that.data.show[i].phrase,x_offset+that.data.iconSide/2,
        y_offset + that.data.vw*0.25, 0, that.data.iconSide-5, dpr);
      ctx.closePath();
      ctx.restore();
    }
    //小程序码
    ctx.save()
    ctx.beginPath()
    ctx.arc(that.data.vw*0.87,that.data.imgHeight-that.data.vw*0.13,that.data.vw*0.12,0,2*Math.PI)
    ctx.fillStyle = "#fffbf0";    
    ctx.fill()
    ctx.clip()

    ctx.drawImage(that.data.qrcode, that.data.vw*0.75, that.data.imgHeight-that.data.vw*0.25, 
      that.data.vw*0.24, that.data.vw*0.24)
    ctx.closePath(); 
    ctx.restore()

    ctx.draw() //绘制到canvas
    that.generateCanvasImg()
  },

  /**
   * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
   */
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth, dpr) {
    var that = this
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    let lastEnglish = 0;
    let font_size = Math.floor(that.data.vw/28)
    ctx.font = ''+font_size+'px FZ'
    ctx.textAlign = 'center'
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (i > 0 && /^[A-z]$/.test(str[i]) && !/^[A-z]$/.test(str[i-1]))
        lastEnglish = i;
      if (lineWidth > canvasWidth) {
        //如果break在单词中间，找到单词第一个词，break from there
        if(/^[A-z]$/.test(str[i]) && /^[A-z]$/.test(str[i-1])){  
          i = lastEnglish;
        }
        let tmp = str.substring(lastSubStrIndex, i)
        ctx.fillText(tmp, leftWidth, initHeight); //绘制截取部分
        initHeight += font_size; 
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += font_size;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 20;
    return titleHeight
  },

  

// 生成图片中,这个方法是生成临时图片代替canvas展示，因为小程序里面canvas的层级太高，会挡住弹窗的内容，所有需要把canvas放到视图之外，用img展示即可
  generateCanvasImg() {
    var that = this
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        fileType: 'jpg',
        success: function(res) {
          that.setData({
            canvasTempFile: res.tempFilePath
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  }, 
})