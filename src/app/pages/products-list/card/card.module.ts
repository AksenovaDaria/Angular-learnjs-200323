import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	declarations: [CardComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatPaginatorModule,
		MatIconModule,
	],
	exports: [CardComponent],
})
export class CardModule {}
