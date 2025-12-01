import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	inject,
	signal
} from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'ui-header',
	standalone: true,
	imports: [],
	providers: [SessionService],
	templateUrl: './ui-header.component.html',
	styleUrl: './ui-header.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'header'
	}
})
export class UiHeaderComponent {
	readonly #sessionService = inject(SessionService);
	readonly #router = inject(Router);
	public userEmail = signal<string | null>(this.#sessionService.get('user')); // Recuperamos el valor del email de la sesión

	logOut() {
		sessionStorage.clear();
		this.#router.navigate(['/']);
	}
}
