import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Observable, tap} from 'rxjs';
import {CrudServiceType, IProduct, ProductsServiceType} from '../models';
import {CRUD_SERVICE_TOKEN} from '../tokens';

@Injectable()
export class ProductsService implements ProductsServiceType {
	private _products$ = new BehaviorSubject<IProduct[]>([]);
	private _products: IProduct[] = [];

	constructor(@Inject(CRUD_SERVICE_TOKEN) private storageService: CrudServiceType) {
	}

	get products$(): Observable<IProduct[]> {
		return this.fetchProducts().pipe(concatMap(() => this._products$.asObservable()));
	}

	get products(): IProduct[] {
		return this._products;
	}

	updateProducts(updatedProducts: IProduct[]): Observable<void> {
		return this.storageService.addItem('products', updatedProducts) as Observable<void>;
	}

	private fetchProducts(): Observable<IProduct[]> {
		return (this.storageService.getItem('products') as Observable<IProduct[]>).pipe(
			tap(products => this._products = products),
			tap(products => this._products$.next(products))
		);
	}
}
