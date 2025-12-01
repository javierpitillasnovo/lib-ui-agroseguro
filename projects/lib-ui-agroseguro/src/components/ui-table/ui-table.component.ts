import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	computed,
	contentChildren,
	effect,
	input,
	model,
	output,
	signal
} from '@angular/core';
import { TableDirective } from '../../directives/table.directive';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { UiCheckboxComponent } from '../ui-input-checkbox/ui-checkbox.component';
import { UiSelectComponent } from '../ui-input-select/ui-select.component';
import { UiRadioComponent } from '../ui-input-radio/ui-radio.component';
import { getCheckboxValue, getInputValue } from '../../utils/getInputValue';
import { RowGroup } from '../../interfaces/table.interface';

@Component({
	selector: 'ui-table',
	standalone: true,
	imports: [
		UiCheckboxComponent,
		UiRadioComponent,
		NgTemplateOutlet,
		UiSelectComponent,
		NgClass,
		NgStyle
	],
	templateUrl: './ui-table.component.html',
	styleUrl: './ui-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'tableBasic',
		'[class.showPag]': 'showPagination()',
		'[class.showHeader]': 'title()',
		'[class.headersGroups]': 'headersGroups()',
		'[class.hasError]': 'hasError()'
	}
})
export class UiTableComponent {
	public templates = contentChildren(TableDirective);

	//Inputs del componente
	public dataOriginal = input.required<any[]>(); //Datos de la tabla
	public title = input<string>(); //Titulo de la tabla
	public headersGroups = input<RowGroup[]>(); //Grupos de cabeceras
	public filterId = input<string>(''); //Id por el que vamos a a matchear el id de cada item
	public defaultActions = input<false | 'checkbox' | 'radio'>('checkbox'); // Signal enum para mostrar a no las acciones por defecto
	public showAddButton = input<boolean>(false); // Boolean para ver el botón de añadir o no
	public showPagination = input<boolean>(false); //Bolean para ver la paginación o no
	public pageSize = model<number>(10); //Cantidad de items por página
	public currentPage = model<number>(0); //Variable para página actual
	public totalItems = input<number>(0);
	public hasError = input<boolean>(false);

	/// Outputs del componente
	public itemSelected = output<{ id: number; selected: boolean }>();
	public itemAdd = output<boolean>();
	public paginationAction = output<boolean>();

	//Operaciones paginación
	public rowsPerPageOptions = signal<any[]>([
		//Opciones del select
		{ value: 10, text: '10' },
		{ value: 15, text: '15' },
		{ value: 20, text: '20' }
	]);
	public totalItemsComputed = computed(() => {
		if (this.totalItems() === 0) {
			return this.dataOriginal().length;
		}
		return this.totalItems();
	});
	public totalPages = computed(() => {
		//Total de páginas
		return Math.ceil(this.totalItemsComputed() / this.pageSize());
	});
	// Calcula el índice inicial de la página actual
	public startIndex = computed(() => {
		return this.currentPage() * this.pageSize();
	});

	// Calcula el índice final de la página actual
	public endIndex = computed(() => {
		if (this.currentPage() === this.totalPages() - 1) {
			return this.dataOriginal().length;
		}
		return this.startIndex() + this.pageSize();
	});

	public data = computed(() => {
		let filterIdValue = this.filterId(); // Almacenar filterId una sola vez

		return this.dataOriginal().map((item) => ({
			...item,
			id:
				item.id ||
				(filterIdValue && item[filterIdValue] != null
					? item[filterIdValue]
					: Math.floor(Math.random() * 1000000))
		}));
	});

	//Función llamada al seleccionar una fila
	onRowSelect(event: any, id: number) {
		let selected!: boolean;
		if (this.defaultActions() === 'checkbox') {
			selected = getCheckboxValue(event);
		} else if (this.defaultActions() === 'radio') {
			selected = true;
		}
		this.itemSelected.emit({ id: id, selected: selected });
	}

	//Función llamada por el icono de añadir una nueva fila
	addRow() {
		this.itemAdd.emit(true);
	}

	//Función del select de número de registros por página
	rowPerPageChange(event: Event) {
		this.pageSize.set(Number(getInputValue(event)));
		this.paginationAction.emit(true);
	}

	//Paginación función página anterior
	previous() {
		this.currentPage.set(this.currentPage() - 1);
		this.paginationAction.emit(true);
	}

	//Paginación función página siguiente
	next() {
		this.currentPage.set(this.currentPage() + 1);
		this.paginationAction.emit(true);
	}
}
