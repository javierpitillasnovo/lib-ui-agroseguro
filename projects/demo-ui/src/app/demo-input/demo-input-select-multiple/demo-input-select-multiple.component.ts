import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectOption, UiMultiSelectComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-select-multiple',
	standalone: true,
	imports: [UiMultiSelectComponent],
	templateUrl: './demo-input-select-multiple.component.html',
	styleUrl: './demo-input-select-multiple.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoInputSelectMultipleComponent {
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
	selectedOption(event: SelectOption[]) {
		console.log(event);
	}
}
