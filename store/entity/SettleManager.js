/**
 * Created by Liudq on 2019/9/11
 */
import {CouponManager} from "./CouponManager";
import {Account} from "./Account";

export class SettleManager {
    constructor(sellPrice,couponList,balance){
        this.couponManager = new CouponManager(couponList);
        this.account = new Account(balance);
        this.sellPrice = sellPrice
    }
    getCouponReduceCash(){
        let reduceCash = 0;
        for(let i = 0;i < this.couponManager.couponList.length;i++){
            if(this.couponManager.couponList[i].selected){
                reduceCash += this.couponManager.couponList[i].cash;
            }
        }
        return reduceCash;
    }

    /**
     * 最多可用余额
     */
    getMaxCanUseBalance(){
        let maxReduce = this.getMaxReduce();
        return this.account.getAllowDeltaMax(maxReduce)||0;
    }

    /**
     * 刨除优惠券 需付金额
     * @returns {number}
     */
    getMaxReduce(){
        return this.sellPrice - this.getCouponReduceCash() < 0 ? 0:this.sellPrice - this.getCouponReduceCash();
    }

    calcRealPay(){
      let realPay = this.sellPrice - this.getCouponReduceCash() - this.getMaxCanUseBalance();
      return realPay < 0 ? 0 : realPay;
    }
}