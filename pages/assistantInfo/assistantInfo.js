// pages/assistantInfo/assistant.js
import {courseService} from '../../store/service/CourseService.js'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assistantInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goodNo);
    let ownedCourse = courseService.findOwnedCourseByGoodNo(options.goodNo);
    let ownedCourseModule = ownedCourse.getModule();
    console.log(ownedCourseModule.assistantInfo);
    this.setData({
      assistantInfo: ownedCourseModule.assistantInfo
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
  onCopyWxCode:function(){
    wx.setClipboardData({
      data: this.data.assistantInfo.wxCode,
      success(res) {
        console.log(res);        
      }
    })
  }
})