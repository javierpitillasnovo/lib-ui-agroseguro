export interface SelectOption {
	text: string;
	value: any;
}

export interface MultiSelectOption {
	text: string;
	value?: boolean;
}

export interface CheckboxOption {
	value: string;
	checked: boolean;
}
