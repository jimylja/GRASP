import {InjectionToken} from '@angular/core';
import {CrudServiceType} from '../models';

export const CRUD_SERVICE_TOKEN = new InjectionToken<CrudServiceType>('CRUD_SERVICE_TOKEN');
