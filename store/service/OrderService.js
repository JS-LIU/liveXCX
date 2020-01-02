/**
 * Created by Liudq on 2019-07-29
 */

import {
  commonAjax
} from "../config/config";
import {
  TimeManager
} from "../entity/TimeManager";
import {
  userService
} from "./UserService";
import {
  Order
} from "../entity/Order";
import {
  OrderProduct
} from "../entity/OrderProduct";
import {
  Pagination
} from "../entity/Pagination";
import {
  SearchOrderStatus
} from "../entity/SearchOrderStatus";
import {
  SettleManager
} from "../entity/SettleManager";

class OrderService {
  constructor() {
    let orderAjax = commonAjax.resource('/order/w/v1.0/:action');
    let miniOrderAjax = commonAjax.resource('/order/x/v1.0/:action');
    this.orderList = [];
    this._preOrder = function(postInfo) {
      return miniOrderAjax.save({
        action: "preOrder"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      })
    };
    this._rePay = function(postInfo) {
      return miniOrderAjax.save({
        action: "payment"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      })
    }
    this._orderDetail = function(postInfo) {
      return miniOrderAjax.save({
        action: "orderDetail"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      })
    }
    this._takeOrder = function(postInfo) {
      return miniOrderAjax.save({
        action: "takeOrder"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      })
    }
    this._createOrder = function(postInfo) {
      return orderAjax.save({
        action: 'createOrder'
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      });
    };
    this._reCreateOrder = function(postInfo) {
      return orderAjax.save({
        action: "paymentOrder"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      });
    };
    this._cancelOrder = function(postInfo) {
      return miniOrderAjax.save({
        action: "cancelOrder"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      });
    };
    this._queryOrderStatus = function(postInfo) {
      return orderAjax.save({
        action: "queryOrderStatus"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      });
    };
    this._getOrderList = function(postInfo) {
      return orderAjax.save({
        action: "pageOrder"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      });
    };
    this._queryOrderDetail = function(postInfo) {
      return orderAjax.save({
        action: "queryOrderDetail"
      }, postInfo, {
        name: "token",
        value: userService.getUser().token
      });
    };
    this.searchOrderStatus = new SearchOrderStatus();
    this.order = null;
    this.orderProduct = null;
    this.pagination = new Pagination(1, 10);
    this.settleManager = null;
  }
  rePay(orderNo) {
    return this._rePay({
      orderNo: orderNo
    })
  }
  preOrder(preOrderAction, goodNo, orderNo) {
    console.log(goodNo, orderNo);
    return this.preOrderStrategy()[preOrderAction].call(this, goodNo, orderNo)
  }
  preOrderStrategy(goodNo, orderNo) {
    console.log("sty", goodNo, orderNo);
    return {
      "orderDetail": (goodNo, orderNo) => {
        return this._orderDetail({
          orderNo: orderNo
        }).then((data) => {
          return this.createPreOrderInfo(data);
        })
      },
      "preOrder": (goodNo, orderNo) => {
        return this._preOrder({
          goodNo: goodNo
        }).then((data) => {
          return this.createPreOrderInfo(data);
        })
      }
    }
  }
  createPreOrderInfo(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      if(data.code!=0){
        reject(data);
      }else{
        this.settleManager = new SettleManager(data.data.sellPrice, data.data.couponList, data.data.account);
        this.order = new Order(data.data);

        resolve({
          settleManager: this.settleManager,
          order: this.order,
        });
      }
    })
  }

  takeOrder() {
    let userCoupons = this.settleManager.couponManager.getUseCouponAccountCouponNoList();
    return this._takeOrder({
      orderNo: this.order.orderNo,
      account: this.settleManager.account.getAllowDeltaMax(),
      userCoupons: userCoupons,
      salePrice: this.settleManager.calcRealPay()
    })
  }
  toggleSelectCoupon(accountCouponNo) {
    this.settleManager.couponManager.toggleSelectCoupon(accountCouponNo, this.settleManager.sellPrice);
    return new Promise((resolve, reject) => {
      resolve(this.settleManager)
    })
  }
  toggleUseBalance() {
    this.settleManager.account.toggleUseBalance();
    return new Promise((resolve, reject) => {
      resolve(this.settleManager)
    })
  }
  createOrder(productCourse) {
    return this._createOrder({
      goodNo: productCourse.goodNo,
      salePrice: productCourse.salePrice
    }).then((data) => {
      return new Promise((resolve, reject) => {
        if (parseInt(data.code) === 0) {
          this.createOrderProduct(productCourse);
          this.order = new Order(data.data);
          resolve({
            order: this.order,
            payModels: data.data.payModels
          })
        } else {
          reject(data.message);
        }
      });
    })
  }

  reCreateOrder(orderInfo) {
    return this._reCreateOrder({
      orderNo: orderInfo.orderNo
    }).then((data) => {
      return new Promise((resolve, reject) => {
        if (parseInt(data.code) === 0) {
          this.createOrderProduct(orderInfo.orderProduct);
          this.order = new Order(Object.assign(data.data, orderInfo.orderProduct));
          resolve({
            order: this.order,
            payModels: data.data.payModels
          })
        } else {
          reject(data.message);
        }
      });

    })
  }
  /**
   * 创建订单商品
   */
  createOrderProduct(productCourse) {
    console.log(productCourse);
    this.orderProduct = new OrderProduct(productCourse);
    return this.orderProduct;
  }
  getOrderProduct() {
    return this.orderProduct;
  }
  getOrder() {
    return this.order;
  }

  /**
   * 查询订单状态
   * @param currentTimeStampBySec
   * @param success
   * @param fail
   */
  queryOrderStatus(currentTimeStampBySec, success, fail) {
    let queryStep = this.order.frequentlyStep;
    let boundOfFrequently = this.order.getBoundOfFrequently(currentTimeStampBySec);
    this.queryTiming(queryStep, currentTimeStampBySec, boundOfFrequently, success, fail);

  }
  stopQueryOrderStatus() {
    clearInterval(this.timing);
  }
  /**
   * 查询定时器
   * @param queryStep
   * @param currentTimeStampBySec
   * @param boundOfFrequently
   * @param success
   * @param fail
   */
  queryTiming(queryStep, currentTimeStampBySec, boundOfFrequently, success, fail) {

    this.timing = setInterval(() => {
      queryStep = this.getQueryStep(currentTimeStampBySec, boundOfFrequently, queryStep);
      this._queryOrderStatus({
        orderNo: this.order.orderNo
      }).then((data) => {
        currentTimeStampBySec = TimeManager.currentTimeStampBySec();
        if (this.order.getOrderStatus(data.data.orderStatus) === "已支付") {
          success(data.data.orderStatus);
        }
        if (this.order.getOrderStatus(data.data.orderStatus) === "已取消" || this.order.getOrderStatus(data.data.orderStatus) === "已过期") {
          fail(data.data.orderStatus)
        }
      });
    }, queryStep * 1000)
  }

  /**
   * 定时器频率
   * @param currentTimeStampBySec
   * @param boundOfFrequently
   * @param queryStep
   * @returns {number}
   */
  getQueryStep(currentTimeStampBySec, boundOfFrequently, queryStep) {
    if (currentTimeStampBySec > boundOfFrequently && queryStep !== this.order.lazyStep) {
      queryStep = this.order.lazyStep;
      this.stopQueryOrderStatus();
      this.queryTiming(queryStep, TimeManager.currentTimeStampBySec(), boundOfFrequently);
    }
    if (this.order.isOverDue(TimeManager.currentTimeStampBySec())) {
      this.stopQueryOrderStatus();
    }
    return queryStep;
  }
  //  剩余过期时间
  getRemainTime(currentTimeStampBySec) {
    return this.order.getRemainTime();
  }

  /**
   * 按条件查询订单列表
   * @returns {*}
   */
  getOrderList() {
    return this._getOrderList({
      orderStatus: this.searchOrderStatus.getCurrentSearchOrderStatus().status,
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.size
    }).then((data) => {
      return new Promise((resolve, reject) => {
        if (data.data && data.data.list) {
          this.createOrderList(data.data.list);
          this.pagination.setTotalSize(data.data.total);

          resolve(this.orderList);
        } else {
          resolve(this.orderList)
        }
      });
    })
  }

  /**
   * 创建订单列表
   * @param orderList
   * @returns {undefined}
   */
  createOrderList(orderList) {
    let list = [];
    for (let i = 0; i < orderList.length; i++) {
      list.push(new Order(orderList[i]));
    }
    if (this.pagination.pageNum === 1) {
      this.orderList = list;
    } else {
      this.orderList = this.orderList.concat(list)
    }
    return this.orderList;
  }

  queryOrderDetail(orderNo) {
    return this._queryOrderDetail({
      orderNo: orderNo
    }).then((data) => {
      let order = this.findOrderByOrderNo(orderNo);
      order.setDetail(data.data);
      return new Promise((resolve, reject) => {
        resolve(order);
      })
    });
  }
  findOrderByOrderNo(orderNo) {
    return this.orderList.find((orderItem, index) => {
      return orderItem.orderNo === orderNo
    })
  }
  cancelOrder(orderNo) {
    return this._cancelOrder({
      orderNo: orderNo
    }).then((data) => {
      return new Promise((resolve, reject) => {
        if (data.code === 0) {
          resolve(data.data);
        } else {
          reject(data.message);
        }
      })

    })
  }

}
export let orderService = new OrderService();