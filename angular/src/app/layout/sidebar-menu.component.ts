import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/about';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);
        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    getMenuItems(): MenuItem[] {
        return [
            new MenuItem(this.l('HomePage'), '/app/home', 'fas fa-home', 'Pages.Home'),

            new MenuItem('Hệ thống', '', 'fas fa-circle', 'Pages.System', [
                new MenuItem(
                    'Tài khoản',
                    '/app/users',
                    'fas fa-user',
                    'Pages.Users'
                ),
                new MenuItem(
                    'Phân quyền',
                    '/app/roles',
                    'fas fa-theater-masks',
                    'Pages.Roles'
                ),
            ]),

            new MenuItem('Thu ngân', '', 'fas fa-wallet', 'Pages.Cash', [
                new MenuItem(
                    'Thanh toán',
                    '/app/payment/pay',
                    'fas fa-cash-register',
                    'Pages.BookInBill'
                ),
                new MenuItem(
                    'Hóa đơn',
                    '/app/payment/bill',
                    'fas fa-money-bill',
                    'Pages.Bill'
                ),
                new MenuItem(
                    'Khách hàng',
                    '/app/payment/customer',
                    'fas fa-users',
                    'Pages.Customer'
                ),
            ]),

            new MenuItem('Nội bộ', '', 'fas fa-building', 'Pages.Internal', [
                new MenuItem(
                    'Chức vụ',
                    '/app/internal/office',
                    'fas fa-file-alt',
                    'Pages.Office'
                ),
                new MenuItem(
                    'Nhân viên',
                    '/app/internal/employee',
                    'fas fa-male',
                    'Pages.Employee'
                ),
            ]),

            new MenuItem('Sản phẩm', '', 'fab fa-product-hunt', 'Pages.Product', [
                new MenuItem(
                    'Phân loại sách',
                    '/app/product/category',
                    'fas fa-bookmark',
                    'Pages.Category'
                ),
                new MenuItem(
                    'Danh mục sách',
                    '/app/product/book',
                    'fas fa-book',
                    'Pages.Book'
                ),
            ])
        ];
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}
