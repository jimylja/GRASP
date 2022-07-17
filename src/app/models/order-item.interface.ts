import {IProduct} from "./product.interface";

export interface IOrderItem {
	id: string;
	product: IProduct;
	amount: number;
	sum: number;
}
