import {
	ChangeDetectionStrategy,
	Component,
	ComponentRef,
	inject,
	input,
	ViewEncapsulation
} from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'ui-notification',
	standalone: true,
	templateUrl: './ui-notification.component.html',
	styleUrl: './ui-notification.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'notification',
		'[class.error]': 'hasError()',
		'[class.success]': '!hasError()'
	}
})
export class UiNotificationComponent {
	readonly notificationService = inject(NotificationService);
	public notificationRef!: ComponentRef<UiNotificationComponent>;

	public hasError = input.required<boolean>(); //Input para saber si tiene o no error
	public message = input.required<string>(); //Input con el texto de confirmación o error

	close() {
		this.notificationService.removeNotification(this.notificationRef);
	}
}
