/**
 * Created by Liudq on 2019-08-14
 */
export class LearnStatus {
    constructor(status){
        this.status = status;
    }
    static statusManager(){
        return {
            "0":{
                name:"未开课",
                background:"#FFFFFF",
                color:"#808080",
                pcName:"课前预习",
                pcColor:"#61BF55"
            },
            "1":{
                name:"已结束",
                background:"#FFFFFF",
                color:"#808080",
                pcName:"课后复习",
                pcColor:"#61BF55"
            },
            "2":{
                name:"正在学",
                background:"#61BF55",
                color:"#FFFFFF",
                pcName:"进入课堂",
                pcColor:"#FFFFFF",
            }
        }
    }
    getStatusInfo(){
        return LearnStatus.statusManager()[this.status];
    }
}