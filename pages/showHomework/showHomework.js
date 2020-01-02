import { courseService } from "../../store/service/CourseService";

// pages/showHomework/showHomework.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goodNo);
    console.log(options.coursePlanItemId)
    let ownedCourse = courseService.findOwnedCourseByGoodNo(options.goodNo);
    console.log(ownedCourse)
    console.log("userCoursePlanId:==提供用这个id换videoid的接口然后直接加载视频",options.coursePlanItemId);
    let coursePlanItem = ownedCourse.findCoursePlanItemByCoursePlanItemId(options.coursePlanItemId);
    console.log(coursePlanItem);

    // coursePlanItem.homework.getStatusInfo(coursePlanItem).download().then;
    courseService.downLoadHomework(coursePlanItem.coursePlanItem).then((data)=>{
      console.log(data);
      return courseService.videoViewUrl(data.data.videoId)
      
    }).then((data) => {
        console.log(data.data.playUrl);
        var videoContext = wx.createVideoContext('J_show_video', this);
  　　   videoContext.requestFullScreen();
      this.setData({
        src: data.data.playUrl
      })
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

  }
})