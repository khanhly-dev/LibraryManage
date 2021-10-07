import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  {
    path: 'pay', component: PayComponent,
    data: { permission: 'Pages.BookInBill' },
    canActivate: [AppRouteGuard]
  },
  {
    path: 'bill', component: BillComponent,
    data: { permission: 'Pages.Bill' },
    canActivate: [AppRouteGuard]
  },
  {
    path: 'customer', component: CustomerComponent,
    data: { permission: 'Pages.Customer' },
    canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
