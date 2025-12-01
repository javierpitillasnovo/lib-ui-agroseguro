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
	selector: 'ui-radio',
	standalone: true,
	imports: [NgClass, NgStyle],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiRadioComponent)
		}
	],
	templateUrl: './ui-radio.component.html',
	styleUrl: './ui-radio.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldRadio',
		'[class.disabled]': 'disabled()',
		'[class.error]': 'error()'
	}
})
export class UiRadioComponent implements ControlValueAccessor {
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public align = input<'column' | 'row'>('column');
	public options = input.required<any[]>(); //Array de opciones para radios
	public optionsLabels = input<boolean>(); //Labels
	public name = input.required<string>(); //Nombre para los checkbox
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = model<string>(''); //Output para el valor del campo
	public radioChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange

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
		this.radioChanges.emit(event);
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	/*Fin Implements ControlValueAccesor*/

	onInputBlur(): void {
		this.onTouched();
	}
}
