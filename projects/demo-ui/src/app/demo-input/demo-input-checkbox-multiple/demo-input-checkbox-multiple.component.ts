import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiMultiCheckboxComponent } from '../../../../../lib-ui-agroseguro/src/public-api';
import { CheckboxOption } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-checkbox-multiple',
	standalone: true,
	imports: [UiMultiCheckboxComponent],
	templateUrl: './demo-input-checkbox-multiple.component.html',
	styleUrl: './demo-input-checkbox-multiple.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoInputCheckboxMultipleComponent {
	public checkBoxData = [
		{
			value: 'CheckBoxOption1',
			checked: false
		},
		{
			value: 'CheckBoxOption2',
			checked: false
		}
	];

	checkboxSelected(event: CheckboxOption[]) {
		console.log(event);
	}
}
