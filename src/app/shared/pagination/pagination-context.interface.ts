// заранее нам не известно с каким ТД мы работаем, поэтому маскируем его под некий Т
// это динамические данные
export interface IPaginationContext<T> {
	// тот элемент для которого был создан вью
	// тот элемент который сейчас отображается на стр
	$implicit: T[];
	index: number;
	appPaginationOf: T[];
	pageArr: T[];
	next: () => void;
	back: () => void;
	changePage: (arr: number) => void;
}
