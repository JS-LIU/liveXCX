// pages/paySuccess/paySuccess.js
import {TimeManager} from "../../store/entity/TimeManager.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payDate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    let d = TimeManager.timeStampToDate(new Date().getTime(), "common");
    console.log(d.Y + "-" + d.M + "-" + d.D + " " + d.h + ":" + d.m + ":" + d.s);
    this.setData({
      payDate: d.Y + "-" + d.M + "-" + d.D + " " + d.h + ":" + d.m + ":" + d.s
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

  },
  toIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})