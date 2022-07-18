import {Observable} from 'rxjs';

export interface IProductsManager<ProductItem> {
	get products$(): Observable<ProductItem[]>;

	get products(): ProductItem[];

	updateProducts(updatedProducts: ProductItem[]): Observable<void>
}
