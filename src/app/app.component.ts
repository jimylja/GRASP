import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StorageService} from "./storage.service";
import {switchMap, tap} from "rxjs";
import {IProduct, IOrderItem} from "./models";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	products!: IProduct[];
	orderItems: Map<string, IOrderItem> = new Map();
	orderTotal: number = 0;

	constructor(private storageService: StorageService, private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscribeToProductsList();
	}

	subscribeToProductsList() {
		this.products$.subscribe()
	}

	get products$() {
		return this.storageService.getItem('products').pipe(tap((data) => this.products = data as IProduct[]))
	}

	checkChanges() {
		this.cdr.detectChanges()
	}

	addOrderItem(product: IProduct, amount: number) {
		if (!amount) {
			return
		}

		this.orderItems.set(product.id, {
			product,
			amount,
			sum: (product.price * (1 - product.discountPercentage * 0.01)) * amount
		});
		this.updateOrderTotal();
	}

	removeOrderItem(orderItemId: string) {
		this.orderItems.delete(orderItemId);
		this.updateOrderTotal();
	}

	updateOrderTotal(): void {
		this.orderTotal = Array.from(this.orderItems.values()).reduce((sum: number, orderItem) => sum + orderItem.sum, 0)
	}

	confirmOrder(): void {
		const a = this.products.map((product: IProduct) => {
			const item = this.orderItems.get(product.id) as IOrderItem;
			return {
				...product,
				stock: this.orderItems.has(product.id) ? product.stock - item.amount : product.stock
			}
		}).filter((product: any) => product.stock);

		this.storageService.setItem('products', a).pipe(switchMap(() => this.products$)).subscribe(() => {
			this.orderItems.clear();
			this.orderTotal = 0;
		});
	}
}
