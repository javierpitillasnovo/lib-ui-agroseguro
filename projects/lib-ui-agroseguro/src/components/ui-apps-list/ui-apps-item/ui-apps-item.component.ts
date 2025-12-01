import { Component, input, output } from '@angular/core';
import { AppItem } from '../../../interfaces/appsList.interface';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'ui-apps-item',
	standalone: true,
	imports: [NgClass, RouterLink],
	templateUrl: './ui-apps-item.component.html',
	styleUrl: './ui-apps-item.component.scss',
	host: {
		hostID: crypto.randomUUID().toString()
	}
})
export class UiAppsItemComponent {
	public appItems = input<AppItem[]>(); //App item
	public showAll = input<boolean>(); //Opción para mostrar o no todas las apps
	public favorite = output<AppItem>();

	setFavorite(event: Event, app: AppItem) {
		event.preventDefault();
		event.stopPropagation();
		this.favorite.emit(app);
	}

	/*setFavorite(app: AppItem) {
		this.appItems.update((appItems: AppItem[] | undefined) => {
			// Verifica si appItems no es undefined
			if (appItems) {
				// Usa map para devolver un nuevo array con los cambios aplicados
				return appItems.map((appItem: AppItem) => {
					if (appItem === app) {
						// Cambia la propiedad isFavorite
						return { ...appItem, isFavorite: !appItem.isFavorite };
					}
					return appItem;
				});
			}
			// Si appItems es undefined, simplemente retorna undefined
			return undefined;
		});
	}*/
}
