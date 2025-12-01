import { Component } from '@angular/core';
import { UiTextareaComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-textarea',
	standalone: true,
	imports: [UiTextareaComponent],
	templateUrl: './demo-input-textarea.component.html',
	styleUrl: './demo-input-textarea.component.scss'
})
export class DemoInputTextareaComponent {}
