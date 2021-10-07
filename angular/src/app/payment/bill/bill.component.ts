import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BillDto, BillServiceProxy, BookInBillDto, BookInBillServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BillDetailComponent } from './bill-detail.component';
import { CreateOrUpdateBillComponent } from './create-or-update-bill.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
})
export class BillComponent extends PagedListingComponentBase<BillDto> implements OnInit {
  listData: BillDto[] = [];
  keyword = '';
  constructor(
    injector: Injector,
    private _billService: BillServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll('', '', '');
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error('Method not implemented.');
  }

  getAll(keyword: string, fromDate: string, toDate: string) {
    var fromDateConvert = null;
    var toDateConvert = null;
    if (fromDate != '') {
      fromDateConvert = moment(fromDate);
    }
    else {
      fromDateConvert = undefined
    }
    if (toDate != '') {
      toDateConvert = moment(toDate);
    }
    else {
      toDateConvert = undefined
    }
    this._billService.getListBill(keyword, fromDateConvert, toDateConvert).subscribe(x => this.listData = x);
  }

  protected delete(bill: BillDto): void {
    abp.message.confirm(
      this.l('Bạn muốn xóa hóa đơn "' + bill.code + '"?'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._billService.deleteBill(bill.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getAll('', '', '');
          });
        }
      }
    );
  }

  private showCreateOrEditDialog(dataEmit?: BillDto): void {
    let createOrEditDialog: BsModalRef;
    if (!dataEmit) {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateBillComponent,
        {
          class: 'modal-lg',
          initialState: {
            modalTitle: 'Thêm hóa đơn'
          },
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateBillComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: dataEmit,
            modalTitle: 'Chỉnh hóa đơn ' + dataEmit.code
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.getAll('', '', '');
    });
  }

  create() {
    this.showCreateOrEditDialog();
  }

  edit(bill: BillDto) {
    this.showCreateOrEditDialog(bill)
  }

  detail(bill: BillDto) {
    let createOrEditDialog: BsModalRef;
    if (bill) {
      createOrEditDialog = this._modalService.show(
        BillDetailComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: bill,
            modalTitle: 'Chi tiết hóa đơn'
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.getAll('', '', '');
    });
  }
}
