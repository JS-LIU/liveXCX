// pages/selectCenter/selectCenter.js
import { courseService } from '../../store/service/CourseService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "../img/lunbo.png",
      "../img/lunbo.png",
      "../img/lunbo.png"
    ],
    generalCourseType:[],
    courseList:[],
    isShowSwiper:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    courseService.getCourseType().then((list) => {
      this.setData({
        generalCourseType: list
      });
      courseService.pagination.to(1);
      this.updateCourseList();
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
  bindSelectAll: function (generalCourseTypeItem){
    return ()=>{
      this.setData({
        isShowSwiper:true 
      })
      console.log(generalCourseTypeItem);
      courseService.selectAllSpecifyCourseType(generalCourseTypeItem);
      
    }
  },
  onQueryCourseList:function(){
    this.pagination.to(1);
    this.updateCourseList(); 
  },
  updateCourseList:function(){
    courseService.getProductCourse().then((courseList) => {
      for (let i = 0; i < courseList.length;i++){
        let productModule = courseList[i].getModule.before((repairParam) => {
          repairParam = repairParam || {};
          repairParam.startTime = courseList[i].courseInfo.getStartTimeToShow("unix");
          repairParam.endTime = courseList[i].courseInfo.getEndTimeToShow("unix");
        }).call(courseList[i], {});
        this.data.courseList.push(productModule)
      }
      this.setData({
        courseList: this.data.courseList
      });
    });
  },
  bindSelectSpecifyType: function (specifyCourseTypeItem) {
    courseService.toggleSelectSpecifyType(specifyCourseTypeItem);
    this.setData({
      courseTypeList: courseService.courseType,
      isShowSwiper:false
    });
    this.onQueryCourseList();
  }
})