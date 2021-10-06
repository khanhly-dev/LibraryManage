import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { BookDto, BookServiceProxy, CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-update-book',
  templateUrl: './create-or-update-book.component.html',
})
export class CreateOrUpdateBookComponent extends AppComponentBase implements OnInit {
  modalTitle: string;
  createOrEditForm: FormGroup;
  dataItem: BookDto;
  saving = false;
  categoryList: CategoryDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _categoryService: CategoryServiceProxy,
    private _bookService: BookServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.createOrEditForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      author: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    if (this.dataItem) {
      this.createOrEditForm.patchValue(this.dataItem);
    }
    
    this.getAllCategory();
  }

  getAllCategory() {
    this._categoryService.getListCategory('').subscribe((result) => {
      this.categoryList = result;
    })
  }

  setSelectedValue($event) {
    this.createOrEditForm.get('categoryId').setValue($event);
  }

  save() {
    const fValue = this.createOrEditForm.value;
    this.saving = true;

    this._bookService.createOrUpdateBook(fValue).subscribe(
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
