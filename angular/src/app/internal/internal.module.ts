import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalRoutingModule } from './internal-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { OfficeComponent } from './office/office.component';

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
import { CreateOrUpdateOfficeComponent } from './office/create-or-update-office.component';
import { CreateOrUpdateEmployeeComponent } from './employee/create-or-update-employee.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    OfficeComponent,
    CreateOrUpdateOfficeComponent,
    CreateOrUpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    InternalRoutingModule,
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
    NzInputNumberModule
  ]
})
export class InternalModule { }
