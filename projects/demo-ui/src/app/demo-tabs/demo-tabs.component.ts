import { Component } from '@angular/core';
import { TabTemplateDirective, UiTabsComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-tabs',
	standalone: true,
	imports: [TabTemplateDirective, UiTabsComponent],
	templateUrl: './demo-tabs.component.html',
	styleUrl: './demo-tabs.component.scss'
})
export class DemoTabsComponent {
	public tabData = ['Tab1', 'Tab2', 'Tab3'];
}
