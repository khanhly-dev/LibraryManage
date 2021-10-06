import { Component, Injector, OnInit } from '@angular/core';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { EmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrUpdateEmployeeComponent } from './create-or-update-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent extends PagedListingComponentBase<EmployeeDto> implements OnInit {
  listData: EmployeeDto[] = [];
  keyword = '';
  constructor(
    injector: Injector,
    private _employeeService: EmployeeServiceProxy,
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
    this._employeeService.getListEmployee(keyword).subscribe(x => this.listData = x);
  }

  protected delete(employee: EmployeeDto): void {
    abp.message.confirm(
      this.l('Bạn muốn xóa cuốn sách "' + employee.name + '"?'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._employeeService.deleteEmployee(employee.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getAll('');
          });
        }
      }
    );
  }

  private showCreateOrEditDialog(dataEmit?: EmployeeDto): void {
    let createOrEditDialog: BsModalRef;
    if (!dataEmit) {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateEmployeeComponent,
        {
          class: 'modal-lg',
          initialState: {
            modalTitle: 'Thêm nhân viên'
          },
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateOrUpdateEmployeeComponent,
        {
          class: 'modal-lg',
          initialState: {
            dataItem: dataEmit,
            modalTitle: 'Chỉnh nhân viên ' + dataEmit.name
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

  edit(employee: EmployeeDto) {
    this.showCreateOrEditDialog(employee)
  }

  createUser(item : EmployeeDto): void {
    this.showCreateOrEditUserDialog(item);
  }

  private showCreateOrEditUserDialog(item: EmployeeDto): void {
    let createOrEditUserDialog: BsModalRef;
    createOrEditUserDialog = this._modalService.show(
      CreateUserDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          userCreated: item,
        },
      }
    );
    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
