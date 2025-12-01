import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	model,
	output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxOption } from '../../interfaces/input.interface';
import { NgClass, NgStyle } from '@angular/common';
import { UiCheckboxComponent } from '../ui-input-checkbox/ui-checkbox.component';
import { getCheckboxValue } from '../../utils/getInputValue';

@Component({
	selector: 'ui-multiCheckbox',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UiMultiCheckboxComponent),
			multi: true
		}
	],
	imports: [NgStyle, NgClass, UiCheckboxComponent],
	templateUrl: './ui-multiCheckbox.component.html',
	styleUrl: './ui-multiCheckbox.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldMultiCheckbox'
	}
})
export class UiMultiCheckboxComponent implements ControlValueAccessor {
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public checkboxOptions = input.required<CheckboxOption[]>(); // Array de opciones
	public align = input<'column' | 'row'>('column');
	public width = input<number | 'full'>(272);
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = model<CheckboxOption[]>([]); //Output para el valor del campo
	public checkboxChanges = output<CheckboxOption[]>(); //Custom Output para evitar conflictos del valueChange

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
		let option = this.checkboxOptions()[index];
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
		this.checkboxChanges.emit(updatedValue);
	}

	onInputBlur(): void {
		this.onTouched();
	}
}
