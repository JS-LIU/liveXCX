/**
 * Created by Liudq on 2019-07-30
 */
import {Pay} from "../entity/Pay";
import {WxPay} from '../entity/WxPay.js';
class PayService {
    constructor(){
        this.pay = null;
    }
    createPay(payModels){
        this.pay = new Pay(payModels);
    }
    getPay(){
        return this.pay;
    }
    wxPay(payModels){
      let wxPay = new WxPay(payModels);
      wxPay.pay();
    }
}

export let payService = new PayService();
