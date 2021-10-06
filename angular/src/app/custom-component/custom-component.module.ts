import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CusSelectComponent } from './cus-select/cus-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CusSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule
  ],
  exports:[
    CusSelectComponent
  ]
})
export class CustomComponentModule { }
