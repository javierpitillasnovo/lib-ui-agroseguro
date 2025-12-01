import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	model,
	output,
	ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ui-input-fileUpload',
	standalone: true,
	imports: [NgClass],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UiFileUploadComponent),
			multi: true
		}
	],
	templateUrl: './ui-fileUpload.component.html',
	styleUrl: './ui-fileUpload.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldFileupload',
		'[class.fieldFileupload--disabled]': 'disabled()',
		'[class.fieldFileupload--error]': 'error()'
	}
})
export class UiFileUploadComponent implements ControlValueAccessor {
	public label = input<string>(); //Etiqueta
	public required = input<boolean>(false); //Para mostrar el * de requerido
	public disabled = model<boolean>(false); //Propiedad para controlar el estado disabled
	public align = input<'column' | 'row'>('column');
	public error = input<boolean>(); //Propiedad para controlar los estados de error
	public errorMessage = input<string>(); //Texto del mensaje de error
	public fileUploadChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange
	public file: File | null = null;

	/*Implements ControlValueAccesor*/
	onChange: (file: File | null) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(file: File | null): void {
		this.file = file;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onFileChange(event: Event): void {
		let input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.file = input.files[0];
			this.onChange(this.file); // Notificamos al formulario del cambio
			this.fileUploadChanges.emit(event);
		} else {
			this.file = null;
			this.onChange(null);
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
