import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-update-category',
  templateUrl: './create-or-update-category.component.html',
})
export class CreateOrUpdateCategoryComponent extends AppComponentBase implements OnInit {
  modalTitle: string;
  createOrEditForm: FormGroup;
  dataItem: CategoryDto;
  saving = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.createOrEditForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: [''],
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

    this._categoryService.createOrUpdateCategory(fValue).subscribe(
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
