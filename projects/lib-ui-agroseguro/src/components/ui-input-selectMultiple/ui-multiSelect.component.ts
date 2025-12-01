import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	inject,
	input,
	model,
	output,
	signal
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { SelectOption } from '../../interfaces/input.interface';
import { getCheckboxValue } from '../../utils/getInputValue';
import { UiCheckboxComponent } from '../ui-input-checkbox/ui-checkbox.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ui-multiSelect',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UiMultiSelectComponent),
			multi: true
		}
	],
	imports: [NgStyle, NgClass, UiCheckboxComponent],
	templateUrl: './ui-multiSelect.component.html',
	styleUrl: './ui-multiSelect.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldMultiSelect',
		'[class.disabled]': 'disabled()',
		'[class.error]': 'error()',
		'[class.dropDownOpen]': 'isDropdownOpen()',
		'(document:click)': 'onClickOutside($event)'
	}
})
export class UiMultiSelectComponent implements ControlValueAccessor {
	readonly #elementRef = inject(ElementRef);
	public placeholder = input<string>(); //Placeholder
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public selectOptions = input.required<SelectOption[]>(); // Array de opciones
	public isDropdownOpen = signal<boolean>(false);
	public align = input<'column' | 'row'>('column');
	public width = input<number | 'full'>(272);
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = model<SelectOption[]>([]); //Output para el valor del campo
	public selectChanges = output<SelectOption[]>(); //Custom Output para evitar conflictos del valueChange

	// Métodos para abrir/cerrar el dropdown
	toggleDropdown(event: Event): void {
		this.isDropdownOpen.set(!this.isDropdownOpen());
	}

	/*Implements ControlValueAccesor*/
	onChange = (value: any) => {};
	onTouched = () => {};

	writeValue(obj: any): void {
		this.value.set(obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	/*Fin Implements ControlValueAccesor*/

	optionChanges(event: Event, index: number) {
		let option = this.selectOptions()[index];
		let isChecked = getCheckboxValue(event);

		// Actualizar las opciones seleccionadas
		let updatedValue = [...(this.value() as any[])];

		if (isChecked) {
			updatedValue.push(option.value);
		} else {
			updatedValue = updatedValue.filter((val) => val !== option.value);
		}

		this.value.set(updatedValue);
		this.onChange(updatedValue);
		this.selectChanges.emit(updatedValue);
	}

	onInputBlur(): void {
		this.onTouched();
	}

	onClickOutside(event: MouseEvent): void {
		// Verificar si el clic ocurrió fuera del componente
		if (!this.#elementRef.nativeElement.contains(event.target)) {
			if (this.isDropdownOpen()) {
				this.isDropdownOpen.set(false);
			}
		}
	}
}
