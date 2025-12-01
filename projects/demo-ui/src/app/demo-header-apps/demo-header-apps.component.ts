import { Component } from '@angular/core';
import { UiHeaderAppsComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-header-apps',
	standalone: true,
	imports: [UiHeaderAppsComponent],
	templateUrl: './demo-header-apps.component.html',
	styleUrl: './demo-header-apps.component.scss'
})
export class DemoHeaderAppsComponent {}
