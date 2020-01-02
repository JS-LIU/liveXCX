/**
 * Created by Liudq on 2019/9/11
 */
import {TimeManager} from '../../store/entity/TimeManager.js';

export class Coupon {
  constructor(couponInfo) {
    this.accountCouponNo = couponInfo.accountCouponNo;
    this.couponName = couponInfo.couponName;
    this.cash = couponInfo.cash;
    this.type = couponInfo.type;
    this.endTime = TimeManager.convertStampToYMD(couponInfo.endTime, "unix");
    this.limit = couponInfo.limit;
    this.couponStatus = couponInfo.couponStatus;
    this.mulityStatus = couponInfo.mulityStatus;
    this.preReduce = couponInfo.minCondition;
    this.selected = false;
    this.ifSaleGrant = couponInfo.ifSaleGrant;
    // this.alreadyUsed = 0;
  }
  toggleSelect(alreadyUsed, totalPrice) {
    // if(this.couponStatus === 1){
    //     this.selected = !this.selected;
    // }
    if (this.isCanSelect(alreadyUsed, totalPrice)) {
      this.selected = !this.selected;
    }
  }
  isCanSelect(alreadyUsed, totalPrice) {
    return this.isSelect.after(this.isCanUse).after(this.isMaxUse).call(this,alreadyUsed, totalPrice);
  }
  isSelect() {
    if (this.selected) {
      // this.reduceAlreadyUsed();
      return true;
    }
    return 'nextSuccessor';
  }
  isCanUse() {
    if (this.couponStatus === 0) {
      return false;
    }
    return 'nextSuccessor';
  }
  isMaxUse(alreadyUsed, totalPrice) {
    console.log("======",this.getMaxCanUse(totalPrice));
    if (alreadyUsed < this.getMaxCanUse(totalPrice)) {
      return true;
    }
  }



  getMaxCanUse(totalPrice) {
 
    return this.calcCantMulity.after(this.calcCanMulity).call(this,totalPrice);
  }

  calcCantMulity() {
    if (this.mulityStatus === 0) {
      return 1;
    }
    return "nextSuccessor";
  }
  calcCanMulity(totalPrice) {
    if (this.preReduce) {
      console.log("最多可用：",this.calcMaxCanUse(totalPrice))
      return this.calcMaxCanUse(totalPrice);
    } else {
      return Infinity;
    }
  }
  calcMaxCanUse(totalPrice) {
    // let preReduceByYuan = this.preReduce / 100;
    // let tp = this.
    //   console.log(this.preReduce)
    return Math.floor(totalPrice / this.preReduce);
  }

}