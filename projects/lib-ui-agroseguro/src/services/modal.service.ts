import { Injectable, ComponentRef, inject, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewContainerRef } from '@angular/core';
import { UiModalComponent } from '../components/ui-modal/ui-modal.component';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	#injector = inject(Injector);
	#modalRefs: ComponentRef<UiModalComponent>[] = [];
	#modalResults: Subject<any>[] = []; // Array de Subjects
	#vcr!: ViewContainerRef;

	setViewContainerRef(vcr: ViewContainerRef) {
		this.#vcr = vcr;
	}

	open(component: any, params?: any): Subject<any> {
		let modalResult = new Subject<any>(); // Crear un nuevo Subject para el modal

		let modalRef = this.#vcr.createComponent(UiModalComponent, {
			injector: this.#injector
		});

		// Asignar tamaño al modal
		if (params?.size) {
			modalRef.instance.size = params.size;
		}

		// Insertar el componente dinámico con parámetros
		setTimeout(() => {
			modalRef.instance.insertComponent(component, params);
			let modalElement = modalRef.location.nativeElement;
			document.querySelector('#main')?.appendChild(modalElement);
		});

		this.#modalRefs.push(modalRef);
		this.#modalResults.push(modalResult); // Añadir el Subject al array

		return modalResult;
	}

	close(result?: any) {
		let modalResult = this.#modalResults.pop();
		if (modalResult) {
			if (result !== undefined) {
				modalResult.next(result);
			}
			modalResult.complete(); // Completar el Subject
		}

		let modalRef = this.#modalRefs.pop();
		if (modalRef) {
			setTimeout(() => {
				modalRef.destroy(); // Destruir el modal
			});
		}
	}
}
