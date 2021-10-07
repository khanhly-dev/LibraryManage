import { Component, Injector, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CustomerByMonthDto, DashboardServiceProxy, RevenueByMonthDto } from '@shared/service-proxies/service-proxies';

export class chartDto {
  data: any[];
  label: string;
}

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {
  curentDayRevenue: number;
  allCustomer: number;
  totalBillInDay: number;
  revenueByMonth: RevenueByMonthDto[] = [];
  customerByMonth: CustomerByMonthDto[] = [];

  constructor(injector: Injector, private _dashboardService: DashboardServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCurentDayRevenue();
    this.getTotalBill();
    this.getRevenueByMonth();
    this.getAllCustomer();
    this.getCustomerByMonth();
  }

  getAllCustomer() {
    this._dashboardService.getAllCustomer().subscribe(x => this.allCustomer = x);
  }

  getTotalBill() {
    this._dashboardService.getTotalBill().subscribe(x => this.totalBillInDay = x);
  }

  getCurentDayRevenue() {
    this._dashboardService.getRevenueInCurentDay().subscribe(x => this.curentDayRevenue = x);
  }

  getRevenueByMonth() {
    this._dashboardService.getRevenueByMonth(2021).subscribe(x => {
      this.revenueByMonth = x;
      this.chartLabels1 = this.revenueByMonth.map(x => x.month);
      this.chartDatasets1 = [
        { data: this.revenueByMonth.map(x => x.revenue), label: '' }
      ];
    })
  }

  getCustomerByMonth() {
    this._dashboardService.getCustomerByMonth(2021).subscribe(x => {
      this.customerByMonth = x;
      this.chartLabels = this.revenueByMonth.map(x => x.month);
      this.chartDatasets = [
        { data: this.revenueByMonth.map(x => x.revenue / 100000), label: 'Doanh thu (x100.000)' },
        { data: this.customerByMonth.map(x => x.customer), label: 'Khách hàng' }
      ];
    })
  }

  // bieu do cot 
  public chartType1: string = 'bar';

  public chartDatasets1: Array<chartDto>

  public chartLabels1: Array<any>

  public chartColors1: Array<any> = [
    {
      backgroundColor: [
        '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1',
      ],
      borderColor: [
        '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1', '#1167b1',
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions1: any = {
    responsive: true
  };
  public chartClicked1(e: any): void { }
  public chartHovered1(e: any): void { }
  //------------------------------------


  public chartType: string = 'line';

  public chartDatasets: Array<any>

  public chartLabels: Array<any>

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  //--------------------------

  public chartType2: string = 'pie';

  public chartDatasets2: Array<any> = [
    { data: [20, 35, 25, 10, 10], label: 'My First dataset' }
  ];

  public chartLabels2: Array<any> = ['Website', 'Facebook', 'Youtube', 'TV', 'Khác'];

  public chartColors2: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions2: any = {
    responsive: true
  };
  public chartClicked2(e: any): void { }
  public chartHovered2(e: any): void { }
}
