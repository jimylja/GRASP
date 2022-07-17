import {Injectable} from '@angular/core';
import {IOrder, IOrderItem, IProduct} from '../models';
import {Observable, Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private _order$ = new Subject<IOrder>()
	private _orderItems: Map<string, IOrderItem> = new Map();

	constructor() {
	}

	get order$(): Observable<IOrder> {
		return this._order$.asObservable();
	}

	get totalPrice(): number {
		return Array.from(this._orderItems.values()).reduce((sum: number, orderItem) => sum + orderItem.sum, 0);
	}

	get orderItems(): IOrderItem[] {
		return Array.from(this._orderItems.values());
	}

	addOrderItem(product: IProduct, amount: number) {
		if (!amount) {
			return
		}

		this._orderItems.set(product.id, {
			id: product.id,
			product,
			amount,
			sum: (product.price * (1 - product.discountPercentage * 0.01)) * amount
		});
		this.emitOrder();
	}

	delete(orderItem: IOrderItem) {
		this._orderItems.delete(orderItem.product.id);
		this.emitOrder();
	}

	clear() {
		this._orderItems.clear();
		this.emitOrder();
	}

	private emitOrder() {
		this._order$.next({items: this.orderItems, sum: this.totalPrice})
	}
}
