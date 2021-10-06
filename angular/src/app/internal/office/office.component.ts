import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OfficeDto, OfficeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrUpdateOfficeComponent } from './create-or-update-office.component';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
})
export class OfficeComponent extends PagedListingComponentBase<OfficeDto> implements OnInit {
  listData: OfficeDto[] = [];
  keyword = '';
  constructor(
    injector: Injector,
    private _officeService: OfficeServiceProxy,
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
    this._officeService.getListOfice(keyword).subscribe(x => this.listData = x);
  }

  protected delete(office: OfficeDto): void {
    abp.message.confirm(
      this.l('Bạn muốn xóa cuốn sách "' + office.name + '"?'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._officeService.deleteOffice(office.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getAll('');
          });
        }
      }
    );
  }

  private showCreateOrEditDialog(dataEmit?: OfficeDto): void {
    let createOrEditDialog: BsModalRef;
    if (!dataEmit) {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateOfficeComponent,
        {
          class: 'modal-lg',
          initialState: {
            modalTitle: 'Thêm mới chức vụ'
          },
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateOfficeComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: dataEmit,
            modalTitle: 'Chỉnh sửa chức vụ ' + dataEmit.name
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

  edit(office: OfficeDto) {
    this.showCreateOrEditDialog(office)
  }
}
