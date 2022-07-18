import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IOrderItem} from "../../models";

@Component({
	selector: 'app-order-items',
	templateUrl: './order-items.component.html',
	styleUrls: ['./order-items.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsComponent {
	@Input() orderItems!: IOrderItem[];
	@Output() orderItemDeleted = new EventEmitter<IOrderItem>();

	removeOrderItem(orderItem: IOrderItem) {
		this.orderItemDeleted.emit(orderItem)
	}

}
