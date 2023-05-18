import {
	Directive,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import {IPaginationContext} from './pagination-context.interface';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';

@Directive({
	// селектор является в т.ч. префиксом
	// все инпуты должны соответствовать префиксу + к-л кастомному постфиксу =key
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges, OnDestroy {
	@Input() appPaginationOf: T[] | undefined | null;
	@Input() appPaginationChankSize = 4;
	// Здесь мы храним индексы
	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroy$ = new Subject<void>();

	constructor(
		// тк это структурная директива - получаем ВКР ТР
		private readonly viewContainerRef: ViewContainerRef,
		// шаблон, к которому примененима данная СД - в качестве дженерика
		// передаем контекст данной СД - мы созаем интерфейс
		private readonly templateRef: TemplateRef<IPaginationContext<T>>,
	) {}

	ngOnChanges({appPaginationOf}: SimpleChanges): void {
		if (appPaginationOf) {
			this.updateView();
		}
	}

	ngOnInit(): void {
		this.listenCurrentIndexChange();
	}

	ngOnDestroy(): void {
		// this.currentIndexChangeSubscription.unsubscribe();
		this.destroy$.next();
		this.destroy$.complete();
	}

	private getCurrentPages(currentIndex: number): T[] {
		const startIndex = currentIndex * this.appPaginationChankSize;
		return (
			this.appPaginationOf?.slice(
				startIndex,
				startIndex + this.appPaginationChankSize,
			) || []
		);
	}

	private updateView() {
		if (!this.appPaginationOf?.length) {
			this.viewContainerRef.clear();
			return;
		}
		this.currentIndex$.next(0);
	}

	// прослушиваем изменения индекса
	private listenCurrentIndexChange() {
		// обрабатываем каррент индекс

		this.currentIndex$
			.pipe(
				// генерация контекста

				map(currentIndex =>
					this.getCurrentContext(
						currentIndex,
						this.getCurrentPages(currentIndex),
					),
				),
				filter(Boolean),
				takeUntil(this.destroy$),
			)
			// то к чему стремимся - вставка вью на основе контекста
			.subscribe(context => {
				this.viewContainerRef.clear();
				this.viewContainerRef.createEmbeddedView(this.templateRef, context);
			});
	}

	private getCurrentContext(
		currentIndex: number,
		array: T[],
	): IPaginationContext<T> | null {
		if (!this.appPaginationOf) {
			return null;
		}
		const maxPage: number = Math.ceil(
			this.appPaginationOf.length / this.appPaginationChankSize,
		);
		const pageArray: any = [];
		for (let i = 1; i <= maxPage; i++) {
			pageArray.push(i);
		}

		return {
			$implicit: array,
			index: currentIndex,
			appPaginationOf: this.appPaginationOf,
			pageArr: pageArray,
			next: () => {
				this.next();
			},
			back: () => {
				this.back();
			},
			changePage: arr => {
				this.changePage(arr);
			},
		};
	}

	private back() {
		const previousIndex = this.currentIndex$.value - 1;
		const value = Math.ceil(
			(this.appPaginationOf as T[]).length / this.appPaginationChankSize,
		);
		const newIndex = previousIndex >= 0 ? previousIndex : value - 1;

		this.currentIndex$.next(newIndex);
	}

	private next() {
		const nextIndex = this.currentIndex$.value + 1;
		const newIndex =
			nextIndex < (this.appPaginationOf as T[]).length / this.appPaginationChankSize
				? nextIndex
				: 0;
		this.currentIndex$.next(newIndex);
	}

	private changePage(num: number) {
		this.currentIndex$.next(num - 1);
	}
}
