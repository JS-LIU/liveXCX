import {CourseType} from "./CourseType";
import {TimeManager} from "./TimeManager";
import {Teacher} from './Teacher';
import {HB} from "../util/HB";

/**
 * Created by Liudq on 2019/8/31
 */
export class CourseInfo {
    constructor(courseInfo){
        this.id = courseInfo.id;
        this.teacherInfo = new Teacher(courseInfo.teacherInfo);
        this.assistantInfo = new Teacher(courseInfo.assistantInfo);
        this.type = new CourseType(courseInfo.type);
        this.courseName = courseInfo.courseName || courseInfo.name;
        this.timeList = this.getTimeList(courseInfo.timeList);
        this.startTime = courseInfo.startTime;
        this.endTime = courseInfo.endTime;
        this.level = courseInfo.level;
        this.totalLessonNum = courseInfo.totalLessonNum;
    }
    getStartTimeToShow(type){
        return TimeManager.convertStampToMD(this.startTime,type);
    }
    getEndTimeToShow(type){
        return TimeManager.convertStampToMD(this.endTime,type);
    }
    getTimeList(timeList){
        for(let i = 0;i < timeList.length;i++){
            timeList[i].week = this.convertWeekZero(timeList[i].week);
            timeList[i].week = this.parseToChinese(timeList[i].week);
        }
        return timeList;
    }
    convertWeekZero(week) {
        return (week === 0? 7:week);
    }
    parseToChinese(week) {
        return HB.valid.parseChinese(week)[0];
    }
    getModule(){
        return {
            id:this.id,
            courseName : this.courseName,
            timeList : this.timeList,
            startTime : this.startTime,
            endTime : this.endTime,
            teacherInfo : this.teacherInfo.getModule(),
            assistantInfo : this.assistantInfo.getModule(),
            level : this.level,
            type : this.type.getTypeInfo(),
            totalLessonNum: this.totalLessonNum
        }
    }
}
// var c = new CourseInfo();
// c.getModule.before(()=>{
//     c.startTime = c.getStartTimeToShow("unix");
// });

