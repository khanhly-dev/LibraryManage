import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { EmployeeComponent } from './employee/employee.component';
import { OfficeComponent } from './office/office.component';

const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponent,
    data: { permission: 'Pages.Employee' },
    canActivate: [AppRouteGuard]
  },
  {
    path: 'office', component: OfficeComponent,
    data: { permission: 'Pages.Office' },
    canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
