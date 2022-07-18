import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DEFAULT_CONFIG, Driver} from 'ngforage';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StorageService} from './storage.service';
import {ORDER_SERVICE_TOKEN, PRODUCTS_SERVICE_TOKEN, CRUD_SERVICE_TOKEN} from './tokens';
import {OrderService} from './services';
import {ProductsService} from './services/products.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		{provide: CRUD_SERVICE_TOKEN, useClass: StorageService},
		{provide: ORDER_SERVICE_TOKEN, useClass: OrderService},
		{provide: PRODUCTS_SERVICE_TOKEN, useClass: ProductsService},
		{
			provide: DEFAULT_CONFIG,
			useValue: {
				name: 'App',
				storeName: 'store',
				driver: [Driver.INDEXED_DB, Driver.LOCAL_STORAGE]
			}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
