import { Component, input, model, output } from '@angular/core';
import { AppGroups, AppItem } from '../../interfaces/appsList.interface';
import { UiAppsItemComponent } from './ui-apps-item/ui-apps-item.component';
import { UiSwitchButtonComponent } from '../ui-switch-button/ui-switch-button.component';

@Component({
	selector: 'ui-apps-list',
	standalone: true,
	imports: [UiAppsItemComponent, UiSwitchButtonComponent],
	templateUrl: './ui-apps-list.component.html',
	styleUrl: './ui-apps-list.component.scss',
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'appList'
	}
})
export class UiAppsListComponent {
	public title = input<string>(); //Titulo
	public appList = input<AppGroups[]>(); //Lista de Grupos de apps
	public appItems = input<AppItem[]>(); //Lista de apps
	public favorite = output<AppItem>(); //Evento que emite cuando se selecciona en el icono de estrella para marcar o desmarcar un item como favorito
	public showAll: boolean = false; //Opción para ver todas
}
