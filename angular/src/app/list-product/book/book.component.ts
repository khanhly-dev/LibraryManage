import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BookDto, BookServiceProxy } from '@shared/service-proxies/service-proxies';
import { extend } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateOrUpdateBookComponent } from './create-or-update-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent extends PagedListingComponentBase<BookDto> implements OnInit {
  listData: BookDto[] = [];
  keyword = '';
  constructor(
    injector: Injector,
    private _bookService: BookServiceProxy,
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
    this._bookService.getListBook(keyword).subscribe(x => this.listData = x);
  }

  protected delete(book: BookDto): void {
    abp.message.confirm(
      this.l('Bạn muốn xóa cuốn sách "' + book.name + '"?'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._bookService.deleteBook(book.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getAll('');
          });
        }
      }
    );
  }

  private showCreateOrEditDialog(dataEmit?: BookDto): void {
    let createOrEditDialog: BsModalRef;
    if (!dataEmit) {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateBookComponent,
        {
          class: 'modal-lg',
          initialState: {
            modalTitle: 'Thêm mới sách'
          },
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateBookComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: dataEmit,
            modalTitle: 'Chỉnh sửa sách ' + dataEmit.name
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.getAll('')
    });
  }

  create() {
    this.showCreateOrEditDialog();
  }

  edit(book: BookDto) {
    this.showCreateOrEditDialog(book)
  }
}
