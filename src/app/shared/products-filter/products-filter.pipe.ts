import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
	transform(value: any, name: string): any {
		const newArr = value.filter((index: any) => {
			const arrWords: [] = index.name.split(' ');
			const condition = (element: string) => element.startsWith(name);
			const result = arrWords.some(condition);
			return result;
		});
		return newArr;
	}
}
