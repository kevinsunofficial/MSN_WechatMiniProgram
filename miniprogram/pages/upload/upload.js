import { $init, $digest } from '../../utils/common.util'

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
  },

  onLoad(options) {
    var that = this;
    console.log("in onload", app.globalData.userSensitiveData.openid)
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
    $init(this);
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },  
  
  handlePriceInput(e) {
    const value = e.detail.value
    this.data.price = value
  },  
  handleIdInput(e) {
    const value = e.detail.value
    this.data.wxid = value
  },

  chooseImage(e) {
    wx.chooseImage({
      count: maximg,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= maximg ? images : images.slice(0, maximg)
        $digest(this)
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content
    const img = this.data.images
    const price = this.data.price
    const wxid = this.data.wxid
 
    if (title && img.length && price && wxid) {
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
        ids.where({
          opid: app.globalData.userSensitiveData.openid
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
        items.add({
          data:{
            name: title,
            image: img,
            content: content,
            price: parseFloat(price),
            seller: sellerNickname,
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
      else
      wx.showToast({
        title: '请添加至少一张图片',
        icon: 'none',
        duration: 1500
      })
    }
  }

})