import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: SliderComponent,
		},
	],
})
export class SliderComponent implements ControlValueAccessor {
	currentIndex = 0;

	valueSlider = 0;

	step = 10;

	isDisabled = false;

	private onChange!: (value: number) => void;
	private onTouch!: () => void;

	constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

	writeValue(value: number): void {
		this.valueSlider = value;
		this.changeDetectorRef.markForCheck();
	}

	registerOnChange(fn: (value: number) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;

		this.changeDetectorRef.markForCheck();
	}

	plus() {
		const newValue = this.valueSlider + this.step;
		if (newValue <= 100) {
			this.valueSlider = newValue;
		}

		this.onChange(this.valueSlider);
		this.onTouch();
	}

	minus() {
		const newValue = this.valueSlider - this.step;
		if (newValue >= 0) {
			this.valueSlider = newValue;
		}

		this.onChange(this.valueSlider);
		this.onTouch();
	}
}
