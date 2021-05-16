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
      count: tmp.length,
    })
    //获取设备信息高度。计算出其他的高度等
    wx.getSystemInfo({
      success: function(res) {
        let cal_height = Math.max(res.windowHeight, res.windowWidth*(1.2 + Math.floor((that.data.count-1)/4)*0.33) || 0)*dpr
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          vw: res.windowWidth*dpr,
          vh: res.windowHeight*dpr,
          iconSide: res.windowWidth*.21*dpr,
          leftMargin: res.windowWidth*.03*dpr,
          imgHeight: cal_height,
          dpr: dpr,
        })
        console.log("vh: " + res.windowHeight*dpr, "imgHeight: " + cal_height)
      }
    })
    
    // that.loadFont().then(()=>{
      that.generate(dpr,100)
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
    //获取canvas
    const canvas = await new Promise((resolve,reject)=>{
      wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      }).exec(async(res)=>{
        resolve(res[0].node)
      })
    })
    canvas.width = that.data.vw;
    canvas.height = that.data.imgHeight;
    const ctx = canvas.getContext('2d') 
    //background
    ctx.save();
    ctx.fillStyle = "#fffbf0";                                         // 设置画布背景色
    ctx.fillRect(0,0,that.data.vw,that.data.imgHeight); // 填充整个画布
    ctx.restore();
    ctx.save()
    ctx.beginPath()
    that.loadImg(canvas,that.data.resultTop).then(res=>{
      ctx.drawImage(res,0,0,that.data.vw,that.data.vw/1079*715)
      //texts need to appear above
      ctx.fillStyle = '#222222'
      ctx.font = 'bold '+24*dpr+'px FZ'
      ctx.textAlign = 'left'
      ctx.fillText("你在UVA完成了"+that.data.count+"件事", 
        that.data.vw*0.35, that.data.vw*0.6)
      ctx.font = 20*dpr+'px FZ'
      ctx.textAlign ='center'
      ctx.fillText(that.data.userName,that.data.vw*0.16, that.data.vw*0.46)
      //avatar too
      that.loadImg(canvas,that.data.avatar).then(res=>{
        ctx.save()
        ctx.beginPath()
        ctx.arc(that.data.vw*0.16,that.data.vw*0.28,that.data.vw*0.11,0,2*Math.PI)
        ctx.clip()
        ctx.drawImage(res, that.data.vw*0.05, that.data.vw*0.17, 
          that.data.vw*0.22, that.data.vw*0.22)
        ctx.closePath() 
        ctx.restore()
      })
    })
    let tmp_height = that.data.vw/1080*242
    that.loadImg(canvas,that.data.resultBot).then(res=>{
      ctx.drawImage(res,0,that.data.imgHeight-tmp_height,that.data.vw,tmp_height)
    })
    ctx.closePath() 
    ctx.restore()

    //画logos
    for(let i=0;i<that.data.show.length;i++){
      let x_offset = (that.data.iconSide*1.15)*(i%4) + that.data.leftMargin,
        y_offset = that.data.vw*0.33*Math.floor(i/4) + that.data.vw*0.7 - offset;
      ctx.save();
      ctx.beginPath();
      that.loadImg(canvas,that.data.show[i].img).then(res=>{
        ctx.drawImage(res,x_offset, y_offset, that.data.iconSide, that.data.iconSide)
      })
      that.drawText(ctx,that.data.show[i].phrase,x_offset+that.data.iconSide/2,
        y_offset + that.data.vw*0.25, 0, that.data.iconSide,dpr);
      ctx.closePath();
      ctx.restore();
    }

    that.generateCanvasImg(canvas)
  },

  /**
   * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
   */
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth, dpr) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    let font_size = 13*dpr
    ctx.font = ''+font_size+'px FZ'
    ctx.textAlign = 'center'
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        let tmp = str.substring(lastSubStrIndex, i)
        if(/^[A-z]$/.test(str[i]) && /^[A-z]$/.test(str[i-1])){  //英文换行加 '-'
          tmp = tmp + '-'
        }
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
  generateCanvasImg(canvasObj) {
    var that = this
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvas: canvasObj,
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