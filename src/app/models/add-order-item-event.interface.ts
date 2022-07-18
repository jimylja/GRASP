import {IProduct} from "./product.interface";

export interface IAddOrderItemEvent {
	product: IProduct;
	amount: number;
}
