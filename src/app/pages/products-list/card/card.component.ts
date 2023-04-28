import {Component, Input, Output, EventEmitter} from '@angular/core';
// import {productMock} from '../../../shared/products/product.mock';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css'],
})
export class CardComponent {
	// readonly product = productMock;

	@Input() product: IProduct | undefined;

	bought = false;

	@Output() byeClick = new EventEmitter<Event>();

	// onProductBuy(event: Event) {
	// 	event.stopPropagation();
	// 	console.log('Buy product');
	// }

	// isStarActive(starIndex: number): boolean {
	// 	return this.product && this.product.rating >= starIndex;
	// }
}
