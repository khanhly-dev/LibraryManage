import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PayComponent } from './pay/pay.component';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateOrUpdateCustomerComponent } from './customer/create-or-update-customer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomComponentModule } from '../custom-component/custom-component.module';

// ant design
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateOrUpdateBillComponent } from './bill/create-or-update-bill.component';
import { BillDetailComponent } from './bill/bill-detail.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';


@NgModule({
  declarations: [
    PayComponent,
    BillComponent,
    CustomerComponent,
    CreateOrUpdateCustomerComponent,
    CreateOrUpdateBillComponent,
    BillDetailComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomComponentModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzCardModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzCollapseModule
  ]
})
export class PaymentModule { }
