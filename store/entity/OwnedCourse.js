/**
 * Created by Liudq on 2019-07-23
 */
import {CourseType} from "./CourseType";
import {LearnStatus} from './LearnStatus';
import {OwnedCoursePlanItem} from "./OwnedCoursePlanItem";
import {CourseInfo} from "./CourseInfo";
import {Teacher} from "./Teacher.js";
/**
 * 已经购买过的课程
 */
export class OwnedCourse {
    constructor(courseInfo) {
        this.courseInfo = new CourseInfo(courseInfo);
        this.learnStatus = new LearnStatus(courseInfo.learnStatus);
        this.finishLessonNum = courseInfo.finishLessonNum;
        this.shareQrcode = courseInfo.shareQrcode;
    }
    setDetail(detail){
        this.detail = detail;
        this.coursePlanList = this.getCoursePlanList();
        this.updateTeacherInfo();
    }
    updateTeacherInfo(){
      this.courseInfo.teacherInfo = new Teacher(this.detail.teacherInfo);
      this.courseInfo.assistantInfo = new Teacher(this.detail.assistantInfo);
    }

    getCoursePlanList(){
        let list = [];
        for(let i = 0;i < this.detail.coursePlans.length;i++){
            let coursePlanItem = this.detail.coursePlans[i];
            this.coursePlanItemPaddingType(coursePlanItem);
            this.coursePlanItemPaddingCourseName(coursePlanItem);
            list.push(new OwnedCoursePlanItem(coursePlanItem));
        }
        return list;
    }
    //  添加类型为coursePlanItem
    coursePlanItemPaddingType(coursePlanItem){
        coursePlanItem.type = this.courseInfo.type.type;
    }
    //  添加courseName为coursePlanItem
    coursePlanItemPaddingCourseName(coursePlanItem){
        coursePlanItem.courseName = this.courseInfo.courseName;
    }
  findCoursePlanItemByCoursePlanItemId(coursePlanItemId) {
    return this.coursePlanList.find((coursePlanItem, index) => {
      return parseInt(coursePlanItem.coursePlanItem.id) === parseInt(coursePlanItemId);
    });
  }
    getModule(repairParam){
        let module = Object.assign({},this.courseInfo.getModule(),{
            finishLessonNum:this.finishLessonNum,
            shareQrcode:this.shareQrcode,
            learnStatus:this.learnStatus.getStatusInfo()
        },repairParam);
        if(this.detail){
            module = Object.assign(module,{
                coursePlanList:this.coursePlanList
            });
        }
        return module;

    }
}
