import { Routes } from '@angular/router';
import { DemoButtonComponent } from './demo-button/demo-button.component';
import { DemoAccordionComponent } from './demo-accordion/demo-accordion.component';
import { DemoAppsListComponent } from './demo-apps-list/demo-apps-list.component';
import { DemoDatagridComponent } from './demo-datagrid/demo-datagrid.component';
import { DemoHeaderComponent } from './demo-header/demo-header.component';
import { DemoHeaderAppsComponent } from './demo-header-apps/demo-header-apps.component';
import { DemoLinkComponent } from './demo-link/demo-link.component';
import { DemoModalComponent } from './demo-modal/demo-modal.component';
import { DemoSidenavComponent } from './demo-sidenav/demo-sidenav.component';
import { DemoStepperComponent } from './demo-stepper/demo-stepper.component';
import { DemoSwitchButtonComponent } from './demo-switch-button/demo-switch-button.component';
import { DemoTableComponent } from './demo-table/demo-table.component';
import { DemoTabsComponent } from './demo-tabs/demo-tabs.component';
import { DemoTagsComponent } from './demo-tags/demo-tags.component';
import { DemoInputTextComponent } from './demo-input/demo-input-text/demo-input-text.component';
import { DemoInputCheckboxComponent } from './demo-input/demo-input-checkbox/demo-input-checkbox.component';
import { DemoInputSelectComponent } from './demo-input/demo-input-select/demo-input-select.component';
import { DemoInputRadioComponent } from './demo-input/demo-input-radio/demo-input-radio.component';
import { DemoInputDateComponent } from './demo-input/demo-input-date/demo-input-date.component';
import { DemoInputSearchComponent } from './demo-input/demo-input-search/demo-input-search.component';
import { DemoInputPasswordComponent } from './demo-input/demo-input-password/demo-input-password.component';
import { DemoInputTextareaComponent } from './demo-input/demo-input-textarea/demo-input-textarea.component';
import { DemoNotificationsComponent } from './demo-notifications/demo-notifications.component';
import { DemoServicesCallapiComponent } from './demo-services-callapi/demo-services-callapi.component';
import { DemoServicesSessionstorageComponent } from './demo-services-sessionstorage/demo-services-sessionstorage.component';
import { DemoPaginationComponent } from './demo-pagination/demo-pagination.component';
import { DemoInputFileUploadComponent } from './demo-input/demo-input-file-upload/demo-input-file-upload.component';
import { DemoInputSelectMultipleComponent } from './demo-input/demo-input-select-multiple/demo-input-select-multiple.component';
import { DemoFormsComponent } from './demo-forms/demo-forms.component';
import { DemoInputCheckboxMultipleComponent } from './demo-input/demo-input-checkbox-multiple/demo-input-checkbox-multiple.component';

export const routes: Routes = [
	{
		path: 'servicios',
		children: [
			{ path: '', redirectTo: 'text', pathMatch: 'full' },
			{
				path: 'callapi',
				component: DemoServicesCallapiComponent
			},
			{
				path: 'sessionstorage',
				component: DemoServicesSessionstorageComponent
			}
		]
	},
	{
		path: 'accordion',
		component: DemoAccordionComponent
	},
	{
		path: 'apps-list',
		component: DemoAppsListComponent
	},
	{
		path: 'button',
		component: DemoButtonComponent
	},
	{
		path: 'datagrid',
		component: DemoDatagridComponent
	},
	{
		path: 'header',
		component: DemoHeaderComponent
	},
	{
		path: 'header-apps',
		component: DemoHeaderAppsComponent
	},
	{ path: 'forms', component: DemoFormsComponent },
	{
		path: 'inputs',
		children: [
			{ path: '', redirectTo: 'text', pathMatch: 'full' },
			{
				path: 'checkbox',
				component: DemoInputCheckboxComponent
			},
			{
				path: 'checkboxmultiple',
				component: DemoInputCheckboxMultipleComponent
			},
			{
				path: 'date',
				component: DemoInputDateComponent
			},
			{
				path: 'fileupload',
				component: DemoInputFileUploadComponent
			},
			{
				path: 'password',
				component: DemoInputPasswordComponent
			},
			{
				path: 'radio',
				component: DemoInputRadioComponent
			},
			{
				path: 'search',
				component: DemoInputSearchComponent
			},
			{
				path: 'select',
				component: DemoInputSelectComponent
			},
			{ path: 'selectmultiple', component: DemoInputSelectMultipleComponent },
			{
				path: 'text',
				component: DemoInputTextComponent
			},
			{
				path: 'textarea',
				component: DemoInputTextareaComponent
			}
		]
	},
	{
		path: 'link',
		component: DemoLinkComponent
	},
	{
		path: 'modal',
		component: DemoModalComponent
	},
	{
		path: 'notification',
		component: DemoNotificationsComponent
	},
	{ path: 'pagination', component: DemoPaginationComponent },
	{
		path: 'sidenav',
		component: DemoSidenavComponent
	},
	{
		path: 'stepper',
		component: DemoStepperComponent
	},
	{
		path: 'switch-button',
		component: DemoSwitchButtonComponent
	},
	{
		path: 'table',
		component: DemoTableComponent
	},
	{
		path: 'tabs',
		component: DemoTabsComponent
	},
	{
		path: 'tags',
		component: DemoTagsComponent
	}
];
