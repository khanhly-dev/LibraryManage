import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BillDto, BookDto, BookInBillDto, BookInBillServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
})
export class BillDetailComponent extends AppComponentBase implements OnInit {
  modalTitle: string;
  dataItem: BillDto;

  listBookBuying: BookInBillDto[] = [];

  gridStyle = {
    width: '50%',
    textAlign: 'center'
  };

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _BookInBillService : BookInBillServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.dataItem)
    this.getBillDetail(this.dataItem.id);
  }

  getBillDetail(billId : number)
  {
    this._BookInBillService.getListBookInBillByBillId(billId).subscribe(x => {
      this.listBookBuying = x;
    });
  }

  close()
  {
    this.bsModalRef.hide();
  }
}
