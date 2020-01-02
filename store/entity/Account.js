/**
 * Created by Liudq on 2019/9/11
 */
export class Account {
    constructor(balance){
        this.balance = balance;
        this.useBalance = true;
    }

    /**
     * 出账
     * @param predictDelta  想要出账金额
     * @returns {*}
     */
    outcome(predictDelta){
        let allowDelta = this.getAllowDeltaMax(predictDelta);

        return this.balance -= allowDelta;
    }
    getAllowDeltaMax(predictDelta){
        if(this.useBalance ){
            return this.balance >= predictDelta ? predictDelta:this.balance;
        }
        return 0;
    }
    toggleUseBalance(){
        this.useBalance = !this.useBalance;
    }
}