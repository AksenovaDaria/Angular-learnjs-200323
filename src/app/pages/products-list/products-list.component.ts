import {Component} from '@angular/core';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
	title = 'Shiba Inu';
	subtitle = 'Dog Breed';
	text =
		'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';
	img = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

	onClickLike(event: MouseEvent) {
		event.stopPropagation();
		console.log('Like');
	}

	onClickShare(event: MouseEvent) {
		event.stopPropagation();
		console.log('Share');
	}
}
