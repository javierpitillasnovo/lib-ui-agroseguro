import { Component } from '@angular/core';
import { UiPasswordComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-password',
	standalone: true,
	imports: [UiPasswordComponent],
	templateUrl: './demo-input-password.component.html',
	styleUrl: './demo-input-password.component.scss'
})
export class DemoInputPasswordComponent {}
