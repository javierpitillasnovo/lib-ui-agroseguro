import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AppGroups, AppItem, UiAppsListComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-apps-list',
	standalone: true,
	imports: [UiAppsListComponent],
	templateUrl: './demo-apps-list.component.html',
	styleUrl: './demo-apps-list.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class DemoAppsListComponent {
	public appsList = signal<AppGroups[]>([
		{
			groupName: 'Group1',
			appItems: [
				{
					name: 'Application1',
					isFavorite: false,
					hasPermission: true,
					link: 'test'
				},
				{ name: 'Application2', isFavorite: true, hasPermission: true, link: 'test' },
				{ name: 'Application3', isFavorite: false, hasPermission: true, link: 'test' },
				{ name: 'Application4', isFavorite: true, hasPermission: false, link: 'test' }
			]
		},
		{
			groupName: 'Group2',
			appItems: [
				{ name: 'Application4', isFavorite: false, hasPermission: true, link: 'test' },
				{ name: 'Application4', isFavorite: false, hasPermission: true, link: 'test' },
				{ name: 'Application4', isFavorite: false, hasPermission: false, link: 'test' },
				{ name: 'Application4', isFavorite: true, hasPermission: false, link: 'test' }
			]
		}
	]);
	public appsFavs = signal<AppItem[]>([
		{ name: 'Application1', isFavorite: true, hasPermission: true, link: 'test' },
		{ name: 'Application2', isFavorite: true, hasPermission: true, link: 'test' },
		{ name: 'Application3', isFavorite: true, hasPermission: true, link: 'test' },
		{ name: 'Application4', isFavorite: true, hasPermission: true, link: 'test' }
	]);
}
