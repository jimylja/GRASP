import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IProduct, IOrderItem, IOrder} from './models';
import {ShopService} from './services';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	orderItems$!: Observable<IOrderItem[]>;
	orderTotal$!: Observable<number>;
	products$!: Observable<IProduct[]>;
	order$!: Observable<IOrder>;

	constructor(private shopService: ShopService, private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.products$ = this.shopService.products$;
		this.order$ = this.shopService.order$;
	}

	addOrderItem(product: IProduct, amount: number) {
		this.shopService.addOrderItem(product, amount);
	}

	removeOrderItem(orderItem: IOrderItem) {
		this.shopService.deleteOrderItem(orderItem);
	}

	confirmOrder(): void {
		this.shopService.confirmOrder().subscribe();
	}

	checkChanges() {
		this.cdr.detectChanges()
	}
}
