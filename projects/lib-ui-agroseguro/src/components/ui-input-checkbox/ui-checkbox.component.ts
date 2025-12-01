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
import { getCheckboxValue } from '../../utils/getInputValue';
import { NgClass, NgStyle } from '@angular/common';

@Component({
	selector: 'ui-checkbox',
	standalone: true,
	imports: [NgClass, NgStyle],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiCheckboxComponent)
		}
	],
	templateUrl: './ui-checkbox.component.html',
	styleUrl: './ui-checkbox.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldCheckbox',
		'[class.disabled]': 'disabled()',
		'[class.error]': 'error()'
	}
})
export class UiCheckboxComponent implements ControlValueAccessor {
	public label = input<string>(); //Etiqueta
	public helpText = input<string>(); //Texto de ayuda
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public align = input<'column' | 'row'>('column');
	public text = input<string>(); //Texto del checkbox
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public checked = model<boolean>(false); //Output para el valor del campo
	public checkboxChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange

	/*Implements ControlValueAccesor*/
	onChange = (value: any) => {};
	onTouched = () => {};

	writeValue(obj: any): void {
		this.checked.set(obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onInputChange(event: Event): void {
		this.checked.set(getCheckboxValue(event));
		this.onChange(getCheckboxValue(event));
		this.checkboxChanges.emit(event);
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	/*Fin Implements ControlValueAccesor*/

	onInputBlur(): void {
		this.onTouched();
	}
}
