import _debounce from 'lodash.debounce';

export function debounce(delay: number) {
	return (target: any, prop: string) => {
		return {
			configurable: true,
			enumerable: false,
			value: _debounce(target[prop], delay)
		};
	};
}
