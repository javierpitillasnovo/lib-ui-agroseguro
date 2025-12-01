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
import { getInputValue } from '../../utils/getInputValue';
import { NgClass, NgStyle } from '@angular/common';

@Component({
	selector: 'ui-input',
	standalone: true,
	imports: [NgClass, NgStyle],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiInputComponent)
		}
	],
	templateUrl: './ui-input.component.html',
	styleUrl: './ui-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldText',
		'[class.fieldText--disabled]': 'disabled()',
		'[class.fieldText--error]': 'error()',
		'[class.fieldText--selected]': 'selected()',
		'[class.fieldText--iFirst]': 'iconFirst()'
	}
})
export class UiInputComponent implements ControlValueAccessor {
	public placeholder = input<string>(); //Placeholder
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public icon = input<string>(); //Icono
	public iconFirst = input<boolean>(false);
	public align = input<'column' | 'row'>('column');
	public width = input<number>(164);
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = model<string>(''); //Output para el valor del campo
	public inputChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange
	public selected = model<boolean>(false); //Model para saber si el campo esta o no seleccionado
	public iconClicked = output<boolean>(); //Evento que emite cuando se hace click en el icono

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
		this.value.set(getInputValue(event));
		this.onChange(getInputValue(event));
		this.inputChanges.emit(event);
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	/*Fin Implements ControlValueAccesor*/

	onInputBlur(): void {
		this.onTouched();
	}
}
