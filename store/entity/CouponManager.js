/**
 * Created by Liudq on 2019/9/11
 */
import {Coupon} from "./Coupon";

export class CouponManager {
    constructor(couponList){
        this.couponList = this.createList(couponList);
        this.canUseCouponList = this.getCanUseCoupon();
    }
    createList(couponList){
      let list = [];
      for (let i = 0; i < couponList.length;i++){
        list.push(new Coupon(couponList[i]));
      }
      return list;
    }
    getCanUseCoupon(){
      let list = [];
      for (let i = 0; i < this.couponList.length; i++) {
        if (this.couponList[i].couponStatus === 1){
          list.push(this.couponList[i]);
        }
      }
      return list;
    }
    //  最大匹配可以使用的优惠券
    maxUseCouponList(){
        //  不可叠加使用的最大面值的优惠券
        let unMixedMaxCouponList = this.getUnMixedMaxCouponList();
        //  可叠加使用的叠加最大金额优惠券
        let mixedCouponList = this.getMixedCouponList();
        return this.calcCouponPrice(mixedCouponList) > this.calcCouponPrice(unMixedMaxCouponList) ? mixedCouponList : unMixedMaxCouponList;
    }
    //  默认全不选中
    getDefCouponList(){
        // let list = this.maxUseCouponList();
        for (let i = 0; i < this.couponList.length;i++){
          this.couponList[i].selected = false;
        }
        // console.log("defCoupon:",list)
        return this.couponList;
    }
    

    //  不可叠加使用的最大面值的优惠券满
    getUnMixedMaxCouponList(){
        let unMultiplyMaxCoupon = {cash:0};
        for (let i = 0; i < this.canUseCouponList.length;i++){
            if(this.couponList[i].mulityStatus === 0){
                unMultiplyMaxCoupon = (this.couponList[i].cash > unMultiplyMaxCoupon.cash ? this.couponList[i]:unMultiplyMaxCoupon);
            }
        }
        return [unMultiplyMaxCoupon];
    }
    //  可叠加使用的叠加最大金额优惠券
    getMixedCouponList(){
        let mixedCouponList = [];
        for (let i = 0; i < this.canUseCouponList.length;i++){
            if(this.couponList[i].mulityStatus === 1){
                mixedCouponList.push(this.couponList[i])
            }
        }
        return mixedCouponList;
    }
    calcCouponPrice(couponList){
        let price = 0;
        for(let i = 0;i < couponList.length;i++){
            price += couponList[i].cash;
        }
        return price;
    }
    toggleSelectCoupon(accountCouponNo,salePrice){
        let coupon = this.findCouponByAccountCouponNo(accountCouponNo);
        // this.getAlreadyUsed(coupon);
      coupon.toggleSelect(this.calcAlreadyUsedNum(coupon),salePrice);
        this.updateCouponUseStatus(coupon);
    }
    calcAlreadyUsedNum(coupon){
      let alreadyUsedCoupon = this.canUseCouponList.filter((couponItem,index)=>{
        return (couponItem.ifSaleGrant === coupon.ifSaleGrant) && couponItem.selected;
      });
      console.log("alreadyUsed:",alreadyUsedCoupon.length);
      return alreadyUsedCoupon.length;
    }
    updateCouponUseStatus(coupon){
        if(coupon.mulityStatus === 0 && coupon.selected){
          this.selectUnMixed(coupon);
        }
        if(coupon.mulityStatus === 1 && coupon.selected){
            this.selectMixed();
        }
    }
    selectMixed(){
        for(let i = 0;i < this.couponList.length;i++){
            if(this.couponList[i].mulityStatus === 0){
                this.couponList[i].selected = false;
            }
        }
    }
    selectUnMixed(coupon){
        for(let i = 0;i < this.couponList.length;i++){
            this.couponList[i].selected = false;
        }
        coupon.selected = true;//  取消选择其他优惠券
    }
    findCouponByAccountCouponNo(accountCouponNo){
        return this.couponList.find((coupon,index)=>{
            return coupon.accountCouponNo === accountCouponNo;
        })
    }
    //  使用的优惠券的id
    getUseCouponAccountCouponNoList(){
      let accountCouponNoList = [];
      for (let i = 0; i < this.couponList.length; i++) {
        if (this.couponList[i].selected) {
          accountCouponNoList.push(this.couponList[i].accountCouponNo);
        }
      }
      return accountCouponNoList;
    }

}