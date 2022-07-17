import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DEFAULT_CONFIG, Driver} from 'ngforage';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {StorageService} from "./storage.service";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		StorageService,
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
