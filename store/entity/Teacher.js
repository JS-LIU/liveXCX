/**
 * Created by Liudq on 2019/9/1
 */
import {HB} from "../util/HB";
import {baseUrl} from "../config/config";
export class Teacher {
    constructor(teacherInfo){
        let teacher = teacherInfo||{};
        this.teacherName = this.createTeacherName(teacher.teacherName);
        this.headImgUrl = this.createTeacherHeader(teacher.headImgUrl);
    }
    createTeacherName(name){
        if(HB.obj.isNothing(name)){
            return "暂未分配"
        }else{
            return name;
        }
    }
    createTeacherHeader(headImg) {
        if(HB.obj.isNothing(headImg)){
            return baseUrl.getBaseUrl() + "/src/img/def_header_img.png"
        }else{
            return headImg;
        }
    }

    getModule(){
        return {
            teacherName : this.teacherName,
            headImgUrl : this.headImgUrl
        }
    }
}
