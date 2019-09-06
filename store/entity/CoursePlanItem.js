/**
 * Created by Liudq on 2019/9/1
 */
import {TimeManager} from "./TimeManager";
import {Teacher} from "./Teacher";
import {Homework} from "./Homework";
import {PreVideo} from "./PreVideo";
import {Courseware} from "./Courseware";
import {LearnStatus} from "./LearnStatus";
import {CourseType} from "./CourseType";
import {HB} from "../util/HB";

export class CoursePlanItem {
    constructor(coursePlanItemInfo){
        //  没有的字段
        // this.homeworkSavePath = coursePlanItemInfo.homeworkSavePath;
        this.id = coursePlanItemInfo.id;
        this.name = coursePlanItemInfo.name || coursePlanItemInfo.sessionName;
        this.courseName = coursePlanItemInfo.courseName;
        this.preVideo = new PreVideo(coursePlanItemInfo.preVideoStatus,coursePlanItemInfo.preVideoId);
        this.teacherInfo = new Teacher(coursePlanItemInfo.teacherInfo);
        this.assistantInfo = new Teacher(coursePlanItemInfo.assistantInfo);
        this.courseware = new Courseware(coursePlanItemInfo.coursewareStatus,coursePlanItemInfo.coursewareUrl);
        this.homework = new Homework({
            userHomeworkStatus:coursePlanItemInfo.userHomeworkStatus,
            homeworkName:coursePlanItemInfo.homeworkName,
            homeworkUrl:coursePlanItemInfo.homeworkUrl
        });
        this.learnStatus = new LearnStatus(coursePlanItemInfo.learnStatus);
        this.type = new CourseType(coursePlanItemInfo.type);
        this.level = coursePlanItemInfo.level;
        this.startTime = coursePlanItemInfo.startTime || coursePlanItemInfo.classTime;
        this.lectureNotes = coursePlanItemInfo.lectureNotes;
        this.lectureNotesStatus = coursePlanItemInfo.lectureNotesStatus;
        this.materialList = coursePlanItemInfo.materialList;
        this.videoId = coursePlanItemInfo.videoId;
        this.videoViewStatus = coursePlanItemInfo.videoViewStatus;
    }
    getShowTime(type){
        let date = TimeManager.timeStampToDate(this.startTime,type);
        let M = date.M + ".";
        let D = date.D;
        let w = "周" + HB.valid.parseChinese(date.w)[0]+" ";
        let h = date.h+":";
        let m = date.m;
        return M + D + w + h + m;
    }
    getModule(){
        return {
            id:this.id,
            name:this.name,
            preVideo:this.preVideo.getPreVideoStatus(),
            courseName:this.courseName,
            teacherInfo:this.teacherInfo.getModule(),
            assistantInfo:this.assistantInfo.getModule(),
            courseware:this.courseware.getCourseWareStatus(),
            homework:this.homework.getStatusInfo(),
            learnStatus:this.learnStatus.getStatusInfo(),
            type:this.type.getTypeInfo(),
            level:this.level,
            startTime:this.startTime,
            lectureNotes:this.lectureNotes,
            lectureNotesStatus:this.lectureNotesStatus,
            materialList:this.materialList,
            videoId:this.videoId,
            videoViewStatus:this.videoViewStatus,
        }
    }
}
