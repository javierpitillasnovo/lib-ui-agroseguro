import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { UiSidenavItemComponent } from './ui-sidenav-item/ui-sidenav-item.component';
import { MenuItem } from '../../interfaces/menuItem.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'ui-sidenav',
	standalone: true,
	imports: [UiSidenavItemComponent],
	templateUrl: './ui-sidenav.component.html',
	styleUrl: './ui-sidenav.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString()
	}
})
export class UiSidenavComponent {
	readonly #router = inject(Router);
	public currentUrl!: string; //Url actual
	public sideNavData = input<MenuItem[]>([]); //Data
	public sideNav = computed(() => {
		//Data modificada para ver si está activa
		return this.sideNavData().map((menuItem) => ({
			...menuItem,
			active: this.isChildActive(menuItem)
		}));
	});

	constructor() {
		this.currentUrl = this.#router.url; //Obtenemos la url actual
	}

	//Función para saber si tiene hijos activos
	isChildActive(menuItem: MenuItem): boolean {
		if (!menuItem.children) {
			return false;
		}

		let childActive = false;

		menuItem.children.some((child) => {
			if (this.currentUrl === child.link || (child.children && this.isChildActive(child))) {
				childActive = true;
				menuItem.active = true;
			}
		});

		return childActive;
	}
}
