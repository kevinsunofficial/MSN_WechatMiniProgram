// pages/market/market.js

const db = wx.cloud.database();
const items = db.collection('items');
const _ = db.command;
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
    byView: 0,
    term: '',
    order: '',
    imageurl1: '/images/neutral.png',
    imageurl2: '/images/neutral.png',
    imageurl3: '/images/neutral.png',
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
    // if(this.data.inputShowed)
    //   this.search();
    if(this.data.inputShowed){
      this.pageData.searchSkip = 0;
      this.setData({
        results : [],
      },() => {
          this.search(this.data.currentKey);
        }
      )
    }else{
      this.pageData.skip = 0;
      this.setData({
        items : []
      })
      this.getData(res=> {
        wx.stopPullDownRefresh();
      });
    }
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
    var key = e.detail.value
    this.pageData.searchSkip = 0;
    this.setData({
      results : [],
      currentKey: key,
    },() => {
        this.search(key);
      }
    )
  },

  sortByPrice: function(){
    var idx = (this.data.byPrice + 1) % 3 
    if(idx == 1){
      this.setData({
        term: 'price',
        order: 'asc',
        byPrice: idx,
        byDate: 0,
        byView: 0,
        imageurl1: '/images/up.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/neutral.png'
      })
    }else if(idx == 2){
      this.setData({
        term: 'price',
        order: 'desc',
        byPrice: idx,
        byDate: 0,
        byView: 0,
        imageurl1: '/images/down.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/neutral.png'
      })
    }else{      
      this.setData({
        term: '',
        order: '',
        byPrice: idx,
        byDate: 0,
        byView: 0,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/neutral.png'
      })
    }
    this.onPullDownRefresh()
  },

  sortByDate: function(){
    var idx = (this.data.byDate + 1) % 3 
    if(idx == 1){
      this.setData({
        term: 'time',
        order: 'desc',
        byPrice: 0,
        byDate: idx,
        byView: 0,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/down.png',
        imageurl3: '/images/neutral.png'
      })
    }else if(idx == 2){
      this.setData({
        term: 'time',
        order: 'asc',
        byPrice: 0,
        byDate: idx,
        byView: 0,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/up.png',
        imageurl3: '/images/neutral.png'
      })
    }else{      
      this.setData({
        term: '',
        order: '',
        byPrice: 0,
        byDate: idx,
        byView: 0,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/neutral.png'
      })
    }
    this.onPullDownRefresh()
  },
  
  sortByView: function(){
    var idx = (this.data.byView + 1) % 3 
    if(idx == 1){
      this.setData({
        term: 'views',
        order: 'desc',
        byPrice: 0,
        byDate: 0,
        byView: idx,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/down.png'
      })
    }else if(idx == 2){
      this.setData({
        term: 'views',
        order: 'asc',
        byPrice: 0,
        byDate: 0,
        byView: idx,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/up.png'
      })
    }else{      
      this.setData({
        term: '',
        order: '',
        byPrice: 0,
        byDate: 0,
        byView: idx,
        imageurl1: '/images/neutral.png',
        imageurl2: '/images/neutral.png',
        imageurl3: '/images/neutral.png'
      })
    }
    this.onPullDownRefresh()
  },

  search: function (key) {
    console.log('搜索函数触发');
    if(key == ''){
      this.setData({
        results: this.data.items,
        inputShowed: false,
      });
    }
    else{
      this.getSearchData(key);
      // for (let i in this.data.items) {
      //   if (this.data.items[i].name.indexOf(key) >= 0) {//查找
      //     arr.push(this.data.items[i]);
      //   }else if(this.data.items[i].content && this.data.items[i].content.indexOf(key) >= 0){
      //     arr.push(this.data.items[i]);
      //   }
      // }    this.pageData.skip = 0;
      this.setData({
        inputShowed: true,
      })
    }
      
    },

  toUpload: function() {
    wx.navigateTo({
      url: '/pages/MarketPlace/upload/upload'
    })
  },
  getData:function(callback){
    if(!callback){
        callback = res=> {}
      }
    wx.showLoading({
      title: '数据加载中',
    })
    //if need sorted
    if(this.data.byPrice + this.data.byDate + this.data.byView > 0)
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
          this.pageData.skip = this.data.items.length;
          wx.hideLoading();
          callback();
        })
      })
    }
  },  
  
  getSearchData:function(key){
    // wx.showLoading({
    //   title: '数据加载中',
    // })
    //if sorted
    if(this.data.byPrice + this.data.byDate > 0)
      items.where(_.or([{
        name : db.RegExp({
          regexp: '.*' + key,
          options: 'i'
        })
      },{
        content: db.RegExp({
          regexp: '.*' + key,
          options: 'i'
        })
      }
    ])).skip(this.pageData.searchSkip)
      .orderBy(this.data.term, this.data.order)
      .get().then(res=> {
        let dt = this.data.results;
        this.setData({
          results: dt.concat(res.data),
        },res => {
          this.pageData.searchSkip = this.pageData.searchSkip + 20;
          // wx.hideLoading();
        })
      })
    else{
      items.where(_.or([{
        name : db.RegExp({
          regexp: '.*' + key,
          options: 'i'
        })
      },{
        content: db.RegExp({
          regexp: '.*' + key,
          options: 'i'
        })
      }
    ])).skip(this.pageData.searchSkip)
      .get().then(res=> {
        let dt = this.data.results;
        this.setData({
          results: dt.concat(res.data),
        },res => {
          this.pageData.searchSkip = this.pageData.searchSkip + 20;
          // wx.hideLoading();
        })
      })
    }
  },
  pageData:{
    skip:0,
    searchSkip:0,
  }

})