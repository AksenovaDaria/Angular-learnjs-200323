import {
	Component,
	Input,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

@Component({
	selector: 'app-popup-host',
	templateUrl: './popup-host.component.html',
	styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
	@Input() template: TemplateRef<any> | null = null;

	@ViewChild('viewport', {read: ViewContainerRef, static: true})
	private viewport!: ViewContainerRef;

	deleteModal = true;

	ngOnChanges({template}: SimpleChanges): void {
		if (template) {
			this.showModal(this.template);
		}
	}

	private showModal(template: TemplateRef<any> | null) {
		if (template) {
			this.deleteModal = false;
			this.viewport.createEmbeddedView(template);
		} else {
			this.viewport.clear();
			this.deleteModal = true;
		}
	}
}
