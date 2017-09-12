
import { Injectable } from '@angular/core';
import { Custom,Retailer } from './custom';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../../constant';
import { DHttpService } from '../../common/http/dhttp.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomService {

    constructor(private _http: DHttpService) {}
    /**
     * 获取所有用户信息
     * 
     * @param {*} query  
     * @returns {Observable<any>} 
     * @memberof CustomService
     */
    getAllCustoms(query: any): Observable<any> {
        const url = Constant.serverIp + Constant.api.customc.getAllCustoms;
        const queryOption = 'page=' + query.page + '&size=' + query.size;
        return this._http.get(url, queryOption);
    }



    /**
     * 输入框失焦获取用户信息，返回页面
     * 
     * @param {*} query 
     * @returns {Observable<any>} 
     * @memberof CustomService
     */
    getCustomByNameOrId(query: any): Observable<any> {
        const url = Constant.serverIp + Constant.api.customc.queryCustom;
        const queryOption = this._http.joinUrlParams(query);
        return this._http.get(url, queryOption);
    }

    /**
     *用户信息编辑完毕保存
     * 
     * @param {any} params 更新的用户数据
     * @returns {Observable<any>} 
     * @memberof CustomService
     */
    ModifyCustomer(params): Observable<any> {
        const url = Constant.serverIp + Constant.api.customc.editCustom;
        return this._http.post(url, params);
    }


    getAllRetailers(query: any): Observable<any> {
        const url = Constant.serverIp + Constant.api.customb.getAllRetailers;
        const queryOption = 'page=' + query.page + '&size=' + query.size;
        return this._http.get(url, queryOption);
    }
    getRetailerByNameOrMobile(query: any): Observable<any> {
        const url = Constant.serverIp + Constant.api.customb.queryRetailer;
        const queryOption = this._http.joinUrlParams(query);
        return this._http.get(url, queryOption);
    }

    ModifyRetailer(params): Observable<any> {
        const url = Constant.serverIp + Constant.api.customb.editRetailer;
        return this._http.post(url, params);
    }
    CreateRetailer(params): Observable<any> {
        const url = Constant.serverIp + Constant.api.customb.CreateRetailer;
        return this._http.post(url, params);
    }
    freezeRetailer(params): Observable<any> {
        const url = Constant.serverIp + Constant.api.customb.freezeRetailer;
        return this._http.post(url, params);
    }
    unFreezeRetailer(params): Observable<any> {
        const url = Constant.serverIp + Constant.api.customb.unFreezeRetailer;
        return this._http.post(url, params);
    }

}



