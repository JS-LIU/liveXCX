import {TimeManager} from "./TimeManager";
import {baseUrl} from "../config/config";

/**
 * Created by Liudq on 2019/9/3
 */
export class UserInfo {
    constructor(userInfo) {
        this.address = userInfo.address;
        this.birthday = userInfo.birthday;
        this.birthY = TimeManager.timeStampToDate(userInfo.birthday, "unix").Y;
        this.birthM = TimeManager.timeStampToDate(userInfo.birthday, "unix").M;
        this.birthD = TimeManager.timeStampToDate(userInfo.birthday, "unix").D;
        this.grade = this.setGrade(userInfo.grade);
        this.headImgUrl = this.setHeadImgUrl(userInfo.headImgUrl);
        this.improve = userInfo.improve;
        this.nickName = userInfo.nickName;
        this.phone = userInfo.phone;
        this.sex = userInfo.sex || 1;
        this.userName = this.setUserName(userInfo.userName);
        this.userReward = userInfo.userReward;
        this.wechatQrCode = userInfo.wechatQrCode;
        this.wxPublic = userInfo.wxPublic;
    }
    setUserName(userName){
        if(userName === ""){
            return "小松许"
        }
    }
    setHeadImgUrl(headImgUrl){
        if(headImgUrl === ""){
            return baseUrl.getBaseUrl()+"/src/img/def_header_img.png";
        }
    }
    setGrade(grade){
        if(grade === ""){
            return "学前班";
        }
    }
}