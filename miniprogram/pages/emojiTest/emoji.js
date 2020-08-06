// miniprogram/pages/emojiTest/emoji.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emoji: "",
    tmp: "",
    show: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hide: true,
    userSensitiveData: {},
    userRegularData: {},
    userNickname: ""
  },

  // softbankHex: function(e) {
  //   if (e == "E150") {e = "\uD83D\uDE8F"} if (e == "E030") {e = "\uD83C\uDF38"} if (e == "E151") {e = "\uD83D\uDEBB"} if (e == "E152") {e = "\uD83D\uDC6E"} if (e == "E031") {e = "\uD83D\uDD31"} if (e == "E032") {e = "\uD83C\uDF39"} if (e == "E153") {e = "\uD83C\uDFE3"} if (e == "E033") {e = "\uD83C\uDF84"} if (e == "E154") {e = "\uD83C\uDFE7"} if (e == "E155") {e = "\uD83C\uDFE5"} if (e == "E034") {e = "\uD83D\uDC8D"} if (e == "E156") {e = "\uD83C\uDFEA"} if (e == "E035") {e = "\uD83D\uDC8E"} if (e == "E036") {e = "\uD83C\uDFE0"} if (e == "E157") {e = "\uD83C\uDFEB"} if (e == "E158") {e = "\uD83C\uDFE8"} if (e == "E037") {e = "\u26EA"} if (e == "E038") {e = "\uD83C\uDFE2"} if (e == "E159") {e = "\uD83D\uDE8C"} if (e == "E039") {e = "\uD83D\uDE89"} if (e == "E15A") {e = "\uD83D\uDE95"} if (e == "E03A") {e = "\u26FD"} if (e == "E03B") {e = "\uD83D\uDDFB"} if (e == "E03C") {e = "\uD83C\uDFA4"} if (e == "E03D") {e = "\uD83C\uDFA5"} if (e == "E03E") {e = "\uD83C\uDFB5"} if (e == "E03F") {e = "\uD83D\uDD11"} if (e == "E01F") {e = "\uD83D\uDE85"} if (e == "E140") {e = "\uD83D\uDEBD"} if (e == "E141") {e = "\uD83D\uDD0A"} if (e == "E020") {e = "\u2753"} if (e == "E142") {e = "\uD83D\uDCE2"} if (e == "E021") {e = "\u2757"} if (e == "E143") {e = "\uD83C\uDF8C"} if (e == "E022") {e = "\u2764\uFE0F"} if (e == "E023") {e = "\uD83D\uDC94"} if (e == "E144") {e = "\uD83D\uDD12"} if (e == "E145") {e = "\uD83D\uDD13"} if (e == "E024") {e = "\uD83D\uDD50"} if (e == "E146") {e = "\uD83C\uDF06"} if (e == "E025") {e = "\uD83D\uDD51"} if (e == "E147") {e = "\uD83C\uDF73"} if (e == "E026") {e = "\uD83D\uDD52"} if (e == "E148") {e = "\uD83D\uDCD6"} if (e == "E027") {e = "\uD83D\uDD53"} if (e == "E149") {e = "\uD83D\uDCB1"} if (e == "E028") {e = "\uD83D\uDD54"} if (e == "E029") {e = "\uD83D\uDD55"} if (e == "E14A") {e = "\uD83D\uDCB9"} if (e == "E14B") {e = "\uD83D\uDCE1"} if (e == "E02A") {e = "\uD83D\uDD56"} if (e == "E14C") {e = "\uD83D\uDCAA"} if (e == "E02B") {e = "\uD83D\uDD57"} if (e == "E14D") {e = "\uD83C\uDFE6"} if (e == "E02C") {e = "\uD83D\uDD58"} if (e == "E02D") {e = "\uD83D\uDD59"} if (e == "E14E") {e = "\uD83D\uDEA5"} if (e == "E14F") {e = "\uD83C\uDD7F\uFE0F"} if (e == "E02E") {e = "\uD83D\uDD5A"} if (e == "E02F") {e = "\uD83D\uDD5B"} if (e == "E050") {e = "\uD83D\uDC2F"} if (e == "E051") {e = "\uD83D\uDC3B"} if (e == "E052") {e = "\uD83D\uDC36"} if (e == "E053") {e = "\uD83D\uDC2D"} if (e == "E054") {e = "\uD83D\uDC33"} if (e == "E055") {e = "\uD83D\uDC27"} if (e == "E056") {e = "\uD83D\uDE0A"} if (e == "E057") {e = "\uD83D\uDE03"} if (e == "E058") {e = "\uD83D\uDE1E"} if (e == "E059") {e = "\uD83D\uDE20"} if (e == "E05A") {e = "\uD83D\uDCA9"} if (e == "E040") {e = "\uD83C\uDFB7"} if (e == "E041") {e = "\uD83C\uDFB8"} if (e == "E042") {e = "\uD83C\uDFBA"} if (e == "E043") {e = "\uD83C\uDF74"} if (e == "E044") {e = "\uD83C\uDF78"} if (e == "E045") {e = "\u2615"} if (e == "E046") {e = "\uD83C\uDF70"} if (e == "E047") {e = "\uD83C\uDF7A"} if (e == "E048") {e = "\u26C4"} if (e == "E049") {e = "\u2601\uFE0F"} if (e == "E04A") {e = "\u2600\uFE0F"} if (e == "E04B") {e = "\u2614"} if (e == "E04C") {e = "\uD83C\uDF19"} if (e == "E04D") {e = "\uD83C\uDF04"} if (e == "E04E") {e = "\uD83D\uDC7C"} if (e == "E04F") {e = "\uD83D\uDC31"} if (e == "E50B") {e = "\uD83C\uDDEF\uD83C\uDDF5"} if (e == "E50C") {e = "\uD83C\uDDFA\uD83C\uDDF8"} if (e == "E50D") {e = "\uD83C\uDDEB\uD83C\uDDF7"} if (e == "E50E") {e = "\uD83C\uDDE9\uD83C\uDDEA"} if (e == "E50F") {e = "\uD83C\uDDEE\uD83C\uDDF9"} if (e == "E510") {e = "\uD83C\uDDEC\uD83C\uDDE7"} if (e == "E511") {e = "\uD83C\uDDEA\uD83C\uDDF8"} if (e == "E512") {e = "\uD83C\uDDF7\uD83C\uDDFA"} if (e == "E513") {e = "\uD83C\uDDE8\uD83C\uDDF3"} if (e == "E514") {e = "\uD83C\uDDF0\uD83C\uDDF7"} if (e == "E515") {e = "\uD83D\uDC71"} if (e == "E516") {e = "\uD83D\uDC72"} if (e == "E517") {e = "\uD83D\uDC73"} if (e == "E518") {e = "\uD83D\uDC74"} if (e == "E519") {e = "\uD83D\uDC75"} if (e == "E501") {e = "\uD83C\uDFE9"} if (e == "E502") {e = "\uD83C\uDFA8"} if (e == "E503") {e = "\uD83C\uDFA9"} if (e == "E504") {e = "\uD83C\uDFEC"} if (e == "E505") {e = "\uD83C\uDFEF"} if (e == "E506") {e = "\uD83C\uDFF0"} if (e == "E507") {e = "\uD83C\uDFA6"} if (e == "E508") {e = "\uD83C\uDFED"} if (e == "E509") {e = "\uD83D\uDDFC"} if (e == "E52B") {e = "\uD83D\uDC2E"} if (e == "E40A") {e = "\uD83D\uDE0C"} if (e == "E52C") {e = "\uD83D\uDC30"} if (e == "E40B") {e = "\uD83D\uDE28"} if (e == "E52D") {e = "\uD83D\uDC0D"} if (e == "E40C") {e = "\uD83D\uDE37"} if (e == "E52E") {e = "\uD83D\uDC14"} if (e == "E40D") {e = "\uD83D\uDE33"} if (e == "E52F") {e = "\uD83D\uDC17"} if (e == "E40E") {e = "\uD83D\uDE12"} if (e == "E40F") {e = "\uD83D\uDE30"} if (e == "E530") {e = "\uD83D\uDC2B"} if (e == "E531") {e = "\uD83D\uDC38"} if (e == "E410") {e = "\uD83D\uDE32"} if (e == "E532") {e = "\uD83C\uDD70\uFE0F"} if (e == "E411") {e = "\uD83D\uDE2D"} if (e == "E533") {e = "\uD83C\uDD71\uFE0F"} if (e == "E412") {e = "\uD83D\uDE02"} if (e == "E534") {e = "\uD83C\uDD8E"} if (e == "E413") {e = "\uD83D\uDE22"} if (e == "E535") {e = "\uD83C\uDD7E\uFE0F"} if (e == "E414") {e = "\u263A\uFE0F"} if (e == "E536") {e = "\uD83D\uDC63"} if (e == "E415") {e = "\uD83D\uDE04"} if (e == "E416") {e = "\uD83D\uDE21"} if (e == "E537") {e = "\u2122\uFE0F"} if (e == "E417") {e = "\uD83D\uDE1A"} if (e == "E418") {e = "\uD83D\uDE18"} if (e == "E419") {e = "\uD83D\uDC40"} if (e == "E41A") {e = "\uD83D\uDC43"} if (e == "E51A") {e = "\uD83D\uDC76"} if (e == "E51B") {e = "\uD83D\uDC77"} if (e == "E51C") {e = "\uD83D\uDC78"} if (e == "E51D") {e = "\uD83D\uDDFD"} if (e == "E51E") {e = "\uD83D\uDC82"} if (e == "E51F") {e = "\uD83D\uDC83"} if (e == "E520") {e = "\uD83D\uDC2C"} if (e == "E521") {e = "\uD83D\uDC26"} if (e == "E522") {e = "\uD83D\uDC20"} if (e == "E401") {e = "\uD83D\uDE25"} if (e == "E523") {e = "\uD83D\uDC24"} if (e == "E402") {e = "\uD83D\uDE0F"} if (e == "E524") {e = "\uD83D\uDC39"} if (e == "E403") {e = "\uD83D\uDE14"} if (e == "E525") {e = "\uD83D\uDC1B"} if (e == "E404") {e = "\uD83D\uDE01"} if (e == "E526") {e = "\uD83D\uDC18"} if (e == "E405") {e = "\uD83D\uDE09"} if (e == "E527") {e = "\uD83D\uDC28"} if (e == "E406") {e = "\uD83D\uDE23"} if (e == "E528") {e = "\uD83D\uDC12"} if (e == "E407") {e = "\uD83D\uDE16"} if (e == "E529") {e = "\uD83D\uDC11"} if (e == "E408") {e = "\uD83D\uDE2A"} if (e == "E409") {e = "\uD83D\uDE1D"} if (e == "E52A") {e = "\uD83D\uDC3A"} if (e == "E30B") {e = "\uD83C\uDF76"} if (e == "E42C") {e = "\uD83C\uDFB1"} if (e == "E30C") {e = "\uD83C\uDF7B"} if (e == "E42D") {e = "\uD83C\uDFCA"} if (e == "E42E") {e = "\uD83D\uDE99"} if (e == "E30D") {e = "\u3297\uFE0F"} if (e == "E42F") {e = "\uD83D\uDE9A"} if (e == "E30E") {e = "\uD83D\uDEAC"} if (e == "E30F") {e = "\uD83D\uDC8A"} if (e == "E430") {e = "\uD83D\uDE92"} if (e == "E310") {e = "\uD83C\uDF88"} if (e == "E431") {e = "\uD83D\uDE91"} if (e == "E311") {e = "\uD83D\uDCA3"} if (e == "E432") {e = "\uD83D\uDE93"} if (e == "E312") {e = "\uD83C\uDF89"} if (e == "E433") {e = "\uD83C\uDFA2"} if (e == "E434") {e = "\uD83D\uDE87"} if (e == "E313") {e = "\u2702\uFE0F"} if (e == "E314") {e = "\uD83C\uDF80"} if (e == "E435") {e = "\uD83D\uDE84"} if (e == "E436") {e = "\uD83C\uDF8D"} if (e == "E315") {e = "\u3299\uFE0F"} if (e == "E437") {e = "\uD83D\uDC9D"} if (e == "E316") {e = "\uD83D\uDCBD"} if (e == "E438") {e = "\uD83C\uDF8E"} if (e == "E317") {e = "\uD83D\uDCE3"} if (e == "E439") {e = "\uD83C\uDF93"} if (e == "E318") {e = "\uD83D\uDC52"} if (e == "E319") {e = "\uD83D\uDC57"} if (e == "E43A") {e = "\uD83C\uDF92"} if (e == "E43B") {e = "\uD83C\uDF8F"} if (e == "E31A") {e = "\uD83D\uDC61"} if (e == "E43C") {e = "\uD83C\uDF02"} if (e == "E31B") {e = "\uD83D\uDC62"} if (e == "E41B") {e = "\uD83D\uDC42"} if (e == "E41C") {e = "\uD83D\uDC44"} if (e == "E41D") {e = "\uD83D\uDE4F"} if (e == "E41E") {e = "\uD83D\uDC4B"} if (e == "E41F") {e = "\uD83D\uDC4F"} if (e == "E420") {e = "\uD83D\uDC4C"} if (e == "E421") {e = "\uD83D\uDC4E"} if (e == "E422") {e = "\uD83D\uDC50"} if (e == "E301") {e = "\uD83D\uDCDD"} if (e == "E302") {e = "\uD83D\uDC54"} if (e == "E423") {e = "\uD83D\uDE45"} if (e == "E303") {e = "\uD83C\uDF3A"} if (e == "E424") {e = "\uD83D\uDE46"} if (e == "E304") {e = "\uD83C\uDF37"} if (e == "E425") {e = "\uD83D\uDC91"} if (e == "E305") {e = "\uD83C\uDF3B"} if (e == "E426") {e = "\uD83D\uDE47"} if (e == "E306") {e = "\uD83D\uDC90"} if (e == "E427") {e = "\uD83D\uDE4C"} if (e == "E307") {e = "\uD83C\uDF34"} if (e == "E428") {e = "\uD83D\uDC6B"} if (e == "E308") {e = "\uD83C\uDF35"} if (e == "E429") {e = "\uD83D\uDC6F"} if (e == "E309") {e = "\uD83D\uDEBE"} if (e == "E42A") {e = "\uD83C\uDFC0"} if (e == "E30A") {e = "\uD83C\uDFA7"} if (e == "E42B") {e = "\uD83C\uDFC8"} if (e == "E32D") {e = "\uD83D\uDC9C"} if (e == "E20C") {e = "\u2665\uFE0F"} if (e == "E20D") {e = "\u2666\uFE0F"} if (e == "E32E") {e = "\u2728"} if (e == "E20E") {e = "\u2660\uFE0F"} if (e == "E32F") {e = "\u2B50"} if (e == "E20F") {e = "\u2663\uFE0F"} if (e == "E330") {e = "\uD83D\uDCA8"} if (e == "E210") {e = "\u0023\uFE0F\u20E3"} if (e == "E331") {e = "\uD83D\uDCA6"} if (e == "E211") {e = "\u27BF"} if (e == "E332") {e = "\u2B55"} if (e == "E212") {e = "\uD83C\uDD95"} if (e == "E333") {e = "\u274C"} if (e == "E213") {e = "\uD83C\uDD99"} if (e == "E334") {e = "\uD83D\uDCA2"} if (e == "E214") {e = "\uD83C\uDD92"} if (e == "E335") {e = "\uD83C\uDF1F"} if (e == "E215") {e = "\uD83C\uDE36"} if (e == "E336") {e = "\u2754"} if (e == "E216") {e = "\uD83C\uDE1A"} if (e == "E337") {e = "\u2755"} if (e == "E217") {e = "\uD83C\uDE37\uFE0F"} if (e == "E338") {e = "\uD83C\uDF75"} if (e == "E218") {e = "\uD83C\uDE38"} if (e == "E339") {e = "\uD83C\uDF5E"} if (e == "E219") {e = "\uD83D\uDD34"} if (e == "E33A") {e = "\uD83C\uDF66"} if (e == "E33B") {e = "\uD83C\uDF5F"} if (e == "E21A") {e = "\uD83D\uDD32"} if (e == "E33C") {e = "\uD83C\uDF61"} if (e == "E21B") {e = "\uD83D\uDD33"} if (e == "E21C") {e = "\u0031\uFE0F\u20E3"} if (e == "E33D") {e = "\uD83C\uDF58"} if (e == "E31C") {e = "\uD83D\uDC84"} if (e == "E43D") {e = "\uD83D\uDC92"} if (e == "E43E") {e = "\uD83C\uDF0A"} if (e == "E31D") {e = "\uD83D\uDC85"} if (e == "E43F") {e = "\uD83C\uDF67"} if (e == "E31E") {e = "\uD83D\uDC86"} if (e == "E31F") {e = "\uD83D\uDC87"} if (e == "E440") {e = "\uD83C\uDF87"} if (e == "E441") {e = "\uD83D\uDC1A"} if (e == "E320") {e = "\uD83D\uDC88"} if (e == "E442") {e = "\uD83C\uDF90"} if (e == "E321") {e = "\uD83D\uDC58"} if (e == "E443") {e = "\uD83C\uDF00"} if (e == "E322") {e = "\uD83D\uDC59"} if (e == "E201") {e = "\uD83D\uDEB6"} if (e == "E444") {e = "\uD83C\uDF3E"} if (e == "E323") {e = "\uD83D\uDC5C"} if (e == "E202") {e = "\uD83D\uDEA2"} if (e == "E203") {e = "\uD83C\uDE01"} if (e == "E445") {e = "\uD83C\uDF83"} if (e == "E324") {e = "\uD83C\uDFAC"} if (e == "E446") {e = "\uD83C\uDF91"} if (e == "E204") {e = "\uD83D\uDC9F"} if (e == "E325") {e = "\uD83D\uDD14"} if (e == "E447") {e = "\uD83C\uDF43"} if (e == "E326") {e = "\uD83C\uDFB6"} if (e == "E205") {e = "\u2734\uFE0F"} if (e == "E448") {e = "\uD83C\uDF85"} if (e == "E327") {e = "\uD83D\uDC93"} if (e == "E206") {e = "\u2733\uFE0F"} if (e == "E449") {e = "\uD83C\uDF05"} if (e == "E328") {e = "\uD83D\uDC97"} if (e == "E207") {e = "\uD83D\uDD1E"} if (e == "E329") {e = "\uD83D\uDC98"} if (e == "E208") {e = "\uD83D\uDEAD"} if (e == "E209") {e = "\uD83D\uDD30"} if (e == "E44A") {e = "\uD83C\uDF07"} if (e == "E44B") {e = "\uD83C\uDF03"} if (e == "E32A") {e = "\uD83D\uDC99"} if (e == "E44C") {e = "\uD83C\uDF08"} if (e == "E32B") {e = "\uD83D\uDC9A"} if (e == "E20A") {e = "\u267F"} if (e == "E32C") {e = "\uD83D\uDC9B"} if (e == "E20B") {e = "\uD83D\uDCF6"} if (e == "E22E") {e = "\uD83D\uDC46"} if (e == "E10D") {e = "\uD83D\uDE80"} if (e == "E22F") {e = "\uD83D\uDC47"} if (e == "E10E") {e = "\uD83D\uDC51"} if (e == "E10F") {e = "\uD83D\uDCA1"} if (e == "E230") {e = "\uD83D\uDC48"} if (e == "E110") {e = "\uD83C\uDF40"} if (e == "E231") {e = "\uD83D\uDC49"} if (e == "E111") {e = "\uD83D\uDC8F"} if (e == "E232") {e = "\u2B06\uFE0F"} if (e == "E112") {e = "\uD83C\uDF81"} if (e == "E233") {e = "\u2B07\uFE0F"} if (e == "E113") {e = "\uD83D\uDD2B"} if (e == "E234") {e = "\u27A1\uFE0F"} if (e == "E114") {e = "\uD83D\uDD0D"} if (e == "E235") {e = "\u2B05\uFE0F"} if (e == "E115") {e = "\uD83C\uDFC3"} if (e == "E236") {e = "\u2197\uFE0F"} if (e == "E116") {e = "\uD83D\uDD28"} if (e == "E237") {e = "\u2196\uFE0F"} if (e == "E117") {e = "\uD83C\uDF86"} if (e == "E238") {e = "\u2198\uFE0F"} if (e == "E118") {e = "\uD83C\uDF41"} if (e == "E239") {e = "\u2199\uFE0F"} if (e == "E119") {e = "\uD83C\uDF42"} if (e == "E23A") {e = "\u25B6\uFE0F"} if (e == "E11A") {e = "\uD83D\uDC7F"} if (e == "E23B") {e = "\u25C0\uFE0F"} if (e == "E11B") {e = "\uD83D\uDC7B"} if (e == "E23C") {e = "\u23E9"} if (e == "E11C") {e = "\uD83D\uDC80"} if (e == "E23D") {e = "\u23EA"} if (e == "E11D") {e = "\uD83D\uDD25"} if (e == "E23E") {e = "\uD83D\uDD2F"} if (e == "E21D") {e = "\u0032\uFE0F\u20E3"} if (e == "E33E") {e = "\uD83C\uDF5A"} if (e == "E21E") {e = "\u0033\uFE0F\u20E3"} if (e == "E33F") {e = "\uD83C\uDF5D"} if (e == "E21F") {e = "\u0034\uFE0F\u20E3"} if (e == "E340") {e = "\uD83C\uDF5C"} if (e == "E220") {e = "\u0035\uFE0F\u20E3"} if (e == "E341") {e = "\uD83C\uDF5B"} if (e == "E221") {e = "\u0036\uFE0F\u20E3"} if (e == "E342") {e = "\uD83C\uDF59"} if (e == "E222") {e = "\u0037\uFE0F\u20E3"} if (e == "E343") {e = "\uD83C\uDF62"} if (e == "E101") {e = "\uD83D\uDCEB"} if (e == "E223") {e = "\u0038\uFE0F\u20E3"} if (e == "E344") {e = "\uD83C\uDF63"} if (e == "E102") {e = "\uD83D\uDCEE"} if (e == "E224") {e = "\u0039\uFE0F\u20E3"} if (e == "E345") {e = "\uD83C\uDF4E"} if (e == "E103") {e = "\uD83D\uDCE9"} if (e == "E225") {e = "\u0030\uFE0F\u20E3"} if (e == "E346") {e = "\uD83C\uDF4A"} if (e == "E104") {e = "\uD83D\uDCF2"} if (e == "E226") {e = "\uD83C\uDE50"} if (e == "E347") {e = "\uD83C\uDF53"} if (e == "E105") {e = "\uD83D\uDE1C"} if (e == "E227") {e = "\uD83C\uDE39"} if (e == "E348") {e = "\uD83C\uDF49"} if (e == "E106") {e = "\uD83D\uDE0D"} if (e == "E228") {e = "\uD83C\uDE02\uFE0F"} if (e == "E349") {e = "\uD83C\uDF45"} if (e == "E107") {e = "\uD83D\uDE31"} if (e == "E229") {e = "\uD83C\uDD94"} if (e == "E108") {e = "\uD83D\uDE13"} if (e == "E109") {e = "\uD83D\uDC35"} if (e == "E34A") {e = "\uD83C\uDF46"} if (e == "E22A") {e = "\uD83C\uDE35"} if (e == "E34B") {e = "\uD83C\uDF82"} if (e == "E22B") {e = "\uD83C\uDE33"} if (e == "E34C") {e = "\uD83C\uDF71"} if (e == "E10A") {e = "\uD83D\uDC19"} if (e == "E22C") {e = "\uD83C\uDE2F"} if (e == "E34D") {e = "\uD83C\uDF72"} if (e == "E10B") {e = "\uD83D\uDC37"} if (e == "E22D") {e = "\uD83C\uDE3A"} if (e == "E10C") {e = "\uD83D\uDC7D"} if (e == "E00E") {e = "\uD83D\uDC4D"} if (e == "E12F") {e = "\uD83D\uDCB0"} if (e == "E00F") {e = "\u261D\uFE0F"} if (e == "E250") {e = "\uD83D\uDCF3"} if (e == "E130") {e = "\uD83C\uDFAF"} if (e == "E251") {e = "\uD83D\uDCF4"} if (e == "E131") {e = "\uD83C\uDFC6"} if (e == "E252") {e = "\u26A0\uFE0F"} if (e == "E010") {e = "\u270A"} if (e == "E132") {e = "\uD83C\uDFC1"} if (e == "E253") {e = "\uD83D\uDC81"} if (e == "E011") {e = "\u270C\uFE0F"} if (e == "E133") {e = "\uD83C\uDFB0"} if (e == "E012") {e = "\u270B"} if (e == "E013") {e = "\uD83C\uDFBF"} if (e == "E134") {e = "\uD83D\uDC0E"} if (e == "E135") {e = "\uD83D\uDEA4"} if (e == "E014") {e = "\u26F3"} if (e == "E015") {e = "\uD83C\uDFBE"} if (e == "E136") {e = "\uD83D\uDEB2"} if (e == "E137") {e = "\uD83D\uDEA7"} if (e == "E016") {e = "\u26BE"} if (e == "E017") {e = "\uD83C\uDFC4"} if (e == "E138") {e = "\uD83D\uDEB9"} if (e == "E139") {e = "\uD83D\uDEBA"} if (e == "E018") {e = "\u26BD"} if (e == "E019") {e = "\uD83D\uDC1F"} if (e == "E13A") {e = "\uD83D\uDEBC"} if (e == "E01A") {e = "\uD83D\uDC34"} if (e == "E13B") {e = "\uD83D\uDC89"} if (e == "E13C") {e = "\uD83D\uDCA4"} if (e == "E01B") {e = "\uD83D\uDE97"} if (e == "E13D") {e = "\u26A1"} if (e == "E01C") {e = "\u26F5"} if (e == "E13E") {e = "\uD83D\uDC60"} if (e == "E01D") {e = "\u2708\uFE0F"} if (e == "E01E") {e = "\uD83D\uDE83"} if (e == "E13F") {e = "\uD83D\uDEC0"} if (e == "E11E") {e = "\uD83D\uDCBC"} if (e == "E23F") {e = "\u2648"} if (e == "E11F") {e = "\uD83D\uDCBA"} if (e == "E240") {e = "\u2649"} if (e == "E120") {e = "\uD83C\uDF54"} if (e == "E241") {e = "\u264A"} if (e == "E242") {e = "\u264B"} if (e == "E121") {e = "\u26F2"} if (e == "E001") {e = "\uD83D\uDC66"} if (e == "E243") {e = "\u264C"} if (e == "E122") {e = "\u26FA"} if (e == "E002") {e = "\uD83D\uDC67"} if (e == "E244") {e = "\u264D"} if (e == "E123") {e = "\u2668\uFE0F"} if (e == "E124") {e = "\uD83C\uDFA1"} if (e == "E003") {e = "\uD83D\uDC8B"} if (e == "E245") {e = "\u264E"} if (e == "E125") {e = "\uD83C\uDFAB"} if (e == "E004") {e = "\uD83D\uDC68"} if (e == "E246") {e = "\u264F"} if (e == "E005") {e = "\uD83D\uDC69"} if (e == "E126") {e = "\uD83D\uDCBF"} if (e == "E247") {e = "\u2650"} if (e == "E006") {e = "\uD83D\uDC55"} if (e == "E127") {e = "\uD83D\uDCC0"} if (e == "E248") {e = "\u2651"} if (e == "E007") {e = "\uD83D\uDC5F"} if (e == "E128") {e = "\uD83D\uDCFB"} if (e == "E249") {e = "\u2652"} if (e == "E008") {e = "\uD83D\uDCF7"} if (e == "E129") {e = "\uD83D\uDCFC"} if (e == "E009") {e = "\u260E\uFE0F"} if (e == "E24A") {e = "\u2653"} if (e == "E12A") {e = "\uD83D\uDCFA"} if (e == "E24B") {e = "\u26CE"} if (e == "E12B") {e = "\uD83D\uDC7E"} if (e == "E00A") {e = "\uD83D\uDCF1"} if (e == "E24C") {e = "\uD83D\uDD1D"} if (e == "E24D") {e = "\uD83C\uDD97"} if (e == "E00B") {e = "\uD83D\uDCE0"} if (e == "E12C") {e = "\u303D\uFE0F"} if (e == "E24E") {e = "\u00A9\uFE0F"} if (e == "E12D") {e = "\uD83C\uDC04"} if (e == "E00C") {e = "\uD83D\uDCBB"} if (e == "E24F") {e = "\u00AE\uFE0F"} if (e == "E12E") {e = "\uD83C\uDD9A"} if (e == "E00D") {e = "\uD83D\uDC4A"}
  // },

  onGetUserInfo: function(e) {
    const db = wx.cloud.database()
    const _ = db.command
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userRegularData = e.detail.userInfo
      console.log(this.toHex(e.detail.userInfo.nickName))
      // var nickname = this.toStr(this.toHex(e.detail.userInfo.nickName))
      // nickname = decodeURIComponent(JSON.parse('"'+nickname.replace(/\"/g,'\\"')+'"'))
      // nickname = nickname.substring(2, nickname.length-2)
      this.setData({
        hide: false,
        userRegularData: app.globalData.userRegularData,
        // userNickname: nickname
      })
    }
  },

  submitEmoji: function(e) {
    var content = e.detail.value.emojis
    this.setData({
      emoji: this.toHex(content)
    })
    if (content) {
      const db = wx.cloud.database()
      db.collection('emojiTest').add({
        data: {
          id: 'ABC',
          msg: this.data.emoji
        }, success: res => {
          console.log("success")
        }
      })
    }
  },

  resetEmoji: function(e) {
    this.setData({
      emoji: ""
    })
  },

  toHex: function(str) {
    var result = new Array()
    var k = 0
    for (var i = 0; i < str.length; i++) {
      var j = str[i].charCodeAt(0)
      result[k++] = j.toString(16).padStart(4,0)
    }
    return result
  },

  toStr: function(hex) {
    var result = ""
    for (var i = 0; i < hex.length; i++) {
      result += "\\"+"u"+hex[i]
    }
    result = "\'\"" + result + "\"\'"
    return result
  },

  showEmoji: function(e) {
    const db = wx.cloud.database()
    db.collection('emojiTest').where({
      id: 'ABC'
    }).get({
      success: res => {
        this.setData({
          tmp: res.data[0].msg
        })
        if (this.data.tmp) {
          this.setData({
            show: this.toStr(this.data.tmp)
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})