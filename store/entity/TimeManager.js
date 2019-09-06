/**
 * Created by Liudq on 2019-07-24
 */
export class TimeManager {
    constructor(){
        this.activeTime = [];
    }
    //  将时间转换为时间戳 ("yyyy-mm-dd hh:mm:ss")
    static convertToTimeStampBySec(date){
        return new Date(date).getTime() / 1000;
    }
    //  当前时间戳
    static currentTimeStampBySec(){
        return Date.parse(new Date()) / 1000;
    }
    //  分钟转换秒
    static convertMinToSec(min){
        return min * 60;
    }

    //  秒转换分钟
    static convertSecToMin(sec){
        return parseInt(sec / 60);
    }
    //  剩余秒
    static convertRemainSec(sec){
        return sec % 60;
    }
    //  倒计时
    static getCountDownTime(sec) {
        return TimeManager.convertSecToMin(sec) + ":" + TimeManager.paddingZero(TimeManager.convertRemainSec(sec));
    }
    //  补零
    static paddingZero(paddingTarget){
        return (paddingTarget < 10 ? '0' + paddingTarget : paddingTarget);
    }
    static convertToCommon(type,timeStamp){
        return TimeManager.getType(timeStamp)[type]
    }
    static getType(timeStamp){
        return {
            "unix":timeStamp * 1000,
            "common":timeStamp
        }
    }
    //  时间戳转换时间
    static timeStampToDate(timestamp,type) {
        let date = new Date(TimeManager.convertToCommon(type,timestamp));
        return {
            Y : date.getFullYear(),
            M : date.getMonth()+1,
            D : TimeManager.paddingZero(date.getDate()),
            h : date.getHours(),
            m : TimeManager.paddingZero(date.getMinutes()),
            s : date.getSeconds(),
            w : date.getDay()
        };
    }
    //  转换时间戳到 年 月 日
    static convertStampToYMD(timestamp,type){
        let d = TimeManager.timeStampToDate(timestamp,type);
        return d.Y+"-"+d.M+"-"+d.D;
    }
    //  转换时间到月日
    static convertStampToMD(timestamp,type){
        let d = TimeManager.timeStampToDate(timestamp,type);
        return d.M+"月"+d.D+"日";
    }
    //  转换时间戳到 月 日 时 分
    static convertStampToMDHM(timestamp,type){
        let d = TimeManager.timeStampToDate(timestamp,type);
        return d.M + d.D + d.h + d.m;
    }

    //  年月日转时间戳
    static convertYMDToStampByUnix(YMD){
        return new Date(YMD).getTime() / 1000;
    }
    static convertYMDToStampByCommon(YMD){
        return new Date(YMD).getTime();
    }
    static createDate(start,end){
        let list = [];
        for(let i = start;i <= end;i++){
            list.push(i);
        }
        return list;
    }
}
