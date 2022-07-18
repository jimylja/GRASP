import {IProductsManager} from "./products-manager.interface";

export interface IProduct {
	id: string;
	title: string;
	discountPercentage: number;
	thumbnail: string;
	stock: number;
	price: number;
	description: string;
}

export type GenericProductsServiceType<Products> = IProductsManager<Products>;
export type ProductsServiceType = GenericProductsServiceType<IProduct>;
