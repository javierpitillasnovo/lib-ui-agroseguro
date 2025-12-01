import { Component } from '@angular/core';
import { UiSwitchButtonComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-switch-button',
	standalone: true,
	imports: [UiSwitchButtonComponent],
	templateUrl: './demo-switch-button.component.html',
	styleUrl: './demo-switch-button.component.scss'
})
export class DemoSwitchButtonComponent {}
