import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation
} from '@angular/core';
import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
	selector: 'ui-modal',
	standalone: true,
	imports: [NgClass, NgTemplateOutlet, NgComponentOutlet],
	templateUrl: './ui-modal.component.html',
	styleUrl: './ui-modal.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'modal'
	}
})
export class UiModalComponent {
	readonly #modalService = inject(ModalService);
	@ViewChild('dynamicContainer', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef; //Referencia del dynamicContainer del html
	public size = input<'xl' | 'l'>(); //Variable para controlar el tamaño de la modal por css

	//Función llamada para emitir el cierre de la modal
	closeModal(result?: any) {
		this.#modalService.close(result);
	}

	insertComponent<T extends object>(component: any, params: Partial<T>) {
		//Creamos el componente
		let componentRef = this.viewContainerRef.createComponent(component as any);
		//Le asignamos los parametros
		Object.assign(componentRef.instance as T, params);

		// Acceder a la instancia del componente dinámico
		let instance = componentRef.instance as any;

		// Suscribirse al Output del componente dinámico
		if (instance.modalOutput) {
			instance.modalOutput.subscribe((result: any) => {
				this.closeModal(result);
			});
		}
	}
}
