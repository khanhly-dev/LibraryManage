import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { OfficeComponent } from './office/office.component';

const routes: Routes = [
  {
    path: 'employee', component : EmployeeComponent,
    //data : {permission : 'Pages.Admin.Base.Product'},
    //canActivate: [AppRouteGuard]
  },
  {
    path: 'office', component : OfficeComponent,
    //data : {permission : 'Pages.Admin.Base.Product'},
    //canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
