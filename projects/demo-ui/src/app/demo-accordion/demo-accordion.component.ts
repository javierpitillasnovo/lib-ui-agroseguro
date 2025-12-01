import { Component } from '@angular/core';
import { UiAccordionComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-accordion',
	standalone: true,
	imports: [UiAccordionComponent],
	templateUrl: './demo-accordion.component.html',
	styleUrl: './demo-accordion.component.scss'
})
export class DemoAccordionComponent {}
