import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOrUpdateEmployeeRequest, EmployeeDto, EmployeeServiceProxy, OfficeDto, OfficeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as moment from 'moment';

@Component({
  selector: 'app-create-or-update-employee',
  templateUrl: './create-or-update-employee.component.html',
})
export class CreateOrUpdateEmployeeComponent extends AppComponentBase implements OnInit {
  modalTitle: string;
  createOrEditForm: FormGroup;
  dataItem: EmployeeDto;
  saving = false;
  officeList: OfficeDto[] = [];
  status = [
    { id: true, name: 'Đang làm việc' },
    { id: false, name: 'Đã nghỉ việc' }
  ]

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _employeeService: EmployeeServiceProxy,
    private _officeServie: OfficeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.createOrEditForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      dob: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      fromDate: ['', Validators.required],
      officeId: ['', Validators.required],
      status: ['', Validators.required],
      userId: [null],
    });

    this.getAllOffice();

    if (this.dataItem) {
      this.createOrEditForm.patchValue(this.dataItem);
      this.createOrEditForm.get('dob').setValue(this.dataItem.dob.format('YYYY-MM-DD'));
      this.createOrEditForm.get('fromDate').setValue(this.dataItem.fromDate.format('YYYY-MM-DD'));
    }
  }

  getAllOffice() {
    this._officeServie.getListOfice('').subscribe(x => {
      this.officeList = x;
    })
  }

  setSelectedValue($event) {
    this.createOrEditForm.get('officeId').setValue($event);
  }

  setStatusValue($event) {
    this.createOrEditForm.get('status').setValue($event);
  }

  save() {
    const fValue = this.createOrEditForm.value;
    this.saving = true;

    let request = new CreateOrUpdateEmployeeRequest();
    request.id = fValue.id;
    request.name = fValue.name;
    request.dob = moment(fValue.dob).subtract(-7, 'hours');
    request.phoneNumber = fValue.phoneNumber;
    request.fromDate = moment(fValue.fromDate).subtract(-7, 'hours');
    request.officeId = fValue.officeId;
    request.status = fValue.status;
    request.userId = fValue.userId;

    this._employeeService.createOrUpdateEmployee(request).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

  close() {
    this.bsModalRef.hide();
  }
}
