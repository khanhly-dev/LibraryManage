import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BillServiceProxy, BookDto, BookInBillServiceProxy, BookServiceProxy, CreateOrUpdateBookInBillRequest, CustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CreateOrUpdateCustomerComponent } from '../customer/create-or-update-customer.component';

export class listBook {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
})
export class PayComponent extends AppComponentBase implements OnInit {
  saving = false;
  allBook: BookDto[] = [];
  bookSelect: BookDto;
  rfDataModal: FormGroup;
  billForm: FormGroup;
  cashForm: FormGroup;
  curentUser = '';
  customerList: CustomerDto[] = [];
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _billService: BillServiceProxy,
    private _bookInBillService: BookInBillServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _modalService: BsModalService,
    private _bookService: BookServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.curentUser = this.appSession.getShownLoginName();

    this.billForm = this.fb.group({
      id: 0,
      code: ['', Validators.required],
      customerId: ['', Validators.required],
      originalPrice: [0, Validators.required],
      discount: [0, Validators.required],
      totalPrice: [0, Validators.required],
      note: [''],

      pay: [0],
      giveBack: [0],
      totalBook: ['0 sản phẩm']
    });

    this.rfDataModal = this.fb.group({
      listData: this.fb.array([], (abs: AbstractControl) => {
        const v: any[] = abs.value;
        const itemFind = v.find((x) => x.isValid === false);
        if (itemFind) {
          return {
            notValidData: true,
          };
        }
      }),
    });

    this.getAllBook();
    this.genBillCode();
    this.getAllCustomer();
  }

  get datas(): FormArray {
    return this.rfDataModal.get('listData') as FormArray;
  }

  getAllCustomer() {
    this._customerService.getListCustomer('').subscribe(result => {
      this.customerList = result;
    })
  }

  getAllBook() {
    this._bookService.getListBook('').subscribe(result => {
      this.allBook = result;
    });
  }

  genBillCode() {
    this._billService.getListBill('', undefined, undefined).subscribe(result => {
      let code = 'HDB' + (Math.floor(Math.random() * 9999999) + 1000000);
      while (result.map(x => x.code).includes(code)) {
        code = 'HDB' + (Math.floor(Math.random() * 9999999) + 1000000);
      }
      this.billForm.get('code').setValue(code);
    })
  }

  getOriginalPrice() {
    let oriPrice = 0;
    for (let index = 0; index < this.datas.value.length; index++) {
      oriPrice += this.datas.value[index].price * this.datas.value[index].quantity - this.datas.value[index].discount;
    }
    this.billForm.get('originalPrice').setValue(oriPrice);
    this.billForm.get('totalPrice').setValue(oriPrice);
  }

  priceCaculation() {
    let fValue = this.billForm;
    let totalPrice = fValue.get('originalPrice').value - fValue.get('discount').value;
    if (fValue.get('originalPrice').value !== 0) {
      fValue.get('totalPrice').setValue(totalPrice);
    }
  }

  getGiveBackMoney() {
    let fValue = this.billForm;
    let giveBack = fValue.get('pay').value - fValue.get('totalPrice').value;
    fValue.get('giveBack').setValue(giveBack);
  }

  getTotalBook() {
    this.billForm.get('totalBook').setValue(this.datas.value.length + ' sản phẩm');
  }

  addBookIntoBill(bookSelect: BookDto) {
    this.datas.push(
      this.fb.group({
        id: bookSelect.id,
        name: [bookSelect.name, Validators.required],
        price: [bookSelect.price, Validators.required],
        quantity: [1, Validators.required],
        discount: [0, Validators.required],
      }),
    );

    this.getOriginalPrice();
    this.priceCaculation();
    this.getTotalBook();
    if (this.datas.value.length === 0) {
      this.billForm.reset(0)
    }
  }

  removeBookFromBill(index: number) {
    this.datas.removeAt(index);

    this.getOriginalPrice();
    this.priceCaculation();
    this.getTotalBook();
    if (this.datas.value.length === 0) {
      this.billForm.reset(0)
    }
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
      this.getAllCustomer();
    });
  }

  createCustomer() {
    this.showCreateOrEditDialog();
  }

  onClickCash() {
    let req: CreateOrUpdateBookInBillRequest[] = []
    console.log(this.billForm.value)
    this._billService.createOrUpdateBill(this.billForm.value).subscribe(result => {
      for (let index = 0; index < this.datas.value.length; index++) {
        let reqItem = new CreateOrUpdateBookInBillRequest();
        reqItem.id = 0;
        reqItem.bookId = this.datas.value[index].id;
        reqItem.quantity = this.datas.value[index].quantity;
        reqItem.billId = result;
        req.push(reqItem);
      }
      console.log(req)
      this._bookInBillService.createOrUpdateBookInBill(req).subscribe(x => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.billForm.reset();
        this.billForm.get('id').setValue(0);
        this.datas.clear()
        this.genBillCode();
      })
    });
  }
}
