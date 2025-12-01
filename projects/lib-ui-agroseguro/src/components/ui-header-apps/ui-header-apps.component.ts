import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

@Component({
	selector: 'ui-header-apps',
	standalone: true,
	imports: [],
	templateUrl: './ui-header-apps.component.html',
	styleUrl: './ui-header-apps.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'header'
	}
})
export class UiHeaderAppsComponent {
	public appName = input<String>(); //Nombre de la app a mostrar en el header
}
