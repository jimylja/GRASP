import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IProduct, IOrderItem} from './models';
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

	constructor(private shopService: ShopService, private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.orderItems$ = this.shopService.orderItems$;
		this.orderTotal$ = this.shopService.orderTotal$;
		this.products$ = this.shopService.products$;
	}

	addOrderItem(product: IProduct, amount: number) {
		this.shopService.addOrderItem(product, amount);
	}

	removeOrderItem(orderItemId: string) {
		this.shopService.deleteOrderItem(orderItemId);
	}

	confirmOrder(): void {
		this.shopService.confirmOrder().subscribe();
	}

	checkChanges() {
		this.cdr.detectChanges()
	}
}
