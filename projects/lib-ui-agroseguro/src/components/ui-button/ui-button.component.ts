import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ui-button',
	standalone: true,
	imports: [NgClass],
	templateUrl: './ui-button.component.html',
	styleUrl: './ui-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		hostID: crypto.randomUUID().toString()
	}
})
export class UiButtonComponent {
	public text = input<string>(); //Texto del botón
	public icon = input<string>(); //Nombre del icono (clase css)
	public additionalClasses = input<string>(); //Clases css modificadoras
	public disabled = input<boolean>(); //Atributo disabled
}
