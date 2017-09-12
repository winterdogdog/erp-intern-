import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { CustomService } from '../custom.service';
import { Custom, QueryCustom } from '../custom';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustombComponent } from '../customb/customb.component';
import { DHttpService } from '../../../common/http/dhttp.service';
import { AddressKy } from '../../../constant';
import { Message } from 'primeng/primeng';
import { AuthorityManagement } from '../../../common/authorityManagement/authorityManagement';
@Component({
  selector: 'app-customc',
  templateUrl: './customc.component.html',
  styleUrls: ['./customc.component.less'],
  providers: [CustomService, DHttpService, AuthorityManagement]
})

export class CustomcComponent implements OnInit {

  customs: Custom[];
  custom = <Custom>{};
  selectedCustom: Custom;
  index: number;
  pageNumber: number;
  sizeNumber: number;
  totalNum: number;
  rowsOption: number;
  code: string;
  @ViewChild('crudModal')
  crud;
  @ViewChild('paginator')
  paginator;
  RetailerName: string;
  NameOrMobile: string;
  queryCustom: QueryCustom;

  // 页面操作权限
  operations: Array<any> = [];

  constructor(
    private CustomService: CustomService,
    private authorityManagement: AuthorityManagement
  ) {
  }

  ngOnInit() {
    this.NameOrMobile = '';
    this.RetailerName = '';
    this.queryCustom = {};
    this.getAllCustoms();
    // 初始化操作按钮权限
    this.getOperateAuthority();
  }
  /**
    * 操作权限数组
    * 
    * @memberof UserComponent
    */
  getOperateAuthority() {
    const operationArr = this.authorityManagement.getOperationAuthority('/customermanager/customc');

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
  getAllCustoms() {
    this.queryCustom.page = this.paginator.getPage() || 0;
    this.queryCustom.size = this.paginator._rows || 10;
    if (this.NameOrMobile === '' && this.RetailerName === '') {
      this.CustomService.getAllCustoms(this.queryCustom)
        .subscribe((response) => {
          this.customs = response.data.content;
          this.totalNum = response.data.totalElements;
          this.rowsOption = response.data.size;
        });
    } else {
      this.CustomService.getCustomByNameOrId(this.queryCustom)
        .subscribe((response) => {
          this.customs = response.data.content;
          this.totalNum = response.data.totalElements;
          this.rowsOption = response.data.size;
        });
    }
  }


  /**
   * 搜索触发分页事件
   * 
   * @private
   * @memberof CustomcComponent
   */
  onSearch() {
    this.queryCustom = {
      nameOrMobile: this.NameOrMobile,
      retailerName: this.RetailerName
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
    this.crud.custom = JSON.parse(JSON.stringify(data));
    const options = {
      type: 'dialog',
      title: '编辑用户信息',
      width: 600,
      buttonRequired: true,
      buttonInfo: [{
        name: '保存',
        event: this.save.bind(this)
      },
      {
        name: '取消',
        event: this.crud.edit.hide()
      }]
    };
    this.crud.edit.show(options);
  }

  /**
   * 保存用户修改后的信息
   * 
   * @private
   * @memberof CustomcComponent
   */
  save() {
    this.CustomService.ModifyCustomer(this.crud.custom)
      .subscribe(res => {
        if (res.code === 0) {
          this.crud.edit.hide();
          this.getAllCustoms();
        }
      });
  }


}







