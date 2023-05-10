const borderOffset = 100;

export function goBottomCall(
	differenceDisplay: number,
	scrollTop: number,
	valueScroll: number,
	prevScrollTop: number,
) {
	if (differenceDisplay - scrollTop < borderOffset && valueScroll < prevScrollTop) {
		return true;
	} else {
		return false;
	}
}

export function goTopCall(scrollTop: number, valueScroll: number, prevScrollTop: number) {
	if (scrollTop < borderOffset && valueScroll > prevScrollTop) {
		return true;
	} else {
		return false;
	}
}
