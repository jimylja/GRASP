import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Observable, switchMap, tap} from 'rxjs';
import {IOrderItem, IProduct} from '../models';
import {StorageService} from '../storage.service';

@Injectable({
	providedIn: 'root'
})
export class ShopService {

	private _orderItems: Map<string, IOrderItem> = new Map();

	private _orderItems$ = new BehaviorSubject<IOrderItem[]>([]);
	private _orderTotal$ = new BehaviorSubject<number>(0);
	private _products$ = new BehaviorSubject<IProduct[]>([]);

	constructor(private storageService: StorageService) {
	}

	get products$(): Observable<IProduct[]> {
		return this.fetchProducts().pipe(concatMap(() => this._products$.asObservable()));
	}

	get orderTotal$(): Observable<number> {
		return this._orderTotal$.asObservable();
	}

	get orderItems$(): Observable<any> {
		return this._orderItems$.asObservable();
	}

	addOrderItem(product: IProduct, amount: number) {
		if (!amount) {
			return
		}

		this._orderItems.set(product.id, {
			product,
			amount,
			sum: (product.price * (1 - product.discountPercentage * 0.01)) * amount
		});
		this.updateOrderTotal();
		this.emitNewOrderList();
	}

	deleteOrderItem(id: string) {
		this._orderItems.delete(id);
		this.updateOrderTotal();
		this.emitNewOrderList();
	}

	updateOrderTotal(): void {
		const total = Array.from(this._orderItems.values()).reduce((sum: number, orderItem) => sum + orderItem.sum, 0)
		this._orderTotal$.next(total);
	}

	confirmOrder(): Observable<IProduct[]> {
		const updatedProductList = this.getUpdatedProductsList();

		return this.storageService.setItem('products', updatedProductList).pipe(
			switchMap(() => this.products$),
			tap(() => {
				this._orderItems.clear();
				this.emitNewOrderList();
				this.updateOrderTotal();
			}),
		);
	}

	private getUpdatedProductsList(): IProduct[] {
		return this._products$.getValue().map((product: IProduct) => {
			const item = this._orderItems.get(product.id) as IOrderItem;
			return {
				...product,
				stock: this._orderItems.has(product.id) ? product.stock - item.amount : product.stock
			}
		}).filter((product: any) => product.stock);
	}

	private emitNewOrderList() {
		this._orderItems$.next(Array.from(this._orderItems.values()))
	}

	private fetchProducts(): Observable<IProduct[]> {
		return (this.storageService.getItem('products') as Observable<IProduct[]>).pipe(
			tap(products => this._products$.next(products))
		);
	}
}
