import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import {IProductsFilter} from './products-filter.interface';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {first, map, takeUntil} from 'rxjs';
import {DestroyService} from '../../../shared/destroy/destroy.service';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DestroyService],
})
export class FilterComponent implements OnChanges, OnInit {
	@Input() brands!: string[] | null;

	@Output() changeFilter = new EventEmitter<IProductsFilter>();

	readonly filterForm = new FormGroup({
		name: new FormControl('', {validators: [Validators.minLength(3)]}),
		brands: new FormArray<FormControl<boolean>>([]),
		priceRange: new FormGroup({
			min: new FormControl(0),
			max: new FormControl(999999),
		}),
	});

	constructor(
		private readonly destroy$: DestroyService,
		private route: ActivatedRoute,
	) {}

	ngOnChanges({brands}: SimpleChanges) {
		if (brands) {
			this.initBrandsForm();
		}
	}
	private initBrandsForm() {
		const queryBrands: any = [];
		this.route.queryParamMap.pipe(first()).subscribe((data: any) => {
			queryBrands.push(data.params.brands);
		});
		const brandsControls = this.brands
			? this.brands.map(brand => {
					let indexBoolean = 0;
					for (const key in queryBrands[0]) {
						if (brand == queryBrands[0][key]) {
							indexBoolean = 1;
						}
					}
					if (indexBoolean === 1) {
						return new FormControl<boolean>(true);
					} else {
						return new FormControl<boolean>(false);
					}
			  })
			: ([] as FormControl<boolean>[]);
		const brandsForm = new FormArray(brandsControls) as FormArray<
			FormControl<boolean>
		>;
		this.filterForm.setControl('brands', brandsForm);
	}
	ngOnInit() {
		this.route.queryParamMap.pipe(first()).subscribe((data: any) => {
			if (data.params.name) {
				this.filterForm.controls['name'].setValue(data.params.name);
			}
			if (data.params.minPrice) {
				this.filterForm.controls['priceRange'].controls['min'].setValue(
					data.params.minPrice,
				);
			}
			if (data.params.maxPrice) {
				this.filterForm.controls['priceRange'].controls['max'].setValue(
					data.params.maxPrice,
				);
			}
		});
		this.listenFilterChange();
	}

	private listenFilterChange() {
		this.filterForm.valueChanges
			.pipe(
				map(
					({brands, ...formValue}): IProductsFilter =>
						({
							...formValue,
							brands: this.getBrandsListFromForm(brands as boolean[]),
						} as IProductsFilter),
				),
				takeUntil(this.destroy$),
			)
			.subscribe(filter => {
				this.changeFilter.emit(filter);
			});
	}

	private getBrandsListFromForm(brandsFormValue: boolean[]): IProductsFilter['brands'] {
		return !this.brands
			? []
			: this.brands.filter((_, index) => brandsFormValue[index]);
	}

	// onFilterSubmit({name, priceRange, brands}: IProductsFilterForm) {
	// 	const filter: IProductsFilter = {
	// 		name: name,
	// 		priceRange: priceRange,
	// 		brands: this.getBrandsListFromForm(brands),
	// 	};

	// 	this.changeFilter.emit(filter);
	// }

	// private getBrandsListFromForm(
	// 	brandsFormValue: Record<string, boolean>,
	// ): IProductsFilter['brands'] {
	// 	return !this.brands
	// 		? []
	// 		: this.brands.filter((_, index) => brandsFormValue[index]);
	// }
}
