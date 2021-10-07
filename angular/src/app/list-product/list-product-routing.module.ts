import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'book', component: BookComponent,
    data: { permission: 'Pages.Book' },
    canActivate: [AppRouteGuard]
  },
  {
    path: 'category', component: CategoryComponent,
    data: { permission: 'Pages.Category' },
    canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductRoutingModule { }
