import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Constant } from '../../../constant';
import { Finance, QueryFinance } from '../finance';
import { FinanceService } from '../finance.service';
import { AuthorityManagement } from '../../../common/authorityManagement/authorityManagement';
@Component({
  selector: 'app-deduct',
  templateUrl: './deduct.component.html',
  styleUrls: ['./deduct.component.css'],
  providers: [AuthorityManagement]
})
export class DeductComponent implements OnInit {
  stateEnum = [-1, 0, 1, 2];
  customs: Finance[];
  newCustom: boolean;
  rowsOption: number;
  totalNum: number;
  status: string;
  createTimeSearch: number;
  retailerNameOrTel: string;
  queryOptions: QueryFinance;
  updateOption: Object;
  tableLoading: boolean = true;
  @ViewChild('paginator')
  paginator;
  @ViewChild('dialogRemit')
  dialogRemit;
  // 页面操作权限
  operations: Array<any> = [];

  constructor(
    private financeService: FinanceService,
    private authorityManagement: AuthorityManagement
  ) { }
  ngOnInit(): void {
    //初始化查询条件
    this.status = '-1';
    this.queryOptions = {};
    this.getFinance();
    // 初始化操作按钮权限
    this.getOperateAuthority();
  }
  /**
  * 操作权限数组
  * 
  * @memberof UserComponent
  */
  getOperateAuthority() {
    const operationArr = this.authorityManagement.getOperationAuthority('/financialmanager/deduct');

    operationArr.map(item => {
      // console.log(item.actionCode)
      this.operations.push(item.actionCode)
    })
    console.log(this.operations)
  }

  /**
   * 日期控件监听事件
   * @param {any} obj
   * @memberof DeductComponent
   */
  onChangeDate(obj): void {
    this.createTimeSearch = obj.getTime ? obj.getTime() : null;
  }
  /**
   * 条件查询事件
   * @memberof DeductComponent
   */
  onSubmit(): void {
    this.queryOptions = {
      status: this.status,
      createTimeSearch: this.createTimeSearch,
      retailerNameOrTel: this.retailerNameOrTel
    };
    this.paginator.changePageToFirst();
  }
  /**
   * 查询提成管理列表
   * @memberof DeductComponent
   */
  getFinance(): void {
    this.queryOptions.page = this.paginator.getPage() || 0;
    this.queryOptions.size = this.paginator._rows || 10;
    this.tableLoading = true;
    this.financeService.getFinance(this.queryOptions)
      .subscribe(
      resp => {
        this.tableLoading = false;
        this.customs = resp.content;
        this.rowsOption = resp.size;
        this.totalNum = resp.totalElements;
      }
      );
  }
  /**
   * 确认打款
   * @memberof DeductComponent
   */
  confirm(): void {
    this.financeService.updateFinance(this.updateOption)
      .subscribe(
      resp => {
        this.getFinance();
        this.dialogRemit.hide();
      }
      );
  }

  /**
   * 弹出打款弹窗
   * @param {any} data 选择的打款列信息
   * @memberof DeductComponent
   */
  remit(data, type): void {
    this.updateOption = {
      id: data.id,
      status: type
    };
    const options = {
      type: 'message',
      title: '确认打款',
      content: '是否确认打款？',
      buttonRequired: true,
      buttonInfo: [{
        name: '确认',
        event: this.confirm.bind(this)
      }, {
        name: '取消',
        event: null
      }]
    };
    if (type === '1') {
      options.title = '确认审核';
      options.content = '是否确认审核通过？';
    }
    this.dialogRemit.show(options);
  }
}


