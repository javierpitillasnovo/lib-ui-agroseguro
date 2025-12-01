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
	selector: 'ui-date',
	standalone: true,
	imports: [NgClass, NgStyle],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiDateComponent)
		}
	],
	templateUrl: './ui-date.component.html',
	styleUrl: './ui-date.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldDate',
		'[class.fieldDate--disabled]': 'disabled()',
		'[class.fieldDate--error]': 'error()'
	}
})
export class UiDateComponent implements ControlValueAccessor {
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public align = input<'column' | 'row'>('column');
	public width = input<number>(164);
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = model<string>(''); //Output para el valor del campo
	public dateChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange

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
		this.dateChanges.emit(event);
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	/*Fin Implements ControlValueAccesor*/

	onInputBlur(): void {
		this.onTouched();
	}
}
