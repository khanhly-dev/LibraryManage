import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { OfficeDto, OfficeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-update-office',
  templateUrl: './create-or-update-office.component.html',
})
export class CreateOrUpdateOfficeComponent extends AppComponentBase implements OnInit {
  modalTitle: string;
  createOrEditForm: FormGroup;
  dataItem: OfficeDto;
  saving = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _officeService: OfficeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.createOrEditForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      descripton: [''],
    });

    if (this.dataItem) {
      this.createOrEditForm.patchValue(this.dataItem);
    }
  }

  setSelectedValue($event) {
    this.createOrEditForm.get('categoryId').setValue($event);
  }

  save() {
    const fValue = this.createOrEditForm.value;
    this.saving = true;

    this._officeService.createOrUpdateOfice(fValue).subscribe(
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
