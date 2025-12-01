import { Component, inject } from '@angular/core';
import { SessionService, UiHeaderComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-header',
	standalone: true,
	imports: [UiHeaderComponent],
	templateUrl: './demo-header.component.html',
	styleUrl: './demo-header.component.scss'
})
export class DemoHeaderComponent {
	readonly #sessionService = inject(SessionService);
	constructor() {
		this.#sessionService.set('user', 'userTest');
	}
}
