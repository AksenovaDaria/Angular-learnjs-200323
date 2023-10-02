import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
	@Input() isOpened!: boolean;

	@Output() isOpenedChange = new EventEmitter<boolean>();

	// инвертированное значение
	toggleSidenavOpened() {
		this.isOpenedChange.emit(!this.isOpened);
		// this.isSidenavOpened = !this.isSidenavOpened
	}
}
