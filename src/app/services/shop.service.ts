import {Inject, Injectable} from '@angular/core';
import {Observable, switchMap, tap} from 'rxjs';
import {IOrderItem, IProduct, IOrder, OrderItem, OrderServiceType, ProductsServiceType} from '../models';
import {ORDER_SERVICE_TOKEN, PRODUCTS_SERVICE_TOKEN} from '../tokens';

@Injectable({
	providedIn: 'root'
})
export class ShopService {

	constructor(
		@Inject(ORDER_SERVICE_TOKEN) private orderService: OrderServiceType,
		@Inject(PRODUCTS_SERVICE_TOKEN) private productsService: ProductsServiceType) {
	}

	get products$(): Observable<IProduct[]> {
		return this.productsService.products$;
	}

	get order$(): Observable<IOrder> {
		return this.orderService.order$;
	}

	addOrderItem(product: IProduct, amount: number) {
		this.orderService.addItem(new OrderItem(product, amount));
	}

	deleteOrderItem(product: IOrderItem) {
		this.orderService.deleteItem(product)
	}

	confirmOrder(): Observable<IProduct[]> {
		return this.productsService.updateProducts(this.getUpdatedProductsList()).pipe(
			switchMap(() => this.products$),
			tap(() => this.orderService.clear()),
		);
	}

	private getUpdatedProductsList(): IProduct[] {
		const orderList = this.orderService.orderItems;

		return this.productsService.products.map((product: IProduct) => {
			const item = orderList.find(orderItem => orderItem.id === product.id) as IOrderItem;
			return {
				...product,
				stock: item ? product.stock - item.amount : product.stock
			}
		}).filter((product: any) => product.stock);
	}
}
