import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductRoutingModule } from './list-product-routing.module';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';
import { CreateOrUpdateCategoryComponent } from './category/create-or-update-category.component';
import { CreateOrUpdateBookComponent } from './book/create-or-update-book.component';

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


@NgModule({
  declarations: [
    BookComponent,
    CategoryComponent,
    CreateOrUpdateBookComponent,
    CreateOrUpdateCategoryComponent
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
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
export class ListProductModule { }
