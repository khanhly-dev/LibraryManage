import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'book', component : BookComponent,
    //data : {permission : 'Pages.Admin.Base.Product'},
    //canActivate: [AppRouteGuard]
  },
  {
    path: 'category', component : CategoryComponent,
    //data : {permission : 'Pages.Admin.Base.Product'},
    //canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductRoutingModule { }
