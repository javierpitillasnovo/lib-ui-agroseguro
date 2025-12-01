import { Component, inject } from '@angular/core';
import { ModalService, UiButtonComponent, UiModalComponent } from '@lib-ui-agroseguro';
import { DemoModalTestComponent } from './demo-modal-test/demo-modal-test.component';

@Component({
	selector: 'app-demo-modal',
	standalone: true,
	imports: [UiModalComponent, UiButtonComponent],
	templateUrl: './demo-modal.component.html',
	styleUrl: './demo-modal.component.scss'
})
export class DemoModalComponent {
	readonly #modalService = inject(ModalService);

	openModal() {
		this.#modalService.open(DemoModalTestComponent, { size: 'l' }).subscribe({
			next: (response: any) => {
				if (response) {
					console.log('Respuesta cuando es:' + response);
				} else {
					console.log('Respuesta cuando es:' + response);
				}
			}
		});
	}
}
