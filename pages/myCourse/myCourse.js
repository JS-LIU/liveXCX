import { courseService } from '../../store/service/CourseService.js';
import { HB } from '../../store/util/HB.js';
import { TimeManager } from '../../store/entity/TimeManager.js';
// pages/myCourse/myCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ownedCourse: {},
    coursePlanItemModuleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goodNo)
    this.goodNo = options.goodNo;
    let coursePlanItemModuleList = [];
    courseService.getOwnedCourseDetail(this.goodNo).then((ownedCourse) => {
      this.ownedCouser = ownedCourse;
      let ownedCourseModule = ownedCourse.getModule.before((repairParam) => {
        repairParam = repairParam || {};
        repairParam.startTime = ownedCourse.courseInfo.getStartTimeToShow("common");
        repairParam.endTime = ownedCourse.courseInfo.getEndTimeToShow("common");
      }).call(ownedCourse, {});
      console.log("ownedCourseModule:",ownedCourseModule)
      
      let coursePlanItemList = courseService.getOwnedCoursePlanItemListByDetail(this.goodNo);
      console.log("coursePlanItemList", coursePlanItemList);
      for (let i = 0; i < coursePlanItemList.length;i++){
        coursePlanItemModuleList.push(coursePlanItemList[i].getModule.before((repairParam) => {
          repairParam.startTime = coursePlanItemList[i].coursePlanItem.getShowTime("unix");
        }).call(coursePlanItemList[i], {}));
      }
      console.log("coursePlanItemModuleList:",coursePlanItemModuleList)
      this.setData({
        ownedCourse: ownedCourseModule,
        coursePlanItemModuleList: coursePlanItemModuleList
      });
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
  bindReadCourseWare: function (e){
    let coursePlanItemId = e.currentTarget.dataset.coursePlanItemId;
    let coursePlanItem = this.ownedCouser.findCoursePlanItemByCoursePlanItemId(coursePlanItemId);
    courseService.getLectureNotes(coursePlanItem.coursePlanItem).then((data)=>{
      coursePlanItem.coursePlanItem.lectureNotes.setUrl(data.urlPath);
      let url = '/pages/lecture/lecture?goodNo=' + this.ownedCouser.courseInfo.goodNo+'&coursePlanItemId='+coursePlanItemId;
      wx.navigateTo({
        url: url,
      });
    });

  },
  bindHomeworkComment: function (e){
    console.log("coursePlanItem", e.currentTarget.dataset.coursePlanItemId);
    let coursePlanItemId = e.currentTarget.dataset.coursePlanItemId;
    let coursePlanItem = this.ownedCouser.findCoursePlanItemByCoursePlanItemId(coursePlanItemId);
    console.log("homework==:",coursePlanItem.coursePlanItem.homework);
    if (coursePlanItem.coursePlanItem.homework.homeworkDownloadStatus === 1 || coursePlanItem.coursePlanItem.homework.homeworkDownloadStatus === 2){
      let url = '/pages/showHomework/showHomework?goodNo=' + this.ownedCouser.courseInfo.goodNo + '&coursePlanItemId=' + coursePlanItemId;
      wx.navigateTo({
        url: url,
      })
    }
  },
  onNavigateToStudyReporter:function(e){
    let url = "/pages/studyReporterList/studyReporterList?goodNo=" + this.goodNo
        wx.navigateTo({
          url: url,
        })
       
  }
})