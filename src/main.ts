import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import * as localForage from "localforage";
import {Products} from "./app/products.mocked";

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
	localForage.config({name: 'App', storeName: 'store'});
	localForage.setItem('products', Products).then();
}).catch(err => console.error(err));
