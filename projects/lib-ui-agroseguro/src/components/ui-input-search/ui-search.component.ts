import { NgClass } from '@angular/common';
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
	selector: 'ui-search',
	standalone: true,
	imports: [NgClass],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiSearchComponent)
		}
	],
	templateUrl: './ui-search.component.html',
	styleUrl: './ui-search.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'fieldSearch'
	}
})
export class UiSearchComponent implements ControlValueAccessor {
	public placeholder = input<string>(); //Placeholder
	public icon = input<string>(); //Icono
	public value = signal<string>(''); //Output para el valor del campo
	public searchChanges = output<Event>(); //Custom Output para evitar conflictos del valueChange

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
		this.searchChanges.emit(event);
	}

	/*Fin Implements ControlValueAccesor*/

	onInputBlur(): void {
		this.onTouched();
	}
}
