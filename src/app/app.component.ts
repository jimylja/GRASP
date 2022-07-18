import {Component, OnInit} from '@angular/core';
import {IProduct, IOrderItem, IOrder, IAddOrderItemEvent} from './models';
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

	constructor(private shopService: ShopService) {
	}

	ngOnInit() {
		this.products$ = this.shopService.products$;
		this.order$ = this.shopService.order$;
	}


	addOrderItem(addOrderItemEvent: IAddOrderItemEvent) {
		const {product, amount} = addOrderItemEvent;
		this.shopService.addOrderItem(product, amount);
	}

	removeOrderItem(orderItem: IOrderItem) {
		this.shopService.deleteOrderItem(orderItem);
	}

	confirmOrder(): void {
		this.shopService.confirmOrder().subscribe();
	}
}
