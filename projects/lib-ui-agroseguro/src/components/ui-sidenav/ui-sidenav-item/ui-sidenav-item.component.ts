import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../../interfaces/menuItem.interface';

@Component({
	selector: 'ui-sidenav-item',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgClass],
	templateUrl: './ui-sidenav-item.component.html',
	styleUrl: './ui-sidenav-item.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString()
	}
})
export class UiSidenavItemComponent {
	public sideNavItem = input.required<MenuItem>(); //Item
	public isSubMenu = input<boolean>(false);

	toggleSubmenu(event: Event, item: MenuItem) {
		event.stopPropagation();
		item.active = !item.active;
	}
}
