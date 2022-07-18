import {Injectable} from '@angular/core';
import {IOrder, IOrderItem, OrderServiceType} from '../models';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class OrderService implements OrderServiceType {
	private _order$ = new Subject<IOrder>()
	private _orderItems: Map<string, IOrderItem> = new Map();

	get order$(): Observable<IOrder> {
		return this._order$.asObservable();
	}

	get order(): IOrder {
		return {items: this.orderItems, sum: this.totalPrice};
	}

	get totalPrice(): number {
		return Array.from(this._orderItems.values()).reduce((sum: number, orderItem: IOrderItem) => sum + orderItem.sum, 0);
	}

	get orderItems(): IOrderItem[] {
		return Array.from(this._orderItems.values());
	}

	addItem(orderItem: IOrderItem) {
		this._orderItems.set(orderItem.id, orderItem);
		this.emitOrder();
	}

	deleteItem(orderItem: IOrderItem) {
		this._orderItems.delete(orderItem.product.id);
		this.emitOrder();
	}

	clear() {
		this._orderItems.clear();
		this.emitOrder();
	}

	private emitOrder() {
		this._order$.next(this.order);
	}
}
