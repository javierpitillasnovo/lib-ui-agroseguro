import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	UiButtonComponent,
	UiCheckboxComponent,
	UiDateComponent,
	UiInputComponent,
	UiFileUploadComponent,
	UiPasswordComponent,
	UiRadioComponent,
	UiSelectComponent,
	UiTextareaComponent,
	UiMultiSelectComponent
} from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		UiInputComponent,
		UiSelectComponent,
		UiMultiSelectComponent,
		UiRadioComponent,
		UiCheckboxComponent,
		UiButtonComponent,
		UiPasswordComponent,
		UiTextareaComponent,
		UiFileUploadComponent,
		UiDateComponent
	],
	templateUrl: './demo-forms.component.html',
	styleUrl: './demo-forms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFormsComponent {
	public form!: FormGroup;
	formSubmitted = signal<boolean>(false);
	public selectData = [
		{
			value: 0,
			text: 'SelectOption1'
		},
		{
			value: 1,
			text: 'SelectOption2'
		}
	];
	public radioData = ['RadioOption1', 'RadioOption2', 'RadioOption3'];

	constructor() {
		this.form = new FormGroup({
			textNormal: new FormControl('', [Validators.required]),
			contrasena: new FormControl(''),
			textLectura: new FormControl({ value: 'Valor del campo', disabled: true }),
			select: new FormControl('', [Validators.required]),
			multiSelect: new FormControl('', [Validators.required]),
			checkbox: new FormControl('', [Validators.required]),
			radio: new FormControl('', [Validators.required]),
			fecha: new FormControl({ value: '2024-12-18', disabled: true }, [Validators.required]),
			textArea: new FormControl('', [Validators.required]),
			fileUpload: new FormControl('', [Validators.required])
		});
	}

	onSubmit() {
		this.formSubmitted.set(true);
		console.log(this.form);
	}
}
