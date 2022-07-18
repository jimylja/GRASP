import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {IAddOrderItemEvent, IProduct} from "../../models";

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

	@Input() product!: IProduct;
	@Output() orderItemAdded = new EventEmitter<IAddOrderItemEvent>();

	constructor(private cdr: ChangeDetectorRef) {
	}

	addOrderItem(product: IProduct, amount: number): void {
		if (!amount) {
			return;
		}

		this.orderItemAdded.emit({product, amount})
	}

	checkChanges(): void {
		this.cdr.detectChanges();
	}
}
