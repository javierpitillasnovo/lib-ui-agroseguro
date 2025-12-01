interface Row {
	colspan?: number;
	rowspan?: number;
	name?: string;
}

export interface RowGroup {
	row: Row[];
}
