import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { FlotModule } from '../../components/charts/flotChart';
import { DeductComponent } from './deduct/deduct.component';
import { DepositComponent } from './deposit/deposit.component';
import { FinanceService } from './finance.service';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { I18nInterface } from '../../common/i18n/app.i18n.service';
import { AccordionModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { DHttpService } from '../../common/http/dhttp.service';
import { DemartDialogModule } from '../../components/common/dialog/dialog.module';
import { DeductStatusPipe } from './deductststus.pipe';
import { PrintComponent } from './print/print.component';
import { RouterModule } from '@angular/router';
import { AuthorityManagement } from '../../common/authorityManagement/authorityManagement';
@NgModule({
  imports:
  [
    RouterModule,
    PaginatorModule,
    CalendarModule,
    DropdownModule,
    CommonModule,
    DataTableModule,
    SharedModule,
    BrowserModule,
    FlotModule,
    IboxtoolsModule,
    PeityModule,
    SparklineModule,
    FormsModule,
    TranslateModule.forRoot(),
    InputTextModule,
    ConfirmDialogModule,
    GrowlModule,
    ButtonModule,
    DemartDialogModule],

  declarations:
  [DeductComponent,
    DepositComponent,
    DeductStatusPipe,
    PrintComponent],

  providers: [FinanceService, DHttpService, AuthorityManagement],

  exports:
  [DeductComponent,
    DepositComponent,
    PrintComponent]
})
export class FinancialmanagerModule { }
