import { Component, signal } from '@angular/core';
import { UiDataGridComponent } from '@lib-ui-agroseguro';

export interface DataItemI {
	col1: string | null;
	col2: string | null;
	col3: string | null;
}

export class DataItem implements DataItemI {
	col1: string | null = null;
	col2: string | null = null;
	col3: string | null = null;
	constructor(init?: Partial<DataItem>) {
		Object.assign(this, init);
	}
}

@Component({
	selector: 'app-ui-datagrid',
	standalone: true,
	imports: [UiDataGridComponent],
	templateUrl: './demo-datagrid.component.html',
	styleUrl: './demo-datagrid.component.scss'
})
export class DemoDatagridComponent {
	public newItem = new DataItem();
	data = signal<any[]>([
		{ id: 1, col1: 'Data del 1', col2: 'Data del 2', col3: 'Data del 3' },
		{ id: 2, col1: 'Data del 1', col2: 'Data del 2', col3: 'Data del 3' }
	]);
}
