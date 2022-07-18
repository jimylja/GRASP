import {InjectionToken} from "@angular/core";
import {OrderServiceType} from "../models";

export const ORDER_SERVICE_TOKEN = new InjectionToken<OrderServiceType>('ORDER_SERVICE_TOKEN');
