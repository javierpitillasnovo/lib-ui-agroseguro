import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	model,
	output,
	signal,
	ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../interfaces/input.interface';
import { getInputValue } from '../../utils/getInputValue';
import { NgClass, NgStyle } from '@angular/common';

@Component({
	selector: 'ui-select',
	standalone: true,
	imports: [NgClass, NgStyle],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiSelectComponent)
		}
	],
	templateUrl: './ui-select.component.html',
	styleUrl: './ui-select.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldSelect',
		'[class.disabled]': 'disabled()',
		'[class.error]': 'error()'
	}
})
export class UiSelectComponent implements ControlValueAccessor {
	public placeholder = input<string>(); //Placeholder
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public selectOptions = input.required<SelectOption[]>(); //Array de opciones para los select
	public align = input<'column' | 'row'>('column');
	public width = input<number | 'full'>(190);
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = model<string | number>(''); //Output para el valor del campo
	public selectChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange

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

	onInputChange(event: Event): void {
		let inputValue = getInputValue(event);

		if (inputValue !== null && inputValue !== '') {
			this.value.set(inputValue);
			this.onChange(inputValue);
			this.selectChanges.emit(event);
		}
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	/*Fin Implements ControlValueAccesor*/

	onInputBlur(): void {
		this.onTouched();
	}
}
