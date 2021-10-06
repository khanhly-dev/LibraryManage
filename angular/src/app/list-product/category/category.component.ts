import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrUpdateCategoryComponent } from './create-or-update-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent extends PagedListingComponentBase<CategoryDto> implements OnInit {
  listData: CategoryDto[] = [];
  keyword = '';
  constructor(
    injector: Injector,
    private _categoryService: CategoryServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll('');
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error('Method not implemented.');
  }

  getAll(keyword: string) {
    this._categoryService.getListCategory(keyword).subscribe(x => this.listData = x);
  }

  protected delete(book: CategoryDto): void {
    abp.message.confirm(
      this.l('Bạn muốn xóa cuốn sách "' + book.name + '"?'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryService.deleteCategory(book.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getAll('');
          });
        }
      }
    );
  }

  private showCreateOrEditUserDialog(dataEmit?: CategoryDto): void {
    let createOrEditDialog: BsModalRef;
    if (!dataEmit) {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateCategoryComponent,
        {
          class: 'modal-lg',
          initialState: {
            modalTitle: 'Thêm mới phân loại sách'
          },
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateCategoryComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: dataEmit,
            modalTitle: 'Chỉnh sửa phân loại sách ' + dataEmit.name
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.getAll('')
    });
  }

  createBook() {
    this.showCreateOrEditUserDialog();
  }

  editBook(book: CategoryDto) {
    this.showCreateOrEditUserDialog(book)
  }
}
