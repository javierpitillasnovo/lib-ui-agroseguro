import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'ui-link',
	standalone: true,
	imports: [NgClass],
	templateUrl: './ui-link.component.html',
	styleUrl: './ui-link.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString()
	}
})
export class UiLinkComponent {
	public text = input<string>(); //Texto del enlace
	public icon = input<string>(); //Nombre del icono (clase css)
	public additionalClasses = input<string>(); //Clases css modificadoras
}
