import { Component, inject, signal, ViewContainerRef } from '@angular/core';
import { NotificationService, UiButtonComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-notifications',
	standalone: true,
	imports: [UiButtonComponent],
	templateUrl: './demo-notifications.component.html',
	styleUrl: './demo-notifications.component.scss'
})
export class DemoNotificationsComponent {
	readonly #viewContainerRef = inject(ViewContainerRef);
	readonly #notificationService = inject(NotificationService);

	showNotification(message: string, hasError: boolean) {
		this.#notificationService.showNotification({
			message: signal(message),
			hasError: signal(hasError),
			autoClear: true
		});
	}
}
