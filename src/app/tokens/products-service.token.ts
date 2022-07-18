import {InjectionToken} from '@angular/core';
import {ProductsServiceType} from '../models';

export const PRODUCTS_SERVICE_TOKEN = new InjectionToken<ProductsServiceType>('PRODUCTS_SERVICE_TOKEN');
