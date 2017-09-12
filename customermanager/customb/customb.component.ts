import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
  DoCheck
} from '@angular/core';
import {
  CustomService
} from '../custom.service';
import { Retailer, QueryRetailer } from '../custom';
import {
  Router
} from '@angular/router';
import {
  Http
} from '@angular/http';
import { Constant, RetailerStatus, AddressKy } from '../../../constant';
import { Message } from 'primeng/primeng';
import { Deposit } from '../../financialmanager/finance';
import { AuthorityManagement } from '../../../common/authorityManagement/authorityManagement';
@Component({
  selector: 'app-customb',
  templateUrl: './customb.component.html',
  styleUrls: ['./customb.component.less'],
  providers: [CustomService, AuthorityManagement]
})
export class CustombComponent implements OnInit {
  retailer = <Retailer>{};
  retailers: Retailer;
  @ViewChild('crudModal')
  crud;
  @ViewChild('paginator')
  paginator;
  animation = true;
  keyboard = true;
  css = false;
  nameOrMobile: string;
  pageNumber: number;
  sizeNumber: number;
  totalNum: number;
  rowsOption: number;
  mobile: number;
  selectedRetailer;
  retailerID;
  nameVerifyMessage: boolean = false;
  idVerifyMessage: boolean = false;
  carVerifyMessage: boolean = false;
  emailVerifyMessage: boolean = false;
  mobileVerifyMessage: boolean = false;
  queryRetailer: QueryRetailer;
  // 页面操作权限
  operations: Array<any> = [];
  private statusEnum;
  private neweditRetailer = RetailerStatus;
  constructor(
    private CustomService: CustomService,
    private authorityManagement: AuthorityManagement
  ) {
    this.statusEnum = Constant.RetailerStatusEnum;
  }

  ngOnInit() {
    this.nameOrMobile = '';
    this.queryRetailer = {};
    this.getAllRetailers();
    // 初始化操作按钮权限
    this.getOperateAuthority();
  }
  /**
     * 操作权限数组
     * 
     * @memberof UserComponent
     */
  getOperateAuthority() {
    const operationArr = this.authorityManagement.getOperationAuthority('/customermanager/customb');

    operationArr.map(item => {
      // console.log(item.actionCode)
      this.operations.push(item.actionCode)
    })
    console.log(this.operations)
  }
  /**
   * 获取所有数据和搜索数据
   * 
   * @private
   * @memberof CustomcComponent
   */
  getAllRetailers() {
    this.queryRetailer.page = this.paginator.getPage() || 0;
    this.queryRetailer.size = this.paginator._rows || 10;
    if (this.nameOrMobile === '') {
      this.CustomService.getAllRetailers(this.queryRetailer)
        .subscribe((response) => {
          this.retailers = response.data.list;
          this.totalNum = response.data.totalElements;
          this.rowsOption = response.data.size;
        });
    } else {
      this.CustomService.getRetailerByNameOrMobile(this.queryRetailer)
        .subscribe((response) => {
          this.retailers = response.data.list;
          this.totalNum = response.data.totalElements;
          this.rowsOption = response.data.size;
        });
    }
  }


  /**
   * 搜索触发分页事件
   * @private
   * @memberof CustomcComponent
   */
  onSearch() {
    this.queryRetailer = {
      nameOrMobile: this.nameOrMobile
    };
    this.paginator.changePageToFirst();
  }

  /**
   * 编辑用户信息
   * 
   * @private
   * @param {*} data  当前行用户信息
   * @memberof CustomcComponent
   */
  edit(data: any) {
    this.crud.retailer = JSON.parse(JSON.stringify(data));
    const options = {
      type: 'dialog',
      title: '编辑微商信息',
      width: 600,
      buttonRequired: true,
      buttonInfo: [{
        name: '保存',
        event: this.editSave.bind(this)
      },
      {
        name: '取消',
        event: this.cancel.bind(this)
      }]
    };
    this.crud.editRetailer.show(options);
  }


  /**
   * 新增微商信息
   * 
   * @private
   * @memberof CustombComponent
   */
  addRetailer() {
    const options = {
      type: 'dialog',
      title: '新增微商信息',
      width: 600,
      buttonRequired: true,
      buttonInfo: [{
        name: '保存',
        event: this.addSave.bind(this)
      },
      {
        name: '取消',
        event: this.cancel.bind(this)
      }]
    };
    this.crud.addRetailer.show(options);
    this.crud.addRetailer.disabledBtn();
    this.crud.retailer = <Deposit>{};
    this.crud.retailer.city = '';
    this.crud.retailer.state = '';
    this.crud.mobile = '';
    this.crud.validateMobile = 0;
    this.crud.validateCardnum = 0;
    this.crud.validateEmail = 0;
  }
  /**
   * 保存用户修改后的信息并刷新页面
   * 
   * @private
   * @memberof CustomcComponent
   */
  editSave() {
    this.CustomService.ModifyRetailer(this.crud.retailer)
      .subscribe(res => {
        if (res.code === 0) {
          this.crud.editRetailer.hide();
          this.crud.retailer = <Retailer>{};
          this.getAllRetailers();
        }
      });
  }
  addSave() {
    const mobileNum = this.crud.mobile.split('');
    const newMobile = mobileNum.slice(1).join('');
    if (mobileNum.indexOf('+') === -1) {
      this.crud.retailer.mobile = '254' + mobileNum.join('');
    } else {
      this.crud.retailer.mobile = '86' + newMobile;
    }
    console.log(this.crud.newMobile);
    this.CustomService.CreateRetailer(this.crud.retailer)
      .subscribe(res => {
        if (res.code === 0) {
          this.crud.addRetailer.hide();
          this.getAllRetailers();
          this.crud.retailer = <Retailer>{};
        } else if (res.code === 101) {
          this.crud.showRepeat();
        }
      });
  }
  /**
   * 
   * 取消新增微商
   * @private
   * @memberof CustombComponent
   */
  cancel() {
    this.crud.addRetailer.hide();
    this.crud.editRetailer.hide();
    this.crud.retailer = <Retailer>{};
  }

  /**
   * 打开确认冻结弹窗，并把用户id复制过来
   * 
   * @param {any} data 用户id 
   * @memberof CustombComponent
   */
  freeze(data) {
    this.retailerID = { retailerID: data };
    const options = {
      type: 'message',
      width: 600,
      content: '是否确认冻结该用户？',
      buttonRequired: true,
      buttonInfo: [{
        name: 'YES',
        event: this.frozeConfirm.bind(this)
      },
      {
        name: 'NO',
        event: this.crud.frozen.hide()
      }]
    };
    this.crud.frozen.show(options);
  }

  /**
 * 打开确认解冻弹窗，并把用户id复制过来
 * 
 * @param {any} data 用户id 
 * @memberof CustombComponent
 */
  unfreeze(data) {
    this.retailerID = { retailerID: data };
    const options = {
      type: 'message',
      width: 600,
      content: '是否确认解冻该用户？',
      buttonRequired: true,
      buttonInfo: [{
        name: 'YES',
        event: this.unfrozeConfirm.bind(this)
      },
      {
        name: 'NO',
        event: this.crud.unfrozen.hide()
      }]
    };
    this.crud.unfrozen.show(options);
  }
  /**
   * 确认冻结用户
   * 
   * @memberof CustombComponent
   */
  frozeConfirm() {
    this.CustomService.freezeRetailer(this.retailerID)
      .subscribe(res => {
        if (res.code === 0) {
          this.crud.frozen.hide();
          this.getAllRetailers();
        }
      });
  }
  /**
   * 确认解冻用户
   * 
   * @memberof CustombComponent
   */
  unfrozeConfirm() {
    this.CustomService.unFreezeRetailer(this.retailerID)
      .subscribe(res => {
        if (res.code === 0) {
          this.crud.unfrozen.hide();
          this.getAllRetailers();
        }
      });
  }

  check() {


  }
}
