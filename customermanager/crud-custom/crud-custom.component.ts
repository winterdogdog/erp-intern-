import {
  Component, OnInit, Input, Output,
  EventEmitter, ViewChild, ViewEncapsulation, DoCheck, ChangeDetectorRef
} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CustomService } from '../custom.service';
import { Custom, Retailer } from '../custom';
import { Http } from '@angular/http';
import { Constant, RetailerStatus, AddressKy } from '../../../constant';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'app-crud-custom',
  templateUrl: './crud-custom.component.html',
  styleUrls: ['./crud-custom.component.less']
})
export class CrudCustomComponent implements OnInit {
  status = [0, 1, 2, 3];
  @ViewChild('addModal')
  addRetailer;
  @ViewChild('editCustomerModal')
  edit;
  @ViewChild('editRetailerModal')
  editRetailer;
  @ViewChild('freezeModal')
  frozen;
  @ViewChild('unfreezeModal')
  unfrozen;
  animation = true;
  keyboard = true;
  backdrop: string | boolean = true;
  css = false;
  addressky;
  secondAddress;
  custom = <Custom>{};
  retailer = <Retailer>{};
  statusEnum = Constant.RetailerStatusEnum;
  neweditRetailer = RetailerStatus;
  retailerForm: FormGroup;
  nameVerifyMessage: boolean = false;
  idVerifyMessage: boolean = false;
  carVerifyMessage: boolean = false;
  emailVerifyMessage: boolean = false;
  mobileVerifyMessage: boolean = false;
  address = AddressKy;
  validateMobile:number = 0;
  validateCardnum:number = 0;
  validateEmail: number = 0;
  msgs: Message[] = [];
  mobile: string;
  constructor() {
    this.addressky = AddressKy;
    this.secondAddress = this.addressky.address[0].children;
  }
  ngOnInit() {
  }

  /**
   * 选择一级地址改变二级地址的可选项
   * 
   * @param {any} data 用户选择的一级地址
   * @memberof CrudCustomComponent
   */
  updateSecondAddress(data) {
    for (let i in this.addressky.address) {
      if (this.addressky.address[i].name === data) {
        this.secondAddress = this.addressky.address[i].children;
      }
    }
  }

  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: '请正确输入信息' });
  }
  showRepeat() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: '该用户已存在' });
  }
  /**
   * 添加微商信息表单校验
   * 
   * @memberof CrudCustomComponent
   */
  check() {
    if (!/^[+]?\d{5,18}$/.test(this.mobile) && this.mobile !== '') {
      this.showError();
      this.mobileVerifyMessage = true;
      this.validateMobile = 2;
    } else {
      this.mobileVerifyMessage = false;
      this.validateMobile = 0;
    }
    if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.retailer.email) && this.retailer.email !== undefined) {
      this.showError();
      this.validateEmail = 2;
    }else{
      this.validateEmail = 0;}
    if (!/\d{5,18}/.test(this.retailer.cardNumber) && this.retailer.cardNumber !== undefined) {
      this.showError();
      this.validateCardnum = 2;
    }else{
      this.validateCardnum = 0;
    }

    // (this.idVerifyMessage === false &&
    //   this.carVerifyMessage === false &&
    //   this.idVerifyMessage === false &&
    //   this.emailVerifyMessage === false &&
    //   this.mobileVerifyMessage === false &&
    //   this.retailer.cardNumber !== undefined &&
    //   this.retailer.carNo !== undefined &&
    //   this.retailer.retailerName !== undefined &&
    //   this.retailer.email !== undefined &&
    if (this.mobile !== '' && this.mobileVerifyMessage === false) {
      this.addRetailer.enabledBtn();
    } else {
      this.addRetailer.disabledBtn();
    }

  }
}
