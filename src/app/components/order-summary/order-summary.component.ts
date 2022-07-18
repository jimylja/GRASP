import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IOrder} from "../../models";

@Component({
	selector: 'app-order-summary',
	templateUrl: './order-summary.component.html',
	styleUrls: ['./order-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
	@Input() order!: IOrder;
	@Output() orderConfirmed = new EventEmitter<void>();

	confirmOrder() {
		this.orderConfirmed.emit();
	}

}
