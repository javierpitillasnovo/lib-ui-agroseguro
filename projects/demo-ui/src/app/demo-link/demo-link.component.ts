import { Component } from '@angular/core';
import { UiLinkComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-link',
	standalone: true,
	imports: [UiLinkComponent],
	templateUrl: './demo-link.component.html',
	styleUrl: './demo-link.component.scss'
})
export class DemoLinkComponent {}
