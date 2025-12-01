import { Component } from '@angular/core';
import { UiRadioComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-radio',
	standalone: true,
	imports: [UiRadioComponent],
	templateUrl: './demo-input-radio.component.html',
	styleUrl: './demo-input-radio.component.scss'
})
export class DemoInputRadioComponent {
	public radioData = ['RadioOption1', 'RadioOption2', 'RadioOption3'];
}
