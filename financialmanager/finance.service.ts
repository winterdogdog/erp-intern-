import { Injectable } from '@angular/core';
import { Constant } from '../../constant';
import { DHttpService } from '../../common/http/dhttp.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogModule } from 'primeng/primeng';


@Injectable()
export class FinanceService {
    public constant;
    private financeUrl: string;
    private updateFinanceUrl: string;
    constructor(private http: DHttpService) {
        this.constant = Constant;
        this.financeUrl = this.constant.serverIp + this.constant.api.finance.queryFinance;
        this.updateFinanceUrl = this.constant.serverIp + this.constant.api.finance.updateFinance;
        // this.financeUrl = './assets/data/finance.json';
    }
    /**
     * 提款单查询
     * @param query [object]
     * @return Withdraw [list]提款单分页以及条件查询结果
     */
    getFinance(query: any): Observable<any> {
        if (query.status === '-1') {
            delete query.status;
        }
        const params = this.http.joinUrlParams(query);
        return this.http.get(this.financeUrl, params)
            .map(this.extratData);
    }
    /**
     * 打款并且更新提款单状态
     * @param option [object] 待更新的提款单id以及更新后的状态
     * @return resp [json] 更新操作结果
     */
    updateFinance(option: any): Observable<any> {
        return this.http.post(this.updateFinanceUrl, option)
            .map(this.extratData);
    }
    private extratData(res) {
        return res.data || {};
    }


    /**
     * 押金table数据
     * 
     * @param {*} query 
     * @returns {Observable<any>} 
     * @memberof FinanceService
     */
    getAllRetailer(query: any): Observable<any> {
        const url = Constant.serverIp + Constant.api.deposit.getAllRetailer;
        const queryOption = 'page=' + query.page + '&size=' + query.size;
        return this.http.get(url, queryOption)
            .map(this.extratData);
    }

    /**弹窗电话号码栏失焦获取用户信息
     * 
     * 
     * @param {any} params 
     * @returns 
     * @memberof FinanceService
     */
    getRetailerByMobile(params) {
        const param = this.http.joinUrlParams(params);
        const url = Constant.serverIp + Constant.api.deposit.getRetailerByMobile;
        return this.http.get(url, param);
    }

    getRetailerById(param) {
        const url = Constant.serverIp + Constant.api.deposit.getRatailerById + param;
        return this.http.get(url).map(this.extratData);
    }

    /**
     * 获取搜索栏搜索数据
     * 
     * @param {any} params 
     * @returns 
     * @memberof FinanceService
     */
    getSearchRetailer(params) {
        const param = this.http.joinUrlParams(params);
        const url = Constant.serverIp + Constant.api.deposit.getRetailerByRetailerNameOrMobile;
        return this.http.get(url, param)
            .map(this.extratData);
    }

    /**
     * 收取押金
     * 
     * @param {any} params 
     * @returns 
     * @memberof FinanceService
     */
    depositIncrease(params) {
        const url = Constant.serverIp + Constant.api.deposit.increaseRetailerAccount;
        return this.http.post(url, params);
    }

    /**
     * 退还押金
     * 
     * @param {any} params 
     * @returns 
     * @memberof FinanceService
     */
    depositReduce(params) {
        const url = Constant.serverIp + Constant.api.deposit.reduceRetailerAccount;
        return this.http.post(url, params);
    }

    /** 校验
     * 
     * 
     * @param {any} params 
     * @returns 
     * @memberof FinanceService
     */
    checkout(params) {
        const url = Constant.serverIp + Constant.api.deposit.checkout;
        return this.http.post(url, params);
    }

}



