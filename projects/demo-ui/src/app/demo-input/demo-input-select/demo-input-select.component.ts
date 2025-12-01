import { Component } from '@angular/core';
import { getInputValue, UiSelectComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-select',
	standalone: true,
	imports: [UiSelectComponent],
	templateUrl: './demo-input-select.component.html',
	styleUrl: './demo-input-select.component.scss'
})
export class DemoInputSelectComponent {
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

	selectChange(event: Event) {
		console.log(getInputValue(event));
	}
}
