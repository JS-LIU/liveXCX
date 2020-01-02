// pages/courseDetail/courseDetail.js
import { courseService } from '../../store/service/CourseService.js';
import { HB } from '../../store/util/HB.js';
import { TimeManager } from '../../store/entity/TimeManager.js';
import {userService} from '../../store/service/UserService';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:{},
    versionStatus:"",
    butDesc:"",
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.courseNo);
    this.courseNo = options.courseNo;
    this.updateProductCourseDetail();
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
    courseService.checkVersion().then((data)=>{
      this.setData({
        versionStatus: data.data.status,
        butDesc: data.data.butDesc
      })
    });
    console.log("========",userService.getUser().token);
    if(userService.getUser().token){
      this.setData({
        isLogin:true
      });
    }
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
  updateProductCourseDetail:function() {
    courseService.getOrCreateProductCourseDetail(this.courseNo).then((course) => {
      let productModule = course.getModule.before((repairParam) => {
        repairParam = repairParam || {};
        repairParam.startTime = course.courseInfo.getStartTimeToShow("unix");
        repairParam.endTime = course.courseInfo.getEndTimeToShow("unix");
        repairParam.sellEndTime = course.getSellEndTimeToShow("unix");
        repairParam.showOriginPrice = (course.originPrice / 100).toFixed(2);
        repairParam.showSalePrice = (course.salePrice / 100).toFixed(2);
      }).call(course, {});
      console.log(productModule)
      this.setData({
        course: productModule
      });
    });
  },
  onWatchCourse:function(){
    console.log("=====",this.data.course);
    let course = courseService.findProductCourseByCourseNo(this.courseNo);

    courseService.videoViewUrl(this.data.course.videoId).then((data) => {
      console.log(data.data.playUrl);
      course.playUrl = data.data.playUrl;

      wx.navigateTo({
        url: '/pages/showVideo/showVideo?courseNo=' + this.courseNo
      })
    });
  },
  onMakeCall:function(){
    // wx.makePhoneCall({
    //   phoneNumber: '18801233565',
    // })
  }

})