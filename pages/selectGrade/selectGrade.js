// pages/selectGrade/selectGrade.js
import { courseService } from '../../store/service/CourseService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    generalCourseType: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      generalCourseType: courseService.courseType
    });
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
  bindSelectSpecifyType: function (e){
    let specifyCourseTypeItem = e.currentTarget.dataset.speciryCourseItem;
    courseService.toggleSelectSpecifyType(specifyCourseTypeItem);
    this.setData({
      generalCourseType: courseService.courseType
    });
    wx.switchTab({
      url: '/pages/selectCenter/selectCenter',
    })
  },
  bindSelectAll: function (e){
    let generalCourseTypeItem = e.currentTarget.dataset.generalCourseTypeItem;
    courseService.selectAllSpecifyCourseType(generalCourseTypeItem);
    this.setData({
      generalCourseType: courseService.courseType
    });
    wx.switchTab({
      url: '/pages/selectCenter/selectCenter',
    }) 
  }
})