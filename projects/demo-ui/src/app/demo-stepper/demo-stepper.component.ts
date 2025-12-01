import { Component } from '@angular/core';
import { StepTemplateDirective, UiStepperComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-stepper',
	standalone: true,
	imports: [UiStepperComponent, StepTemplateDirective],
	templateUrl: './demo-stepper.component.html',
	styleUrl: './demo-stepper.component.scss'
})
export class DemoStepperComponent {
	public steps = [
		{ number: 1, title: 'Step1' },
		{ number: 2, title: 'Step2' },
		{ number: 3, title: 'Step3' }
	];
}
