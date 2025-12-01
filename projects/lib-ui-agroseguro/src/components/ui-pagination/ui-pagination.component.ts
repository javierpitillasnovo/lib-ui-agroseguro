import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	model,
	output,
	signal,
	ViewEncapsulation
} from '@angular/core';
import { UiSelectComponent } from '../ui-input-select/ui-select.component';
import { getInputValue } from '../../utils/getInputValue';

@Component({
	selector: 'ui-pagination',
	standalone: true,
	imports: [UiSelectComponent],
	templateUrl: './ui-pagination.component.html',
	styleUrl: './ui-pagination.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'pagination'
	}
})
export class UiPaginationComponent {
	public items = input.required<number>();
	public totalItems = input.required<number>(); //Cantidad total de items
	public pageSize = signal<number>(10); //Cantidad de items por página
	public currentPage = signal<number>(0); //Variable para página actual
	public paginationAction = output<{ pageSize: number; currentPage: number }>(); //Evento que emite cuando se ha hecho click en la paginación

	//Operaciones paginación
	public rowsPerPageOptions = signal<any[]>([
		//Opciones del select
		{ value: 10, text: '10' },
		{ value: 15, text: '15' },
		{ value: 20, text: '20' }
	]);
	//Total de registros
	public totalItemsComputed = computed(() => {
		if (this.totalItems() === 0) {
			return this.items();
		}
		return this.totalItems();
	});
	//Total de páginas
	public totalPages = computed(() => {
		return Math.ceil(this.totalItemsComputed() / this.pageSize());
	});
	// Calcula el índice inicial de la página actual
	public startIndex = computed(() => {
		return this.currentPage() * this.pageSize();
	});
	// Calcula el índice final de la página actual
	public endIndex = computed(() => {
		if (this.currentPage() === this.totalPages() - 1) {
			return this.totalItems();
		}
		return this.startIndex() + this.pageSize();
	});

	//Función del select de número de registros por página
	rowPerPageChange(event: Event) {
		this.pageSize.set(Number(getInputValue(event)));
		this.paginationAction.emit({ pageSize: this.pageSize(), currentPage: this.currentPage() });
	}

	//Paginación función página anterior
	previous() {
		this.currentPage.set(this.currentPage() - 1);
		this.paginationAction.emit({ pageSize: this.pageSize(), currentPage: this.currentPage() });
	}

	//Paginación función página siguiente
	next() {
		this.currentPage.set(this.currentPage() + 1);
		this.paginationAction.emit({ pageSize: this.pageSize(), currentPage: this.currentPage() });
	}
}
