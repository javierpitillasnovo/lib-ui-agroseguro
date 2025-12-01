import { Component, HostListener, inject, signal, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService, NotificationService, UiSidenavComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, UiSidenavComponent],

	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	#vcr = inject(ViewContainerRef);
	#notificationService = inject(NotificationService);
	#modalService = inject(ModalService);
	isHidden = true;

	constructor() {
		this.#notificationService.setViewContainerRef(this.#vcr);
		this.#modalService.setViewContainerRef(this.#vcr);
	}

	@HostListener('window:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.ctrlKey && event.altKey && event.key === 'g') {
			this.isHidden = !this.isHidden;
		}
	}
	public sideNav = signal<any[]>([
		{
			label: 'Servicios',
			children: [
				{
					label: 'CallApi (HTTP)',
					link: '/servicios/callapi'
				},
				{
					label: 'Session (Storage)',
					link: '/servicios/sessionstorage'
				}
			]
		},
		{ label: 'Accordeón', link: '/accordion' },
		{ label: 'Apps List', link: '/apps-list' },
		{
			label: 'Boton',
			link: '/button'
		},
		{
			label: 'Datagrid',
			link: '/datagrid'
		},
		{
			label: 'Header',
			link: '/header'
		},
		{
			label: 'Header APPs',
			link: '/header-apps'
		},
		{ label: 'Forms', link: '/forms' },
		{
			label: 'Inputs',
			children: [
				{
					label: 'Checkbox',
					link: '/inputs/checkbox'
				},
				{
					label: 'CheckboxMultiple',
					link: '/inputs/checkboxmultiple'
				},
				{
					label: 'Date',
					link: '/inputs/date'
				},
				{ label: 'FileUpload', link: '/inputs/fileupload' },
				{
					label: 'Password',
					link: '/inputs/password'
				},
				{
					label: 'Radio',
					link: '/inputs/radio'
				},
				{
					label: 'Search',
					link: '/inputs/search'
				},
				{
					label: 'Select',
					link: '/inputs/select'
				},
				{
					label: 'SelectMultiple',
					link: '/inputs/selectmultiple'
				},
				{
					label: 'Text',
					link: '/inputs/text'
				},
				{
					label: 'TextArea',
					link: '/inputs/textarea'
				}
			]
		},
		{
			label: 'Link',
			link: '/link'
		},
		{
			label: 'Modal',
			link: '/modal'
		},
		{
			label: 'Notifications',
			link: '/notification'
		},
		{
			label: 'Pagination',
			link: '/pagination'
		},
		{
			label: 'Sidenav',
			link: '/sidenav'
		},
		{
			label: 'Stepper',
			link: '/stepper'
		},
		{
			label: 'SwitchButton',
			link: '/switch-button'
		},
		{
			label: 'Table',
			link: '/table'
		},
		{
			label: 'Tabs',
			link: '/tabs'
		},
		{
			label: 'Tags',
			link: '/tags'
		}
	]);
}
