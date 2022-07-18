export interface IListManager<T> {
	addItem(item: T): void;

	deleteItem(item: T): void;

	clear(): void;
}
