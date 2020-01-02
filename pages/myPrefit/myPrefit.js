// pages/myPrefit/myPrefit.js
import {userService} from '../../store/service/UserService.js';
import {TimeManager} from '../../store/entity/TimeManager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefit:{},
    currentTime:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userService.accountSugInfo().then((data)=>{
      data.data.account = (data.data.account/100).toFixed(2)
      for (let i = 0; i < data.data.suggestInfoList.length;i++){
        data.data.suggestInfoList[i].showBoughtD = TimeManager.convertStampToYMD(data.data.suggestInfoList[i].boughtDate,"unix");
        data.data.suggestInfoList[i].showRegistD = TimeManager.convertStampToYMD(data.data.suggestInfoList[i].registDate, "unix");
        data.data.suggestInfoList[i].showScoreD = TimeManager.convertStampToYMD(data.data.suggestInfoList[i].scoreDate, "unix");
        console.log("data",data);
        let tel = data.data.suggestInfoList[i].phone;
        data.data.suggestInfoList[i].phone = tel.substr(0, 3) + "****" + tel.substr(7);
          
      }

      this.setData({
        prefit: data.data,
        currentTime:new Date().getTime()
      })
    })
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