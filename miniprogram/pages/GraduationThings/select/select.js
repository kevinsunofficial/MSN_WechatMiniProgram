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
     userName: 'zhx',
     mainPage: 'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/Mainpage.jpg',
     background: 'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/background.jpg',
     mainLogo:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/ThingsLogo.png',
     ghead:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/ghead.png',
     gfoot:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/gfoot.png',
     resSet: [
      {head:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/head1.png',foot:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/foot1.png',color:'#669262'},
      {head:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/head2.png',foot:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/foot2.png',color:'#303e89'},
      {head:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/head3.png',foot:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/foot3.png',color:'#8756c6'},
      {head:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/head4.png',foot:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/foot4.png',color:'#fdf3b8'}
     ],
     qrcode:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/qrCode.png',
     icons: [
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐6 - 在Beta Bridge上画画.png',selected:false,phrase:"在Beta Bridge上画画"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐5 - 在ohill看星星.png',selected:false,phrase:"在O'Hill看星星"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐4 - 在cartes农场摘桃子.png',selected:false,phrase:"在Cartes农场摘桃子"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐2 - 参加过mentor program.png',selected:false,phrase:"参加过mentor program"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐1 - Trick or Treat on the Lawn.png',selected:false,phrase:"在万圣节给孩子们发糖"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐15 - 去Monticello膜拜Jefferson校长.png',selected:false,phrase:"去过Monticello"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐14 - 撸过the Castle的小猫Bonny.png',selected:false,phrase:"撸过Castle的小猫Bonny"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐13 - 去clemons图书馆玩VR.png',selected:false,phrase:"去Clemons玩VR"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐12 - 和朋友一起出去旅游.png',selected:false,phrase:"和朋友一起出去旅游"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐11 - 去farmer‘s market 赶集.png',selected:false,phrase:"去Farmer's Market赶集"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐10 - 用粉笔宣传社团活动.png',selected:false,phrase:"用粉笔宣传社团活动"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐9 - 去过activity fair.png',selected:false,phrase:"去过Activity Fair"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐8-lime.png',selected:false,phrase:"骑过一次lime滑板车"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐7 - Lighting On the Lawn.png',selected:false,phrase:"看Rotunda亮灯"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/study abroad_画板 1.png',selected:false,phrase:"参与过UVA的交换项目"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/j-term_画板 1.png',selected:false,phrase:"上J-term或Summer session"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/clark睡觉_画板 1.png',selected:false,phrase:"在Clark负二层睡觉"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/break out room_画板 1.png',selected:false,phrase:"经历沉默的breakout room"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/argue 成绩_画板 1.png',selected:false,phrase:"和教授Argue Grade"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食堂学习_画板 1.png',selected:false,phrase:"在食堂自习"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/翘课_画板 1.png',selected:false,phrase:"翘过一节课"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/登不上sis_画板 1.png',selected:false,phrase:"选课前登不上SIS"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/早八_画板 1.png',selected:false,phrase:"上过早8"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/旁听_画板 1.png',selected:false,phrase:"蹭过一节课"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/忘带手机_画板 1_画板 1.png',selected:false,phrase:"没带手机Duo验证失败"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/忘带iclicker_画板 1.png',selected:false,phrase:"上课忘带iClicker"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/床上学习_画板 1.png',selected:false,phrase:"在床上上完一节网课"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/图书馆通宵_画板 1.png',selected:false,phrase:"在图书馆通宵"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/困在图书馆_画板 1.png',selected:false,phrase:"被大雨困在图书馆"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/哈利波特room_画板 1.png',selected:false,phrase:"在Harry Potter Room学习"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/借书_画板 1.png',selected:false,phrase:"从图书馆借一本书"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/选一节与专业无关的课.png',selected:false,phrase:"选一节与专业无关的课"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/看过一场足球赛.png',selected:false,phrase:"看过一场橄榄球赛"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/看过一场篮球赛.png',selected:false,phrase:"看过一场篮球赛"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/看过一场灵犀大戏.png',selected:false,phrase:"看过灵犀的年终大戏"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/申请过Overload.png',selected:false,phrase:"申请过Overload"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/申请过CPT.png',selected:false,phrase:"申请过CPT"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/拿过free tshirt.png',selected:false,phrase:"拿过free T-shirt"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/在图书馆小房间投屏.png',selected:false,phrase:"在图书馆小房间投屏"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/在UVA经历过一次Snow Day.png',selected:false,phrase:"在UVA经历过一次Snow Day"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/在UVA拿过一学期GPA4.0.png',selected:false,phrase:"在UVA拿过一学期GPA4.0"},     
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/在UVA周围跑过一次长跑.png',selected:false,phrase:"在UVA周围跑过长跑"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/在The Lawn上裸奔.png',selected:false,phrase:"在The Lawn上裸奔"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/在Ohill补办过ID.png',selected:false,phrase:"在Ohill补办过ID"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/喝过功夫茶.png',selected:false,phrase:"喝过功夫茶"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/和朋友一起去爬山.png',selected:false,phrase:"和朋友一起去爬山"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/参加过MSN的活动.png',selected:false,phrase:"参加过MSN的活动"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/参加线上社团活动.png',selected:false,phrase:"参加线上社团活动"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/去过5个图书馆.png',selected:false,phrase:"去过UVA5个不同图书馆"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/去downtown看电影.png',selected:false,phrase:"去downtown看电影"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/去Slaughter攀岩.png',selected:false,phrase:"去Slaughter攀岩"},   
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/去SPCA助养过动物.png',selected:false,phrase:"去SPCA领养过动物"},   
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/买过亚米网.png',selected:false,phrase:"在亚米网买零食"},   
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/Rush过兄弟姐妹会.png',selected:false,phrase:"Rush过兄弟姐妹会"},   
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/Collab在考试的时候卡住.png',selected:false,phrase:"Collab在考试的时候卡住"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物21-图书馆外卖.png',selected:false,phrase:"在图书馆点外卖"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物20-vending machine.png',selected:false,phrase:"在Vending Machine购物"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物19-牛排.png',selected:false,phrase:"在Runk吃过牛排"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物18-Ohill寿司.png',selected:false,phrase:"在O'Hill抢到过寿司"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物17-3家餐馆.png',selected:false,phrase:"吃过夏村3家以上中餐"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物16-炸鸡薯条.png',selected:false,phrase:"深夜去食堂拿炸鸡薯条"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物15-节日大餐.png',selected:false,phrase:"吃过食堂的节日大餐"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物14-omelette.png',selected:false,phrase:"吃过食堂的Omelette"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物13-freshman 15.png',selected:false,phrase:"经历freshman15"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物12-冰激凌.png',selected:false,phrase:"在食堂吃蛋筒冰淇淋"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物11-点错餐厅.png',selected:false,phrase:"APP点星巴克点错餐厅位置"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物10-教授吃饭.png',selected:false,phrase:"和教授一起吃饭"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物8-argo tea.png',selected:false,phrase:"喝过Argo Tea"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物7-宿舍做饭.png',selected:false,phrase:"在宿舍做过一次饭"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物6-fine arts.png',selected:false,phrase:"去Fine Arts Cafe"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物5-奇怪的名字.png',selected:false,phrase:"被星巴克店员写错名字"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物4-bodos.png',selected:false,phrase:"吃过Bodos Bagel"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物3-火锅.png',selected:false,phrase:"在朋友家吃火锅"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/食物2-关门.png',selected:false,phrase:"在食堂一直吃到关门"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活1-二手交易.png',selected:false,phrase:"达成一次二手交易"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活11-桑拿.png',selected:false,phrase:"在AFC蒸一次桑拿"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活12-Kathy阿姨.png',selected:false,phrase:"在NC和Kathy阿姨拥抱"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活13-看病.png',selected:false,phrase:"在UVA Hospital看病"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活14-超市会员.png',selected:false,phrase:"办过UVA附近超市的会员卡"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活15-CHO.png',selected:false,phrase:"在CHO坐飞机"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活19-测covid.png',selected:false,phrase:"做过COVID Testing"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活2-看雪.png',selected:false,phrase:"亲眼见过夏村的一场雪"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活20-northground.png',selected:false,phrase:"光顾Northground"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活21-1515.png',selected:false,phrase:"在1515自习"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活22-过年.png',selected:false,phrase:"和朋友一起过年"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活23-bus.png',selected:false,phrase:"坐Bus去Barracks"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活24-火警.png',selected:false,phrase:"被火警轰出建筑"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活25-prime.png',selected:false,phrase:"办过Amazon Prime"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活3-东方店.png',selected:false,phrase:"在东方店买过两大箱的食物"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活4-过夜.png',selected:false,phrase:"在别人的宿舍/家里过夜"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活5-校园恋爱.png',selected:false,phrase:"谈过一场校园恋爱"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活6-不同国家的朋友.png',selected:false,phrase:"结识不同国籍的朋友"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活7-卫衣.png',selected:false,phrase:"穿UVA的卫衣出门"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活8-租房.png',selected:false,phrase:"和朋友一起租房"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活9-毕业照.png',selected:false,phrase:"在Rotunda拍毕业照"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活16-plus dollar.png',selected:false,phrase:"半学期花完Plus Dollars"},     
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活17-忘记ID.png',selected:false,phrase:"忘带ID把自己锁在宿舍外面"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活18-nickel.png',selected:false,phrase:"保留开学典礼上的Nickel"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/娱乐 - 桌游.png',selected:false,phrase:"和朋友一起玩桌游"},
     {img:'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/GraduationThings/icons/生活10-道别.png',selected:false,phrase:"我毕业了。"},
    ],
 },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(that.data.icons.length)
    //把icons顺序打乱
    for (let i = 1; i < that.data.icons.length-1; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      that.setData({
        ["icons["+i+"].img"]: that.data.icons[random].img,
        ["icons["+i+"].phrase"]: that.data.icons[random].phrase,
        ["icons["+random+"].img"]: that.data.icons[i].img,
        ["icons["+random+"].phrase"]: that.data.icons[i].phrase,
      });
    }

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
          iconWidth: res.windowWidth * 0.3, //分享图片box宽度
        })
      }
    })
    console.log(that.data.windowHeight,that.data.windowWidth)
    //preload images and font
    wx.loadFontFace({
      family: 'FZ',       
      scopes: ['native','webview'],
      global: true,
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
        },
      })
    }
    var randID = Math.floor(Math.random()*4)
    that.data.textColor = that.data.resSet[randID].color
    that.cacheImage(that.data.mainLogo,'mainLogo')
    that.cacheImage(that.data.background,'background')
    that.cacheImage(that.data.ghead,'ghead')
    that.cacheImage(that.data.gfoot,'gfoot')
    that.cacheImage(that.data.resSet[randID].head,'resultTop')
    that.cacheImage(that.data.resSet[randID].foot,'resultBot')
    that.cacheImage(that.data.qrcode,'qrcode')
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
          nickName: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, 
          success(downloadRes) {
            if (downloadRes.statusCode === 200) {
              console.log("downloaded avatar")
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
  //called when finish loading picture to record progress
  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/(this.data.icons.length+1)).toFixed(2)*100)
    })
  },

  handleNameInput: function(e){
    this.data.userName = e.detail.value
  },

  beginSelect: function() {
      if(this.data.userName.length > 5){
        wx.showToast({
          title: '姓名请不要超过五个字（不好意思微信名较长的各位;）',
          icon: 'none',
          duration: 2000
        }) 
      }else{
        if(!this.data.userName)
          this.setData({
            userName: that.data.nickName,
          })
        this.setData({
          mainPageAnimation2: 'slideOutLeft',
        })
        setTimeout(()=>{
          this.setData({
            hidden2: true,
          })
          this._animate()
        },600)
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
              scrollTop: that.data.scrollTop + 1,
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
    if(this.data.icons[this.data.icons.length-1].selected){
      this.setData({
        resultTop: this.data.ghead,
        resultBot: this.data.gfoot,
        textColor: '#252e4d',
      })
    }
    wx.navigateTo({
      url: '/pages/GraduationThings/showResult/showResult'
    })
  }
})