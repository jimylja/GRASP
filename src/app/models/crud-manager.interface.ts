import {Observable} from 'rxjs';

export interface ICrudManager<T> {
	addItem(id: string, item: T): T | Observable<T>;

	getItem(id: string): T | Observable<T>;

	updateItem(id: string, item: T): T | Observable<T>;

	deleteItem(id: string): void | Observable<void>;
}

export type CrudServiceType = ICrudManager<unknown>;
