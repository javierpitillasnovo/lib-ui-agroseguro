import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewEncapsulation,
	computed,
	effect,
	inject,
	input,
	model,
	output,
	signal
} from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule
} from '@angular/forms';
import { fieldsToShow } from '../../interfaces/datagrid.interface';
import { UiCheckboxComponent } from '../ui-input-checkbox/ui-checkbox.component';
import { UiSelectComponent } from '../ui-input-select/ui-select.component';
import { getInputValue, getCheckboxValue } from '../../utils/getInputValue';
import { UiInputComponent } from '../ui-input/ui-input.component';
import { getSelectDescription } from '../../utils/select/getSelectDescription';
import { ModalService } from '../../services/modal.service';
import { ModalAccionesDatagridComponent } from './modal-acciones/modal-acciones.component';

@Component({
	selector: 'ui-datagrid',
	standalone: true,
	imports: [NgClass, ReactiveFormsModule, UiCheckboxComponent, UiInputComponent, UiSelectComponent],
	templateUrl: './ui-datagrid.component.html',
	styleUrl: './ui-datagrid.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'datagrid',
		'[class.showPag]': 'showPagination()',
		'[class.showHeader]': 'title()'
	}
})
export class UiDataGridComponent {
	//Servicios
	readonly #fb = inject(FormBuilder);
	readonly #modalService = inject(ModalService);

	public formItsBuilded: boolean = false;
	public formDatagrid: FormGroup; //Formulario
	public currentAction = signal<string>(''); //Variable para saber que acción hemos hecho

	//Inputs del componente
	public title = input<string>(); //Titulo de la tabla
	public filterId = input<string>(); //Id por el que vamos a a matchear el id de cada item
	public showAddButton = model<boolean>(true); //Boolean para ver el botón de añadir o no
	public showPagination = input<boolean>(false); //Bolean para ver la paginación o no
	public disabled = input<boolean>(false); //Boolean para añadir el estilo disabled a la tabla
	public headers = input.required<string[]>(); //Headers
	public dataOriginal = model<any[]>([]); //Datos de la tabla
	public newItem = input.required<any>(); //Item que se utiliza al añadir un nuevo registro
	public fieldsToShow = input.required<fieldsToShow[]>(); //Campos que se van a ver en la tabla
	public pageSize = model<number>(10); //Cantidad de items por página
	public currentPage = model<number>(0); //Variable para página actual
	public totalItems = input<number>(0); //Cantidad total de items

	/// Outputs del componente
	public itemSelected = output<any>(); //Evento que emite el item seleccionado, al hacer click en un checkbox
	public itemAdd = output<boolean>(); //Evento que emite que se ha añadido un nuevo registro
	public itemSave = output<any>(); //Evento que emite el registro modificado
	public itemDelete = output<any>(); ///Evento que emite que se ha eliminado un registro
	public anySelectChange = output<{ value: any; selectName: string }>(); //Evento que emite cuando cambia el valor de cualqier select en un registro
	public paginationAction = output<boolean>(); //Evento que emite cuando se ha hecho click en la paginación

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
			return this.dataOriginal().length;
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
			return this.dataOriginal().length;
		}
		return this.startIndex() + this.pageSize();
	});

	get fieldsArray(): FormArray {
		return this.formDatagrid.get('fieldsArray') as FormArray;
	}

	constructor() {
		//Inicializador form
		this.formDatagrid = this.#fb.group({
			fieldsArray: this.#fb.array([])
		});

		effect(
			() => {
				//Solo llamamos a transformData si el length es mayor a 0 Y si la data necesita transformación
				if (this.dataOriginal().length > 0 && this.dataNeedsTransformation()) {
					this.transformData();
				}
			},
			{ allowSignalWrites: true }
		);
	}

	// Método para determinar si se necesita transformar la data
	dataNeedsTransformation() {
		return this.dataOriginal().some((item) => item.id == null || item.idForFormArray == null);
	}

	//Función que transforma la data y le asigna un id y un idForFormArray para el correcto funcionamiento del componente
	transformData() {
		let filterIdValue = this.filterId(); // Almacenar el valor de filterId una sola vez
		let idFA = 0; // Inicializar idFA

		this.dataOriginal.update((items) =>
			items.map((item) => {
				let currentIdFA = idFA;
				idFA++;

				let itemId =
					item.id ||
					(filterIdValue && item[filterIdValue] != null
						? item[filterIdValue]
						: Math.floor(Math.random() * 1000000));

				let itemIdForFormArray = item.idForFormArray ?? currentIdFA;

				// Retornar el objeto actualizado
				return {
					...item,
					id: itemId,
					idForFormArray: itemIdForFormArray
				};
			})
		);
		this.formItsBuilded = false;
		this.buildForm(this.dataOriginal());
	}

	//Función que genera los campos del form y les pone el valor
	buildForm(data: any) {
		this.fieldsArray.clear();
		data.forEach((row: any) => {
			let formfields = this.#fb.group({});
			Object.keys(row).forEach((key) => {
				formfields.addControl(key, new FormControl(row[key]));
			});
			this.fieldsArray.push(formfields);
		});
		this.formItsBuilded = true;
	}

	//Función llamada por el icono de añadir una nueva fila
	addRow() {
		this.showAddButton.set(!this.showAddButton());
		this.currentAction.set('add');

		//Si el número de items del array es mayor que el numero de filas a mostrar, cambiamos de página
		if (this.fieldsArray.length + 1 > this.pageSize()) this.currentPage.set(this.currentPage() + 1);

		//Update de la data
		this.dataOriginal.update((items) => {
			return [
				...items.map((item) => ({
					...item,
					disabled: !item.disabled // Invertir disabled o añadirlo
				})),
				{ ...this.newItem(), selected: true, edit: true, disabled: false } // Añadir el nuevo elemento
			];
		});

		//Emisión del Add
		this.itemAdd.emit(true);
	}

	//Función llamada por el checkbox
	onRowSelect(row: any, event: Event, index: any) {
		this.showAddButton.set(!this.showAddButton());
		this.currentAction.set('edit');

		//Update de la data
		this.dataOriginal.update((items) => {
			return items.map((item) => {
				if (item.id === row.id) {
					// Si es el seleccionado, mantenemos su estado original, lo seleccionamos y lo marcamos como no deshabilitado
					return { ...item, selected: getCheckboxValue(event), disabled: false };
				} else {
					//Si no lo es, lo marcamos como deshabilitado
					return { ...item, disabled: !item.disabled };
				}
			});
		});

		//Emisión de selección para eventos necesarios al seleccionar un item fuera del datagrid
		if (getCheckboxValue(event) === true) this.itemSelected.emit(row);
	}

	//Función llamada por el icono de guardar (por fila)
	onRowSave(row: any) {
		//Recupera el control asociado al index de los fieldsArray definidos
		let itemControls = this.fieldsArray.at(row.idForFormArray) as FormGroup;

		//Pone el valor a la fila según el valor del control, esto es para que cuando deje de estar seleccionada se muestren valores correctamente, si no tendriamos celdas vacias.
		for (let key in itemControls.controls) {
			if (row.hasOwnProperty(key)) {
				row[key] = itemControls.get(key)?.value;
			}
		}

		//this.onRowSelect(row, undefined, row.selected);
		this.itemSave.emit(row);
		this.showAddButton.set(!this.showAddButton());
	}

	//Función llamada por el icono de cancelar (por fila)
	onRowCancel(row: any) {
		if (this.currentAction() === 'add') {
			this.dataOriginal.update((items) => {
				return items
					.slice(0, -1) // Eliminar el último elemento
					.map((item) => ({
						...item,
						disabled: !item.disabled // Invertir disabled
					}));
			});
			//Si el número de items del array es igual que el numero de filas a mostrar, cambiamos de página
			if (this.fieldsArray.length - 1 === this.pageSize())
				this.currentPage.set(this.currentPage() - 1);
		}
		if (this.currentAction() === 'edit') {
			this.dataOriginal.update((items) => {
				return items.map((item) => {
					if (item.id === row.id) {
						// Si es el seleccionado, mantenemos su estado original y lo marcamos como no seleccionado
						return { ...item, selected: !row.selected };
					} else {
						//Si no lo es, hacemos la negación del valor del deshabilitado
						return { ...item, disabled: !item.disabled };
					}
				});
			});
		}
		this.showAddButton.set(!this.showAddButton());
	}

	//Función llamada por el icono de borrar (por fila)
	onRowDelete(row: any) {
		this.#modalService
			.open(ModalAccionesDatagridComponent, { actionType: signal('eliminar') })
			.subscribe({
				next: (response: any) => {
					if (response) this.itemDelete.emit(row);
					//Si el número de items del array es igual que el numero de filas a mostrar, cambiamos de página
					if (this.fieldsArray.length - 1 === this.pageSize())
						this.currentPage.set(this.currentPage() - 1);
				}
			});
	}

	//Función que se llama cuando cualquier select de una fila cambia
	selectChanges(event: Event, fieldToShow: any, row: any) {
		//Recupera el control asociado al index de los fieldsArray definidos
		let itemControls = this.fieldsArray.at(row.idForFormArray) as FormGroup;

		// Actualiza el valor correspondiente a la descripcion del campo, para que cuando deje de estar selccionada se muestren valores correctamente, si no tendriamos celdas vacias.
		itemControls.get(fieldToShow.name)?.setValue(getSelectDescription(event), { emitEvent: true });

		this.anySelectChange.emit({ value: getInputValue(event), selectName: fieldToShow.name });
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
