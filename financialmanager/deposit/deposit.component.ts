import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { PaginatorModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { SelectItem } from '../../../../../node_modules/primeng/components/common/api';
import { Finances, Deposit } from '../finance';
import { FinanceService } from '../finance.service';
import { DatePickerOptions } from 'ng2-datepicker';
import { AuthorityManagement } from '../../../common/authorityManagement/authorityManagement';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
  providers: [AuthorityManagement]
})
export class DepositComponent implements OnInit {

  customs: Finances[];
  custom = <Deposit>{};
  selectedCustom;
  index: number;
  names: SelectItem[];
  newCustom: boolean;
  pageNumber: number;
  sizeNumber: number;
  NameOrMobile: string;
  totalNum: number;
  rowsOption: number;
  confirmStatus: boolean = true;
  @ViewChild('collectModal')
  collectModal;
  @ViewChild('returnModal')
  returnModal;
  @ViewChild('paginator')
  paginator;
  cssClass = '';
  animation = true;
  keyboard = true;
  backdrop: string | boolean = true;
  css = false;
  state: boolean = false;
  msgs: Message[] = [];
  // 页面操作权限
  operations: Array<any> = [];
  constructor(
    private financeService: FinanceService,
    private http: Http,
    private router: Router,
    private authorityManagement: AuthorityManagement
  ) { }

  ngOnInit() {
    this.NameOrMobile = '';
    this.getAllRetailer();
    // 初始化操作按钮权限
    this.getOperateAuthority();
  }
  /**
     * 操作权限数组
     * 
     * @memberof UserComponent
     */
  getOperateAuthority() {
    const operationArr = this.authorityManagement.getOperationAuthority('/financialmanager/deposit');

    operationArr.map(item => {
      // console.log(item.actionCode)
      this.operations.push(item.actionCode)
    })
    console.log(this.operations)
  }

  show() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: '请输入正确的手机号码哦！' });
  }
  showNo() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: '该手机号码不存在哦！' });
  }
  serialNumError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: '流水号不存在或已经被使用！' });
  }
  moneyError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: '金额与流水号不符！' });
  }
  showAlert() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Alert Message', detail: '您输入的信息有误哦！' });
  }
  showMessage() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Alert Message', detail: '您的押金额度不够啦！' });
  }
  showRemind() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Remind Message', detail: '退还押金数字必须大于0哦！' });
  }
  /**
   * 校验手机号，鼠标失焦获取数据
   * 
   * @param {any} data 输入框输入的手机号
   * @memberof DepositComponent
   */
  check(data = '') {
    switch (data.substring(0, 1)) {
      case '0':
        data = '254' + data.substring(1, data.length);
        break;
      case '+':
        data = '86' + data.substring(1, data.length);
        break;
      default:
        break;
    }
    const params = {
      mobile: data
    };
    const len = data.length;
    if (!/^\d{1,18}$/.test(data) || len < 6 || len > 18) {
      this.show();
      this.custom = <Deposit>{};
    } else {
      this.financeService.getRetailerByMobile(params)
        .subscribe((response) => {
          if (response.data.length !== 0) {
            this.custom.retailerName = response.data[0].retailerName;
            this.custom.creditBalance = response.data[0].accountDetail.creditBalance;
            this.custom.depositAmount = response.data[0].accountDetail.depositAmount;
            this.custom.creditLine = response.data[0].accountDetail.creditLine;
            this.custom.retailerID = response.data[0].retailerId;
          } else {
            this.custom = this.custom = <Deposit>{};
            this.showNo();
          }
        }
        );
    }
  }
  reset() {
    this.custom = <Deposit>{};
    this.custom.code = '';
    this.state = false;
    this.collectModal.hide();
    this.returnModal.hide();
  }

  /**
   * 获取所有数据和查询数据
   * 
   * @private
   * @memberof DepositComponent
   */
  getAllRetailer() {
    const query = {
      page: this.paginator.getPage() || 0,
      size: this.paginator._rows || 10,
      nameOrMobile: this.NameOrMobile,
    };
    if (this.NameOrMobile === '') {
      this.financeService.getAllRetailer(query)
        .subscribe((response) => {
          this.customs = response.content;
          this.totalNum = response.totalElements;
          this.rowsOption = response.size;
        });
    } else {
      this.financeService.getSearchRetailer(query)
        .subscribe((response) => {
          this.customs = response.content;
          this.totalNum = response.totalElements;
          this.rowsOption = response.size;
        });
    }
  }

  /**搜索事件触发翻页事件
   * 
   * 
   * @memberof DepositComponent
   */
  onSearch() {
    this.paginator.changePageToFirst();
  }
  /**收取押金
   * 
   * 
   * @memberof DepositComponent
   */
  depositIncrease() {
    this.financeService.depositIncrease(this.custom)
      .subscribe((res) => {
        if (res.code === 0) {
          this.collectModal.hide();
          this.custom = <Deposit>{};
          this.state = false;
          this.getAllRetailer();
        } else {
          this.showAlert();
          this.state = false;
        }
      });

  }

  checkMoney() {
    if (this.custom.amount > 0) {
      this.returnModal.enabledBtn();
    } else {
      this.returnModal.disabledBtn();
      this.showRemind();
    }
  }

  /**退还押金
   * 
   * 
   * @memberof DepositComponent
   */
  depositReduce() {
    this.financeService.depositReduce(this.custom)
      .subscribe((res) => {
        switch (res.code) {
          case 0: this.returnModal.hide();
            this.custom = <Deposit>{};
            this.getAllRetailer();
            break;
          case 101: this.showNo();
            this.custom = <Deposit>{};
            break;
          case 102: this.showRemind();
            break;
          default: this.showMessage();
            break;
        }
      });
  }


  /**校验按钮
   * 
   * 
   * @memberof DepositComponent
   */
  checkout() {
    const newCode = {
      code: this.custom.code,
      amount: this.custom.amount
    };
    this.financeService.checkout(newCode)
      .subscribe((res) => {
        if (res.code === 0) {
          this.collectModal.enabledBtn();
          this.state = true;
        } else if (res.code === 101) {
          this.collectModal.disabledBtn();
          this.serialNumError();
        } else {
          this.collectModal.disabledBtn();
          this.moneyError();
        }
      });
  }



  /**
   * 打开收取押金弹窗
   * 
   * @memberof DepositComponent
   */
  collect() {
    const options = {
      type: 'dialog',
      title: '押金收取',
      width: 600,
      buttonRequired: true,
      buttonInfo: [{
        name: 'Yes',
        event: this.depositIncrease.bind(this)
      },
      {
        name: 'No',
        event: this.reset.bind(this)
      }]
    };
    this.collectModal.show(options);
    this.collectModal.disabledBtn();
    this.custom = <Deposit>{};
  }

  /**
   * 打开退还押金弹窗
   * 
   * @memberof DepositComponent
   */
  return() {
    const options = {
      type: 'dialog',
      title: '押金退还',
      width: 600,
      buttonRequired: true,
      buttonInfo: [{
        name: 'Yes',
        event: this.depositReduce.bind(this)
      },
      {
        name: 'No',
        event: this.reset.bind(this)
      }]
    };
    this.returnModal.show(options);
    this.returnModal.disabledBtn();
    this.custom = <Deposit>{};
  }

}





