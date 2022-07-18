import {IOrderItem} from "./order-item.interface";
import {IListManager} from "./list-manager.interface";
import {IOrdersManager} from "./orders-manager.interface";

export interface IOrder {
	items: IOrderItem[];
	sum: number;
}

export type GenericOrderServiceType<Order, OrderItem> = IListManager<OrderItem> & IOrdersManager<Order, OrderItem>;
export type OrderServiceType = GenericOrderServiceType<IOrder, IOrderItem>;
