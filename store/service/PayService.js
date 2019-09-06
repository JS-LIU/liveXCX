/**
 * Created by Liudq on 2019-07-30
 */
import {Pay} from "../entity/Pay";

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
}

export let payService = new PayService();
