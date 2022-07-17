import {IOrderItem} from "./order-item.interface";

export interface IOrder {
	items: IOrderItem[];
	sum: number;
}
