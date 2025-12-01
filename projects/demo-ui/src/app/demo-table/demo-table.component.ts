import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
	getSelectDescription,
	SelectOption,
	TableDirective,
	UiSelectComponent,
	UiTableComponent
} from '@lib-ui-agroseguro';
import { UiButtonComponent } from '../../../../lib-ui-agroseguro/src/components/ui-button/ui-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-demo-table',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		TableDirective,
		UiTableComponent,
		NgTemplateOutlet,
		UiSelectComponent,
		UiButtonComponent
	],
	templateUrl: './demo-table.component.html',
	styleUrl: './demo-table.component.scss'
})
export class DemoTableComponent {
	public headersGroup = signal<any[]>([]);
	public data = signal<any[]>([]);
	public selectData = signal<SelectOption[]>([]);

	constructor() {
		this.headersGroup.set([
			{
				row: [
					{ colspan: 3, name: 'Grupo 1' },
					{ colspan: 2, name: 'Grupo 2' }
				]
			},
			{
				row: [
					{ colspan: 3, name: 'SubGrupo 1' },
					{ colspan: 2, name: 'SubGrupo 2' }
				]
			}
		]);
		this.data.set([
			{ id: 1, selected: false, ordenar: true },
			{ id: 2, selected: false, ordenar: true },
			{ id: 3, selected: false, ordenar: true }
		]);
		this.selectData.set([
			{
				value: 0,
				text: 'SelectOption1'
			},
			{
				value: 1,
				text: 'SelectOption2'
			}
		]);
	}

	itemSelected(event: any) {
		console.log('Item seleccionado ' + event.id);
		console.log(event);
	}

	itemAdd(event: any) {
		let newItem = { id: Math.random(), selected: false, ordenar: false };
		this.data.update((items) => [...items, newItem]);
	}

	selectChanges(event: any, id: number) {
		console.log(getSelectDescription(event));
		console.log(id);
		let item = this.data().find((item) => item.id === id);
		if (item) {
			item.name = getSelectDescription(event);
		}
	}

	showData() {
		console.log(this.data());
	}

	upRow(row: any) {
		console.log(row);
	}

	downRow(row: any) {
		console.log(row);
	}
}
