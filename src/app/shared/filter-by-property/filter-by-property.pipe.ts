import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
	transform(value: any, propertyNameToFilter: string, searchProperty: any): any {
		const type = typeof searchProperty;

		if (type == 'string') {
			searchProperty = searchProperty.toUpperCase();
			const newArr = value.filter((index: any) => {
				const arrWords: [] = index[propertyNameToFilter].toUpperCase().split(' ');
				const condition = (element: string) => element.startsWith(searchProperty);
				const result = arrWords.some(condition);
				return result;
			});
			return newArr;
		} else {
			return value.filter(
				(index: any) => index[propertyNameToFilter] === searchProperty,
			);
		}
	}
}
