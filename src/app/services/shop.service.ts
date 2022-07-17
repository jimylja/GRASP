import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Observable, switchMap, tap} from 'rxjs';
import {IOrderItem, IProduct, IOrder} from '../models';
import {StorageService} from '../storage.service';
import {OrderService} from "./order.service";

@Injectable({
	providedIn: 'root'
})
export class ShopService {

	private _products$ = new BehaviorSubject<IProduct[]>([]);

	constructor(private storageService: StorageService, private orderService: OrderService) {
	}

	get products$(): Observable<IProduct[]> {
		return this.fetchProducts().pipe(concatMap(() => this._products$.asObservable()));
	}

	get order$(): Observable<IOrder> {
		return this.orderService.order$;
	}

	addOrderItem(product: IProduct, amount: number) {
		this.orderService.addOrderItem(product, amount);
	}

	deleteOrderItem(product: IOrderItem) {
		this.orderService.delete(product)
	}

	confirmOrder(): Observable<IProduct[]> {
		const updatedProductList = this.getUpdatedProductsList();

		return this.storageService.setItem('products', updatedProductList).pipe(
			switchMap(() => this.products$),
			tap(() => this.orderService.clear()),
		);
	}

	private getUpdatedProductsList(): IProduct[] {
		const orderList = this.orderService.orderItems;

		return this._products$.getValue().map((product: IProduct) => {
			const item = orderList.find(orderItem => orderItem.id === product.id) as IOrderItem;
			return {
				...product,
				stock: item ? product.stock - item.amount : product.stock
			}
		}).filter((product: any) => product.stock);
	}

	private fetchProducts(): Observable<IProduct[]> {
		return (this.storageService.getItem('products') as Observable<IProduct[]>).pipe(
			tap(products => this._products$.next(products))
		);
	}
}
