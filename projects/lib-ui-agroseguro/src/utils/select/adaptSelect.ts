import { SelectOption } from '../../interfaces/input.interface';

/*export function adaptSelect<T extends Record<string, any>>(items: T[]): SelectOption[] {
	return items.map((item) => {
		let keys = Object.keys(item);
		return {
			value: item[keys[0]],
			text: item[keys[1]]
		};
	});
}*/

export function adaptSelect<T extends Record<string, any>>(
	items: T[],
	valueKey: keyof T,
	textKey: keyof T
): SelectOption[] {
	return items.map((item) => ({
		value: typeof item[valueKey] === 'string' ? item[valueKey].trim() : item[valueKey],
		text: typeof item[textKey] === 'string' ? item[textKey].trim() : item[textKey]
	}));
}
