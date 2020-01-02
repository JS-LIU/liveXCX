import { courseService } from "../../store/service/CourseService"
import { TimeManager } from "../../store/entity/TimeManager";

// pages/studyReporterList/studyReporterList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reporterCourseList:[],
    totalReport:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    courseService.queryUserStudyReport(options.goodNo).then((data)=>{
      for(let i = 0;i < data.data.length;i++){
        data.data[i].classTime = TimeManager.convertStampToYMD(data.data[i].classTime,"unix");
      }


      this.setData({
        reporterCourseList:data.data,
        totalReport:data.data.length
      });
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
  onNavigateToReporter:function(e){
    let upid = e.currentTarget.dataset.upid;
    let url="/pages/studyReporter/studyReporter?upid="+upid;
    wx.navigateTo({
      url: url,
    })
    
  }
})