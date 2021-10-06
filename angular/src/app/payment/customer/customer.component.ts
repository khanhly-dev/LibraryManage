import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrUpdateCustomerComponent } from './create-or-update-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent extends PagedListingComponentBase<CustomerDto> implements OnInit {
  listData: CustomerDto[] = [];
  keyword = '';
  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
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
    this._customerService.getListCustomer(keyword).subscribe(x => this.listData = x);
  }

  protected delete(customer: CustomerDto): void {
    abp.message.confirm(
      this.l('Bạn muốn xóa khách hàng "' + customer.name + '"?'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._customerService.deleteCustomer(customer.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getAll('');
          });
        }
      }
    );
  }

  private showCreateOrEditDialog(dataEmit?: CustomerDto): void {
    let createOrEditDialog: BsModalRef;
    if (!dataEmit) {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateCustomerComponent,
        {
          class: 'modal-lg',
          initialState: {
            modalTitle: 'Thêm mới khách hàng'
          },
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateCustomerComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: dataEmit,
            modalTitle: 'Chỉnh sửa khách hàng ' + dataEmit.name
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

  edit(book: CustomerDto) {
    this.showCreateOrEditDialog(book)
  }
}
