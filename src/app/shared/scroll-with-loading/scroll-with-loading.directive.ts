import {Directive, HostListener, EventEmitter, Output} from '@angular/core';
import {LoadDirection} from './load-direction.const';
import {goBottomCall, goTopCall} from './utils';

@Directive({
	selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
	@Output() loadData = new EventEmitter<LoadDirection>();

	private prevScrollTop = -1;

	@HostListener('scroll', ['$event.target'])
	onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
		const valueScroll = this.prevScrollTop;

		this.prevScrollTop = scrollTop;

		const differenceDisplay = scrollHeight - clientHeight;

		const isCallAfter = goBottomCall(
			differenceDisplay,
			scrollTop,
			valueScroll,
			this.prevScrollTop,
		);
		if (isCallAfter) {
			this.loadData.emit(LoadDirection.After);
		}

		const isCallBefore = goTopCall(scrollTop, valueScroll, this.prevScrollTop);
		if (isCallBefore) {
			this.loadData.emit(LoadDirection.Before);
		}
	}
}
