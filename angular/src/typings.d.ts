///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/abp.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.d.ts"/>
///<reference path="../node_modules/moment/moment.d.ts"/>

// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var Push: any;

declare namespace abp {
  namespace ui {
    function setBusy(elm?: any, text?: any, delay?: any): void;
    function clearBusy(elm?: any, delay?: any): void;
  }
}

// # 3rd Party Library
// If the library doesn't have typings available at `@types/`,
// you can still use it by manually adding typings for it

interface IORA {
  test: () => void;
  equalEmpty: (val1: any, val2: any) => boolean;
  shallowEqual: (val1: any, val2: any) => boolean;
  deepEqual: (val1: any, val2: any) => boolean;
  notify: IORA_Notify;
  message: IORA_Message;
  ui: IORA_UI;
  event: IORA_EVENT;
  custom: any;
  flattenData: (array: any[], groupKey: string, result: any[]) => void;
  downloadFile: (urlService: string, basePath: string, fileToken: string) => void;
  // urlService,
  // basePath,
  // fileToken,
}

// tslint:disable-next-line:class-name
interface IORA_UI {
  // setBusy:()=>void;
  // clearBusy:()=>void;
  setBusy: (message?: string) => void;
  clearBusy: any;
}

// tslint:disable-next-line:class-name
interface IORA_EVENT {
  on: (eventName: string, callback: Function) => void;
  off: (eventName: string, callback: Function) => void;
  trigger: (eventName: string, input?: any) => void;
}

// tslint:disable-next-line:class-name
interface IORA_Notify {
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  success: (message: string, title?: string) => void;
  warn: (message: string, title?: string) => void;
}

// tslint:disable-next-line:class-name
interface IORA_Message {
  confirm: (
    message: string,
    title: string,
    onOk: Function,
    onCancel?: Function,
    option?: IModalOption,
    confirmType?: 'confirm' | 'info' | 'success' | 'error' | 'warning',
  ) => void;
  error: (message: string, options?: any) => void;
  info: (message: string, options?: any) => void;
  success: (message: string, options?: any) => void;
  warn: (message: string, options?: any) => void;
}

interface IModalOption {
  nzCentered?: boolean;
  nzClosable?: boolean;
  nzOkLoading?: boolean;
  nzOkDisabled?: boolean;
  nzCancelDisabled?: boolean;
  nzCancelLoading?: boolean;
  nzNoAnimation?: boolean;
  nzAutofocus?: 'ok' | 'cancel' | 'auto' | null;
  nzMask?: boolean;
  nzMaskClosable?: boolean;
  nzKeyboard?: boolean;
  nzZIndex?: number;
  nzWidth?: number | string;
  nzCloseIcon?: any;
  nzOkType?: 'primary' | 'default' | 'dashed' | 'danger' | 'link' | 'text' | null;
  nzOkDanger?: boolean;
  nzModalType?: 'default' | 'confirm';
  nzOnCancel?: any | (false | void | {}) | Promise<false | void | {}>;
  nzOnOk?: any | (false | void | {}) | Promise<false | void | {}>;
  nzComponentParams?: Partial<any>;
  nzMaskStyle?: { [key: string]: string };
  nzBodyStyle?: { [key: string]: string };
  nzWrapClassName?: string;
  nzClassName?: string;
  nzStyle?: object;
  nzTitle?: string | any;
  nzFooter?: string | any | Array<any> | null;
  nzCancelText?: string | null;
  nzOkText?: string | null;
  nzContent?: string | any;
  nzCloseOnNavigation?: boolean;
  nzViewContainerRef?: any;
  nzAfterOpen?: any;
  nzAfterClose?: any;
  nzIconType?: string;
}

declare var ora: IORA;
