/**
 * Created by Liudq on 2019-07-30
 */
import {TimeManager} from "./TimeManager";
import {OrderProduct} from "./OrderProduct";
import {Teacher} from './Teacher.js';

export class Order {
    constructor(orderInfo){
        this.orderNo = orderInfo.orderNo;
        this.payPrice = orderInfo.payPrice;
        this.payLastTime = orderInfo.payLastTime;
        this.frequentlyStep = 2;
        this.lazyStep = 10;
        this.status = orderInfo.status||orderInfo.orderStatus;
        this.sellPrice = orderInfo.sellPrice;
        this.orderCreateTime = orderInfo.orderCreateTime;
        //  todo 现在order对商品是1对1 1对多的时候改成list
        this.orderCourse = new OrderProduct({
            timeList:orderInfo.timeList,
            name:orderInfo.goodName,
            level:orderInfo.series,
            sellPrice:orderInfo.sellPrice,
            salePrice: orderInfo.salePrice,
            startTime:orderInfo.startTime,
            endTime:orderInfo.endTime,
            type:orderInfo.goodType,
            teacherList: [orderInfo.teacherInfo],
            assistant:orderInfo.assistant,
            goodNo:orderInfo.goodNo
        });
        this.orderDetail = null;
    }
    setDetail(orderDetail){
      this.orderCourse.courseInfo.assistantInfo = new Teacher(orderDetail.assistant || {});
      this.orderCourse.courseInfo.teacherInfo = new Teacher(orderDetail.teacherList[0]);
        this.orderDetail = orderDetail;
        this.setPayTime();
        this.setPayType();
        this.setSalePrice();
        this.setSellPrice();
      this.setReducePrice();
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
            "3004":"已过期",
            "3005":"未支付"
        }
    }
    getOrderStatus(){
      return Order.statusStrategy()[this.status];
    }

    setPayTime() {
        if(this.status !== 3002){
            this.orderDetail.payTime = this.getOrderStatus(this.status);
        }else{
          console.log(this.orderDetail.payTime)
          let d = TimeManager.timeStampToDate(this.orderDetail.payTime, "unix");
          this.orderDetail.payTime = d.Y + "-" + d.M + "-" + d.D + " " + d.h + ":" + d.m + ":" + d.s
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
      console.log("status:==",this.status);
      if (this.status !== 3002) {
        this.orderDetail.salePrice = "0.00";
      } else {
        this.orderDetail.salePrice = (this.orderDetail.salePrice / 100).toFixed(2);
      }
      
        
    }

    setSellPrice() {
      this.orderDetail.sellPrice = (this.orderDetail.sellPrice / 100).toFixed(2);
    }
    setReducePrice(){
      if (this.status !== 3002) {
        return this.orderDetail.reducePrice = "0.00";
      } else {
        this.orderDetail.reducePrice = parseFloat(this.orderDetail.sellPrice) - parseFloat(this.orderDetail.salePrice);
      }
        
    }
    getModule(){
      return {
        orderNo :this.orderNo,
        payPrice :this.payPrice,
        payLastTime :this.payLastTime,
        status: this.getOrderStatus(),
        payType: this.orderDetail.payType,
        sellPrice :this.orderDetail.sellPrice,
        salePrice: this.orderDetail.salePrice,
        orderCreateTime :this.orderCreateTime,
        payTime: this.orderDetail.payTime,
        reducePrice: this.orderDetail.reducePrice
      }
    }
}