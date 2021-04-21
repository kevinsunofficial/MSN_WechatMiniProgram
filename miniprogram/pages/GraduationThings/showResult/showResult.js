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
     windowWidth: 0, //屏幕宽度
     windowHeight: 0, //屏幕高度
     canvasUrl: '', //canvas
     qrCode:
       '/images/msnQRcode.jpg', //小程序码https图片路径
     canvasTempFile: '', //canvas临时图片
     show: [],
     userName: '',
 },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      insideWidth: '100%'
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length-2];
    var tmp = [];
    for(var i = 0; i < prevPage.data.icons.length; i++){
      if (prevPage.data.icons[i].selected)
        tmp.push(prevPage.data.icons[i].img)
    }
    this.setData({
      show: tmp,
      userName: prevPage.data.userName,
    }, ()=>{  
      this.generate()
    })
    //获取设备信息高度。计算出其他的高度等
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          iconSide: res.windowWidth*.3,
          qrSide: res.windowWidth*.4,
          halfScreen: res.windowWidth*.5
        })
      }
    })
    // this.getData()
  },

  generate: function(){        
    var that=this
    let ctx = wx.createCanvasContext('myCanvas') 

    ctx.setFillStyle('#3F4FEE')//文字颜色：默认黑色
    ctx.setFontSize(20)//设置字体大小，默认10
    ctx.fillText(that.data.userName+"大学都干过啥事", 20, 30)//绘制文本
    console.log(that.data.show)
    //画图片
    for(var i=0;i<that.data.show.length;i++){
      var x_offset = (that.data.iconSide*1.1)*(i%3)+that.data.iconSide*.05,
        y_offset = that.data.iconSide*1.1*Math.floor(i/3)+70;
      ctx.save();
      ctx.beginPath()
      ctx.drawImage(that.data.show[i], x_offset, y_offset, 
        that.data.iconSide, that.data.iconSide);
      ctx.closePath();
      ctx.restore();
    }
    that.drawText(ctx,"再打个广告啥的关注微信号/小程序",
    that.data.halfScreen, that.data.windowHeight*.65,20,that.data.halfScreen-20)
    //画二维码
    ctx.save();
    ctx.beginPath()/
    ctx.drawImage(that.data.qrCode, that.data.halfScreen, that.data.windowHeight*.7, 
      that.data.qrSide, that.data.qrSide);
    ctx.closePath();
    ctx.restore();

    ctx.draw() //绘制到canvas
    that.generateCanvasImg()
  },

  getData() {
    let that = this
    wx.getImageInfo({
      src: that.data.goodsInfoImg,
      success(res) {
        var imgsize = that.getimageSize(
          { width: res.width, height: res.height },
          that.data.shadowWidth,
          95
        )
        that.setData({
          imgWidth: imgsize.width,
          imgHeight: imgsize.height
        })
        that.createNewImg()
      }
    })
  },

  // 图片适配（aspectFill）
  getimageSize: function(imageSize, w, h) {
    if (imageSize.width < w) {
      if (imageSize.height < h) {
        var scale1 = imageSize.height / imageSize.width
        var scale2 = h / imageSize.height
        if (scale1 > scale2) {
          imageSize.height = (imageSize.height / imageSize.width) * w
          imageSize.width = w
        } else {
          imageSize.width = (imageSize.width / imageSize.height) * h
          imageSize.height = h
        }
      } else {
        imageSize.height = (imageSize.height / imageSize.width) * w
        imageSize.width = w
      }
    } else if (imageSize.height < h) {
      if (imageSize.width < w) {
        var scale1 = imageSize.height / imageSize.width
        var scale2 = h / imageSize.height
        if (scale1 > scale2) {
          imageSize.height = (imageSize.height / imageSize.width) * w
          imageSize.width = w
        } else {
          imageSize.width = (imageSize.width / imageSize.height) * h
          imageSize.height = h
        }
      } else {
        imageSize.width = (imageSize.width / imageSize.height) * h
        imageSize.height = h
      }
    } else {
      var scale1 = imageSize.height / imageSize.width
      var scale2 = h / imageSize.height
      if (scale1 > scale2) {
        imageSize.height = (imageSize.height / imageSize.width) * w
        imageSize.width = w
      } else {
        imageSize.width = (imageSize.width / imageSize.height) * h
        imageSize.height = h
      }
    }
    return imageSize
  },

  //画矩形，也是整块画布的大小，宽度是屏幕宽度，高度根据内容多少来动态设置。
  drawSquare: function(ctx, height, color) {
    let that = this
    // 绘制大长方矩形
    ctx.setFillStyle(color)
    ctx.fillRect(
      (that.data.windowWidth - that.data.boxWidth) / 2,
      that.data.boxPageY,
      that.data.boxWidth,
      height
    )
  },

  // ctx:canvas中的createCanvasContext,
  // x:矩形左上角的x坐标
  // y:矩形左上角的y坐标
  // w:矩形宽度
  // h:矩形高度
  // r:圆弧半径
  roundRect: function(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.setFillStyle('transparent')
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
    ctx.restore()
  },

  // 根据文字多少动态计算高度，然后依次画出矩形，文字，横线和小程序码。
  createNewImg: function() {
    let that = this
    let ctx = wx.createCanvasContext('myCanvas')
    // let contentHeight = that.data.boxheight  //修改图片高度
    let contentHeight = that.data.shadowWidth + that.data.imgPageY + 100
    // 绘制圆角矩形
    that.roundRect(
      ctx,
      (that.data.windowWidth - that.data.boxWidth) / 2,
      that.data.boxPageY,
      that.data.boxWidth,
      contentHeight - 32,
      14
    )
    that.drawSquare(ctx, contentHeight, '#333')
    that.setData({
      contentHeight: contentHeight
    })
    //商品图片
    // 绘制图片圆角
    let bg_r = 14
    ctx.save()
    ctx.beginPath()
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 + bg_r,
      that.data.imgPageY + bg_r,
      bg_r,
      Math.PI,
      Math.PI * 1.5
    )
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 +
        that.data.imgWidth -
        bg_r,
      that.data.imgPageY + bg_r,
      bg_r,
      Math.PI * 1.5,
      Math.PI * 2
    )
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 +
        that.data.imgWidth -
        bg_r,
      that.data.imgPageY + that.data.imgHeight - bg_r,
      bg_r,
      0,
      Math.PI * 0.5
    )
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 + bg_r,
      that.data.imgPageY + that.data.imgHeight - bg_r,
      bg_r,
      Math.PI * 0.5,
      Math.PI
    )
    ctx.clip()
    ctx.drawImage(
      that.data.goodsInfoImg,
      (that.data.windowWidth - that.data.imgWidth) / 2,
      that.data.imgPageY,
      that.data.imgWidth,
      that.data.imgHeight
    )
    ctx.restore()
    // 绘制商品蒙层矩形
    ctx.save()
    ctx.beginPath()
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 + bg_r,
      that.data.imgPageY + that.data.imgHeight - 60 + bg_r,
      30,
      Math.PI,
      Math.PI * 1.5
    )
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 +
        that.data.imgWidth -
        bg_r,
      that.data.imgPageY + that.data.imgHeight - 60 + bg_r,
      30,
      Math.PI * 1.5,
      Math.PI * 2
    )
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 +
        that.data.imgWidth -
        bg_r,
      that.data.imgPageY + that.data.imgHeight - 60 + 60 - bg_r,
      bg_r,
      0,
      Math.PI * 0.5
    )
    ctx.arc(
      (that.data.windowWidth - that.data.imgWidth) / 2 + bg_r,
      that.data.imgPageY + that.data.imgHeight - 60 + 60 - bg_r,
      bg_r,
      Math.PI * 0.5,
      Math.PI
    )
    ctx.clip()
    ctx.setFillStyle('rgba(0,0,0,0.5)')
    ctx.fillRect(
      (that.data.windowWidth - that.data.imgWidth) / 2,
      that.data.imgPageY + that.data.imgHeight - 60,
      that.data.imgWidth,
      60
    )
    ctx.restore()
    ctx.setFillStyle('#fff')
    ctx.font = 'normal 13px Microsoft YaHei'
    ctx.fillText(
      '标题logo',
      (that.data.windowWidth - that.data.shadowWidth) / 2,
      that.data.imgPageY - 10
    )
    ctx.setFillStyle('#fff')
    // ctx.setTextAlign="center"
    ctx.fillText(
      '填商品名字',
      (that.data.windowWidth - ctx.measureText('填商品名字').width) * 0.5,
      that.data.imgPageY + that.data.imgHeight - 40
    )
    ctx.font = 'normal 22px Microsoft YaHei'
    ctx.setFillStyle('#ECC781')
    ctx.fillText(
      '填价格',
      (that.data.windowWidth - ctx.measureText('填价格').width) * 0.5,
      that.data.imgPageY + that.data.imgHeight - 10
    )
    // 绘制您的好友
    ctx.font = 'normal 16px Microsoft YaHei'
    ctx.setFillStyle('#fff')
    ctx.fillText(
      '您的好友已为您',
      (that.data.windowWidth - that.data.shadowWidth) / 2,
      that.data.shadowWidth + that.data.imgPageY + 30
    )
    ctx.font = 'normal 16px Microsoft YaHei'
    ctx.setFillStyle('#fff')
    ctx.fillText(
      '这里填所需文字',
      (that.data.windowWidth - that.data.shadowWidth) / 2,
      that.data.shadowWidth + that.data.imgPageY + 52
    )
    // 绘制长按识别小程序
    ctx.font = 'normal 12px Microsoft YaHei'
    ctx.setFillStyle('#AAAAAA')
    ctx.fillText(
      '长按识别小程序即可参与',
      (that.data.windowWidth - that.data.shadowWidth) / 2,
      that.data.shadowWidth + that.data.imgPageY + 80
    )
    // 填充小程序码
    ctx.drawImage(
      that.data.qrCode,
      (that.data.windowWidth - that.data.shadowWidth) / 2 +
        that.data.shadowWidth -
        that.data.codeWidth,
      that.data.shadowWidth + that.data.imgPageY + 80 - that.data.codeHeight,
      that.data.codeWidth,
      that.data.codeHeight
    )
    ctx.draw() //绘制到canvas
    that.generateCanvasImg()
  },

  /**
   * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
   */
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 20; 
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
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
          wx.hideLoading()
          that.setData({
            canvasTempFile: res.tempFilePath
          })
          console.log(that.data.canvasTempFile)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  },

//后面这俩废弃了 直接用show-menu-by-longpress就行
//点击保存到相册前验证是否授权  最这两个方法就是保存相册了  把它放置到按钮的点击事件即可
  saveShareImg: function() {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          //未授权的话发起授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              //用户允许授权，保存到相册
              this.saveImg()
            },
            fail: () => {
              //用户拒绝授权，然后就引导授权（这里的话如果用户拒绝，不会立马弹出引导授权界面，坑就是上边所说的官网原因）
              wx.showModal({
                content: '保存到相册需要获得你的授权',
                showCancel: false,
                confirmText: '确认',
                success: function(res) {
                  wx.openSetting({
                    success: () => {
                      wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        succes: () => {
                          //授权成功，保存图片
                          this.saveImg()
                        }
                      })
                    }
                  })
                },
                fail: function(res) {}
              })
            }
          })
        } else {
          //已经授权
          this.saveImg()
        }
      }
    })
  },

  saveImg() {
    var that = this
    wx.showLoading({
      title: '正在保存',
      mask: true
    })
    wx.saveImageToPhotosAlbum({
      filePath: that.data.canvasTempFile,
      success(res) {
        wx.hideLoading()
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          success: function(res) {
            if (res.confirm) {
            }
          },
          fail: function(res) {}
        })
        that.setData({
          sharePopup: false
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})