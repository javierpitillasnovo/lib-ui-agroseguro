import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	computed,
	contentChildren,
	input,
	signal
} from '@angular/core';
import { TabTemplateDirective } from '../../directives/tab-content.directive';

@Component({
	selector: 'ui-tabs',
	standalone: true,
	imports: [NgClass, NgTemplateOutlet],
	templateUrl: './ui-tabs.component.html',
	styleUrl: './ui-tabs.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'tabs'
	}
})
export class UiTabsComponent {
	public data = input.required<string[]>(); //TabsData
	public manualItemActive = signal<string>(''); //Variable para setear manualmente el item activo
	//Signal computed que devuelve el item activo
	public itemActive = computed(() => {
		if (this.manualItemActive()) {
			return this.manualItemActive();
		}
		return this.data().length > 0 ? this.data()[0] : 'No items';
	});
	public templates = contentChildren(TabTemplateDirective); //Query para sacar todos los elementos con TabTemplateDirective
}
