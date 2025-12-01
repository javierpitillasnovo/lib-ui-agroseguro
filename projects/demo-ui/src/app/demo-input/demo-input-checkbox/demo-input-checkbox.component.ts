import { Component } from '@angular/core';
import { UiCheckboxComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-checkbox',
	standalone: true,
	imports: [UiCheckboxComponent],
	templateUrl: './demo-input-checkbox.component.html',
	styleUrl: './demo-input-checkbox.component.scss'
})
export class DemoInputCheckboxComponent {
	public checkData = ['CheckOption1', 'CheckOption2', 'CheckOption3'];
}
