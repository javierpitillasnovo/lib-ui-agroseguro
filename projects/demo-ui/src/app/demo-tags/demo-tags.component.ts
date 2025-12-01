import { Component } from '@angular/core';
import { UiTagComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-tag',
	standalone: true,
	imports: [UiTagComponent],
	templateUrl: './demo-tags.component.html',
	styleUrl: './demo-tags.component.scss'
})
export class DemoTagsComponent {}
