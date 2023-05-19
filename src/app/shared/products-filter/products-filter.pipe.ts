import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
	transform(value: any, name: string): any {
		const newArr = value.filter((index: any) => {
			if (index.name.startsWith(name)) {
				return index;
			}
		});
		return newArr;
	}
}
