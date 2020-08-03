// pages/market/market.js

const db = wx.cloud.database();
const items = db.collection('items');
//.orderBy('price', 'desc')
//or asc
Page({

  /**
   * Page initial data
   */
  data: {
    items: [],
    results: [],
    inputShowed: false,  //初始文本框不显示内容
    currentKey: null,
    byPrice: 0, //0 不排序， 1 升序， 2 降序
    byDate: 0,
    term: '',
    order: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getData(res => {});
  },


  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.pageData.skip = 0;
    this.setData({
      items : []
    })
    this.getData(res=> {
      wx.stopPullDownRefresh();
    });
    if(this.data.inputShowed)
      this.search();
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.getData();
  },

  showInput: function () {
    this.setData({
      inputShowed: true,
    });
  },
  
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false,
      currentKey: "",
    });
  },

  wxSearchInput: function (e) {
    this.setData({
      currentKey: e.detail.value,
    })
    this.search();
  },

  sortByPrice: function(){
    var idx = (this.data.byPrice + 1) % 3 
    if(idx == 1){
      this.setData({
        term: 'price',
        order: 'asc',
        byPrice: idx,
        byDate: 0
      })
    }else if(idx == 2){
      this.setData({
        term: 'price',
        order: 'desc',
        byPrice: idx,
        byDate: 0
      })
    }else{      
      this.setData({
        term: '',
        order: '',
        byPrice: idx,
        byDate: 0
      })
    }
    this.onPullDownRefresh()
  },

  search: function () {
    var key = this.data.currentKey;
    console.log('搜索函数触发');
    if(key == ''){
      this.setData({
        results: this.data.items,
        inputShowed: false,
      });
    }
    else{
      var arr = []
      for (let i in this.data.items) {
        if (this.data.items[i].name.indexOf(key) >= 0) {//查找
          arr.push(this.data.items[i]);
        }else if(this.data.items[i].content && this.data.items[i].content.indexOf(key) >= 0){
          arr.push(this.data.items[i]);
        }
      }
      this.setData({
        results: arr,
        inputShowed: true,
      })
    }
      
    },

  toUpload: function() {
    wx.navigateTo({
      url: '/pages/upload/upload'
    })
  },
  getData:function(callback, term, order){
    if(!callback){
        callback = res=> {}
      }
    wx.showLoading({
      title: '数据加载中',
    })
    if(this.data.byPrice + this.data.byDate > 0)
      items.skip(this.pageData.skip)
      .orderBy(this.data.term, this.data.order)
      .get().then(res=> {
        let dt = this.data.items;
        this.setData({
          items: dt.concat(res.data),
        },res => {
          this.pageData.skip = this.pageData.skip + 20;
          wx.hideLoading();
          callback();
        })
      })
    else{
      items.skip(this.pageData.skip)
      .get().then(res=> {
        let dt = this.data.items;
        this.setData({
          items: dt.concat(res.data),
        },res => {
          this.pageData.skip = this.pageData.skip + 20;
          wx.hideLoading();
          callback();
        })
      })
    }
  },
  pageData:{
    skip:0,
  }

})