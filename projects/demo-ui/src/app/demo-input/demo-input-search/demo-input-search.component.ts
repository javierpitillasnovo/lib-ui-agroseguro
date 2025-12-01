import { Component } from '@angular/core';
import { UiSearchComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-search',
	standalone: true,
	imports: [UiSearchComponent],
	templateUrl: './demo-input-search.component.html',
	styleUrl: './demo-input-search.component.scss'
})
export class DemoInputSearchComponent {}
