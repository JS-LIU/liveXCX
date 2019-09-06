/**
 * Created by Liudq on 2019-07-30
 */
import {TimeManager} from "./TimeManager";
import {OrderProduct} from "./OrderProduct";


export class Order {
    constructor(orderInfo){
        this.orderNo = orderInfo.orderNo;
        this.payPrice = orderInfo.payPrice;
        this.payLastTime = orderInfo.payLastTime;
        this.frequentlyStep = 2;
        this.lazyStep = 10;
        this.status = orderInfo.status||orderInfo.orderStatus;
        this.salePrice = orderInfo.salePrice;
        this.orderCreateTime = orderInfo.orderCreateTime;
        //  todo 现在order对商品是1对1 1对多的时候改成list
        this.orderCourse = new OrderProduct({
            timeList:orderInfo.timeList,
            name:orderInfo.goodName,
            level:orderInfo.series,
            sellPrice:orderInfo.sellPrice,
            startTime:orderInfo.startTime,
            endTime:orderInfo.endTime,
            type:orderInfo.goodType,
            teacherList:orderInfo.teacherList,
            assistant:orderInfo.assistant,
        });
        this.orderDetail = null;
    }
    setDetail(orderDetail){
        this.orderCourse.setAssistant(orderDetail.assistant||{});
        this.orderCourse.setMajorTeacher(orderDetail.teacherList);
        this.orderDetail = orderDetail;
        this.setPayTime();
        this.setPayType();
        this.setSalePrice();
        this.setSellPrice();
    }
    /**
     * 是否过期
     * @returns {boolean}
     */
    isOverDue(currentTimeStampBySec){
        console.log("======",currentTimeStampBySec);
        console.log("======",this.payLastTime);
        return (currentTimeStampBySec > this.payLastTime);
    }

    /**
     * 剩余时间
     */
    getRemainTime(currentTimeStampBySec){
        return currentTimeStampBySec - this.payLastTime;
    }

    /**
     * 获取频繁查询的边界
     */
    getBoundOfFrequently(currentTimeStampBySec){
        return currentTimeStampBySec + 60 < this.payLastTime ? currentTimeStampBySec + 60:this.payLastTime;
    }
    static statusStrategy(){
        return {
            "3001":"未支付",
            "3002":"已支付",
            "3003":"已取消",
            "3004":"已过期"
        }
    }
    getOrderStatus(code){
        return Order.statusStrategy()[code];
    }

    setPayTime() {
        if(this.status !== 3002){
            this.orderDetail.payTime = this.getOrderStatus(this.status);
        }else{
            this.orderDetail.payTime = TimeManager.convertStampToMDHM(this.orderDetail.payTime,"unix")
        }
    }


    setPayType() {
        if(this.status !== 3002){
            this.orderDetail.payType = this.getOrderStatus(this.status);
        }else{
            this.orderDetail.payType = "微信支付";
        }
    }

    setSalePrice() {
        if(this.status !== 3002){
            this.orderDetail.salePrice = this.getOrderStatus(this.status);
        }else{
            this.orderDetail.salePrice = this.orderDetail.salePrice / 100;
        }
    }

    setSellPrice() {
        if(this.status !== 3002){
            this.orderDetail.payType = this.getOrderStatus(this.status);
        }else{
            this.orderDetail.sellPrice = this.orderDetail.sellPrice / 100;
        }
    }
}