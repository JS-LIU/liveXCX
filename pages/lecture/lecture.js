// pages/lecture.js
import { courseService } from '../../store/service/CourseService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ownedCourse = courseService.findOwnedCourseByGoodNo(options.goodNo);
    console.log(ownedCourse)
    console.log(options.coursePlanItemId);
    let coursePlanItem = ownedCourse.findCoursePlanItemByCoursePlanItemId(options.coursePlanItemId);
    let url = coursePlanItem.coursePlanItem.lectureNotes.url;
    console.log("url======url",url)
    this.setData({
      url: url
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