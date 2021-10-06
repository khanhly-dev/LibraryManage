import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CusSelectComponent),
  multi: true,
};

@Component({
  selector: 'cus-select',
  templateUrl: './cus-select.component.html',
  providers: [VALUE_ACCESSOR],
})
export class CusSelectComponent implements OnInit {

  @Input() control = new FormControl(null);

  @Input() listSelect: any[] = [];

  @Output() onItemSelected = new EventEmitter<any>();

  _isDisabled = false;

  @Input()
  get value(): any {
    return this.control.value;
  }

  set value(v: any) {
    this.control.reset(v);
  }

  @Input()
  get isDisabled() {
    return this._isDisabled;
  }

  set isDisabled(v: boolean) {
    this._isDisabled = v;
    if (v) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  private onChange = (v: any) => { };
  private onTouched = () => { };

  onFocus(event: any): void {
    setTimeout(() => {
      this.onTouched();
    });

    this.onItemSelected.emit(this.value);
  }

  constructor() {
  }

  ngOnInit(): void { }

  //#region base ControlValueAccessor
  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
