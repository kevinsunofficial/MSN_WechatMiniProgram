//import { $init, $digest } from '../../utils/common.util'
var util = require('../../../utils/common.util.js')

const db = wx.cloud.database();
const items = db.collection('items');
const ids = db.collection('idMatch');
const maximg = 3;

var app = getApp();

Page({

  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    price: 0,
    wxid: '',
    images: [],
    userRegularData: {},
    // showPreview: false,
    // current: 0,
  },

  onLoad(options) {
    var that = this;

    ids.where({
      _openid: app.globalData.userSensitiveData.openid
    }).get({
      success: function(res) {
        console.log(res)
        if(res.data.length != 0){
          that.setData({
            wxid: res.data[0].wxid,
          })
        }
      },
      fail: function(res){
        console.log("failed", res)
      }
    });
    util.$init(this);
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    util.$digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    util.$digest(this)
  },  
  
  handlePriceInput(e) {
    const value = e.detail.value
    this.data.price = value
  },  
  handleIdInput(e) {
    const value = e.detail.value
    this.data.wxid = value
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: maximg,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = that.data.images.concat(res.tempFilePaths)
        that.data.images = images.length <= maximg ? images : images.slice(0, maximg)
        util.$digest(this)
      }
    })
  },
  previewImage: function(e){
    // this.setData({
    //   showPreview: true,
    //   current: Math.floor(e.currentTarget.offsetLeft/100)
    // })
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.images // 需要预览的图片http链接列表
    })
  },
//   change(e) {
//     console.log('current index has changed', e.detail)
// },

  removeImage(e) {
    const idx = e.currentTarget.dataset.index
    var list = this.data.images
    list.splice(idx, 1)
      this.setData({
        images: list
      })
    util.$digest(this)
    console.log(this.data.images)
  },

  // handleImagePreview(e) {
  //   const idx = e.target.dataset.idx
  //   const images = this.data.images

  //   wx.previewImage({
  //     current: images[idx],
  //     urls: images,
  //   })
  // },

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content
    const img = this.data.images
    const price = this.data.price
    const wxid = this.data.wxid
 
    if (title && img.length && price && wxid && img.length < 4) {
      wx.showLoading({
        title: '正在上传...',
        mask: true
      })
      
      const arr = img.map(path => {
        return wx.cloud.uploadFile({
            cloudPath: `marketItems/${Math.floor(Math.random()*10000000)}.png`,
            filePath: path,
          }).then(res => {
            for (let i = 0; i < img.length; i++) {
              if (img[i] == path)
                img[i] = res.fileID;
            }
            console.log(path);
          })
      })
      var sellerNickname = '';
      wx.getUserInfo({
        success: res => {
          sellerNickname = res.userInfo.nickName
      }})        
      Promise.all(arr).then(res => {
        //update wxid
        ids.where({
          _openid: app.globalData.userSensitiveData.openid
        }).get({
          success: function(ress) {
            if(ress.data.length == 0){
              ids.add({
                data:{
                  wxid: wxid,
                }
              })
            }
            else{
              ids.doc(ress.data[0]._id).update({
                data:{
                  wxid: wxid,
                }
              })
            }
          },   
        })
        var time = util.formatTime(new Date());
        items.add({
          data:{
            name: title,
            image: img,
            content: content,
            price: parseFloat(price),
            seller: sellerNickname,
            time: time,
            views: 0,
          }
        }).then(res => {
          console.log(res._id)
          wx.showToast({
            title: '上传成功',
            icon:'success',
            success: res2 => {
              console.log('redirecting');
              wx.navigateBack({
                delta: 1
              })
            }
          })
        })
      })
    
      /*new Promise((resolve, reject) => {
        for (let i = 0; i < img.length; i++) {
          wx.cloud.uploadFile({
            cloudPath: `marketItems/${Math.floor(Date.now/1000)}.png`,
            filePath: img[i],
          }).then(res => {
            img[i] = res.fileID;
            console.log(img[i])
          });
        }resolve();
      }).then(() => {
        items.add({
        data:{
          name: title,
          image: img,
        }
      }).then(res => {
        console.log(res._id)
        wx.showToast({
          title: '上传成功',
          icon:'success',
          success: res2 => {
            wx.redirectTo({
              url: `../frontPage/frontPage`,
            })
          }
        })
      })      
    })*/
    }
    else{
      if(!title)
      wx.showToast({
        title: '请输入物品名称',
        icon: 'none',
        duration: 1500
      }) 
      else if(!price)
      wx.showToast({
        title: '请输入价格',
        icon: 'none',
        duration: 1500
      })
      else if(!wxid)
      wx.showToast({
        title: '请输入微信号',
        icon: 'none',
        duration: 1500
      })
      else if(!img.length)
      wx.showToast({
        title: '请添加至少一张图片',
        icon: 'none',
        duration: 1500
      })
      else
      wx.showToast({
        title: '请保证最多只有三张图片',
        icon: 'none',
        duration: 1500
      })
    }
  },

})