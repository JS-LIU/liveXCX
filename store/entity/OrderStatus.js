/**
 * Created by Liudq on 2019-08-20
 */
export class OrderStatus {
    constructor(status,orderNo){
        this.status = status;
        this.orderNo = orderNo;
    }
    statusManager(){
        return {
            "3001":{
                name:"未支付",
                actionName:"立即支付",
                action:()=>{
                    //  跳到支付页面
                },
                actionLink:"/pay/" + this.orderNo,
                linkName:"取消订单",
                action1:()=>{

                },
                background:"#FFC200",
                color:"#FFFFFF",
            },
            "3002":{
                name:"已支付",
                actionName:"已支付",
                action:()=>{
                    return null;
                },
                linkName:"订单详情",
                color:"#000000",
                background:"#FFFFFF",
            },
            "3003":{
                name:"已取消",
                actionName:"已取消",
                action:()=>{
                    return null;
                },
                linkName:"取消订单",
                background:"#FFC200",
                color:"#FFFFFF",
            },
            "3004":{
                name:"已过期",
                actionName:"已过期",
                action:()=>{
                    return null;
                },
                linkName:"订单详情",
                background:"#FFC200",
                color:"#FFFFFF",
            }
        }
    }
    getCourseWareStatus(){
        return OrderStatus.StatusManager()[this.status];
    }
}
