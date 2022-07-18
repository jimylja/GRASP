import {Injectable} from '@angular/core';
import {NgForage} from 'ngforage';

import {from, Observable} from 'rxjs';
import {CrudServiceType} from './models';

@Injectable({
	providedIn: 'root'
})
export class StorageService implements CrudServiceType {

	constructor(private readonly ngf: NgForage) {
	}

	getItem(key: string): Observable<unknown> {
		return from(this.ngf.getItem(key));
	}

	addItem(key: string, value: unknown): Observable<unknown> {
		return from(this.ngf.setItem(key, value));
	}

	deleteItem(key: string): void | Observable<void> {
		return from(this.ngf.removeItem(key));
	}

	updateItem(key: string, item: unknown): Observable<unknown> {
		return from(this.ngf.setItem(key, item));
	}
}
