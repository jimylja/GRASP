import {Observable} from 'rxjs';

export interface IOrdersManager<Order, OrderItem> {
	get order$(): Observable<Order>;

	get order(): Order;

	get totalPrice(): number;

	get orderItems(): OrderItem[];
}
