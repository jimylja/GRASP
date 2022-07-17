import {IProduct} from "./product.interface";

export interface IOrderItem {
	product: IProduct;
	amount: number;
	sum: number;
}
