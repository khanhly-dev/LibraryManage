import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-update-customer',
  templateUrl: './create-or-update-customer.component.html',
})
export class CreateOrUpdateCustomerComponent extends AppComponentBase implements OnInit {
  modalTitle: string;
  createOrEditForm: FormGroup;
  dataItem: CustomerDto;
  saving = false;
  categoryList: CustomerDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.createOrEditForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required],
      adress: ['', Validators.required],
    });

    if (this.dataItem) {
      this.createOrEditForm.patchValue(this.dataItem);
      this.createOrEditForm.get('dob').setValue(this.dataItem.dob.format('YYYY-MM-DD'));
    }
  }

  setSelectedValue($event) {
    this.createOrEditForm.get('categoryId').setValue($event);
  }

  save() {
    const fValue = this.createOrEditForm.value;
    this.saving = true;

    this._customerService.createOrUpdateCustomer(fValue).subscribe(
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

  close()
  {
    this.bsModalRef.hide();
  }
}
