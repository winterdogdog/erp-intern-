import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { FinanceService } from '../finance.service';
@Component({
    moduleId: module.id,
    selector: 'print',
    templateUrl: 'print.component.html',
    styleUrls: ['print.component.less']
})
export class PrintComponent implements OnInit {
    date;
    receipNo;
    accountNum;
    retailerName;
    depositAmount;
    staffNum;
    staffName;
    creditBalance;
    creditLine;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private financeService: FinanceService,
        private ref: ChangeDetectorRef
    ) {

    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.getRetailerById(id);
        if (localStorage.getItem('user')) {
            const userDetail = JSON.parse(localStorage.getItem('user'));
            this.staffName = userDetail.userName;
            this.staffNum = userDetail.employeeNo;
        }
    }
    getRetailerById(num) {
        this.financeService.getRetailerById(num)
            .subscribe((res) => {
                this.date = res.createTime;
                this.accountNum = res.mobile;
                this.depositAmount = res.amount;
                this.retailerName = res.retailerName;
                this.receipNo = res.orderNumber;
                this.creditBalance = res.creditBalance;
                this.creditLine = res.creditLine;
                this.ref.detectChanges();
                setTimeout(() => {
                    window.print();
                }, 1000);
            });
    }

}
