import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { CustomcComponent } from './customc/customc.component';
import { CustombComponent } from './customb/customb.component';
import { CustomService } from './custom.service';
import { JVectorMapModule } from '../../components/map/jvectorMap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { I18nInterface } from '../../common/i18n/app.i18n.service';
import { DatePickerModule } from 'ng2-datepicker';
import { AccordionModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ButtonModule } from 'primeng/primeng';
import { CrudCustomComponent } from './crud-custom/crud-custom.component';
import { DemartDialogModule } from '../../components/common/dialog/dialog.module';
import { PaginatorModule } from 'primeng/primeng';
import { DHttpService } from '../../common/http/dhttp.service';
import { AuthorityManagement } from '../../common/authorityManagement/authorityManagement';
@NgModule({
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    Ng2Bs3ModalModule,
    CommonModule,
    DataTableModule,
    SharedModule,
    BrowserModule,
    JVectorMapModule,
    FormsModule,
    PaginationModule.forRoot(),
    TranslateModule.forRoot(),
    DatePickerModule,
    InputTextModule,
    ConfirmDialogModule,
    GrowlModule,
    DialogModule,
    ButtonModule,
    DemartDialogModule,
    PaginatorModule],

  declarations: [
    CustomcComponent,
    CustombComponent,
    CrudCustomComponent
  ],

  exports: [
    CustombComponent,
    CustomcComponent,
    CrudCustomComponent
  ],
  providers: [AuthorityManagement]
})
export class CustomermanagerModule { }
