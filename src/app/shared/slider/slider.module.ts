import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from './slider.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
	declarations: [SliderComponent],
	imports: [CommonModule, MatSliderModule],
	exports: [SliderComponent],
})
export class SliderModule {}
