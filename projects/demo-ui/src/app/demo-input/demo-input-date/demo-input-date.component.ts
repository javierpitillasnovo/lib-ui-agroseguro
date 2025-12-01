import { Component } from '@angular/core';
import { UiDateComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-date',
	standalone: true,
	imports: [UiDateComponent],
	templateUrl: './demo-input-date.component.html',
	styleUrl: './demo-input-date.component.scss'
})
export class DemoInputDateComponent {}
