import {Injectable} from '@angular/core';
import {NgForage} from 'ngforage';

import {from, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor(private readonly ngf: NgForage) {
	}

	getItem(key: string): Observable<unknown> {
		return from(this.ngf.getItem(key));
	}

	setItem(key: string, value: unknown): Observable<unknown> {
		return from(this.ngf.setItem(key, value));
	}
}
