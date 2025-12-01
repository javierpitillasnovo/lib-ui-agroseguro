import { Injectable, ComponentRef, Injector, inject, ViewContainerRef } from '@angular/core';
import { UiNotificationComponent } from '../components/ui-notification/ui-notification.component';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	#injector = inject(Injector);
	#vcr!: ViewContainerRef;

	setViewContainerRef(vcr: ViewContainerRef) {
		this.#vcr = vcr;
	}

	showNotification(params: any) {
		// Crear instancia del componente de notificación
		let notificationRef = this.#vcr.createComponent(UiNotificationComponent, {
			injector: this.#injector
		});

		// Asignar los inputs
		notificationRef.instance.message = params.message;
		notificationRef.instance.hasError = params.hasError;
		notificationRef.instance.notificationRef = notificationRef;

		// Insertar el componente en el DOM
		let notificationElement = notificationRef.location.nativeElement;
		document.querySelector('#notifications')?.appendChild(notificationElement);

		// Configurar la eliminación automática después de unos segundos
		if (params.autoClear) setTimeout(() => this.removeNotification(notificationRef), 3000); // 3 segundos
	}

	removeNotification(notification: ComponentRef<UiNotificationComponent>) {
		// Eliminar la notificación del DOM
		if (notification) {
			notification.hostView.destroy();
		}
	}
}
