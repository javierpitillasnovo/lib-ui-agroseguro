import { Component } from '@angular/core';
import { UiInputComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-text',
	standalone: true,
	imports: [UiInputComponent],
	templateUrl: './demo-input-text.component.html',
	styleUrl: './demo-input-text.component.scss'
})
export class DemoInputTextComponent {}
