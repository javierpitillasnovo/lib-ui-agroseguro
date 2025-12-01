import { Component } from '@angular/core';
import { UiButtonComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-button',
	standalone: true,
	imports: [UiButtonComponent],
	templateUrl: './demo-button.component.html',
	styleUrl: './demo-button.component.scss'
})
export class DemoButtonComponent {}
