export class CouponStatus {
  constructor() {
    this.couponStatus = [{
      name: "全部",
      status: "99",
      selected: true
    }, {
      name: "未使用",
      status: "1",
      selected: false
    }, {
      name: "已使用",
      status: "3",
      selected: false
    }, {
      name: "已超时",
      status: "4",
      selected: false
    }];
  }
  cutCouponStatus(status) {
    for (let i = 0; i < this.couponStatus.length; i++) {
      this.couponStatus[i].selected = false;
      if (parseInt(this.couponStatus[i].status) === parseInt(status)) {
        this.couponStatus[i].selected = true;
      }
    }
    return this.couponStatus;
  }
  getCouponStatusStatus() {
    return this.couponStatus;
  }
  getCurrentCouponStatus() {
    return this.couponStatus.find((couponItem, index) => {
      return couponItem.selected === true;
    });
  }
}