import {IProduct} from "./product.interface";

export interface IOrderItem {
	readonly id: string
	product: IProduct;
	amount: number;

	get sum(): number;
}

export class OrderItem implements IOrderItem {
	readonly id!: string
	product!: IProduct;
	amount!: number;

	constructor(product: IProduct, amount: number) {
		this.id = product.id
		this.product = {...product};
		this.amount = amount;
	}

	get sum(): number {
		const discount = this.product.discountPercentage ? (1 - this.product.discountPercentage * 0.01) : 1;
		return this.amount * this.product.price * discount;
	}
}
