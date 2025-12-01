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

@Component({
	selector: 'ui-password',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiPasswordComponent)
		}
	],
	templateUrl: './ui-password.component.html',
	styleUrl: './ui-password.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldPassword',
		'[class.error]': 'error()'
	}
})
export class UiPasswordComponent implements ControlValueAccessor {
	public placeholder = input<string>(); //Placeholder
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public value = signal<string>(''); //Output para el valor del campo
	public showPass: boolean = false; //Boolean para controlar si se ve la pass o no
	public typeForPass: string = 'password'; //Variable para cambiar el tipo del campo passowrd, funcionalidad de ver o ocultar la misma, sin afectar el tipo de campo
	public passwordChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange

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
		this.passwordChanges.emit(event);
	}

	/*Fin Implements ControlValueAccesor*/

	onShowPass() {
		this.showPass = !this.showPass;
		if (this.typeForPass === 'password') {
			this.typeForPass = 'text';
		} else {
			this.typeForPass = 'password';
		}
	}

	onInputBlur(): void {
		this.onTouched();
	}
}
