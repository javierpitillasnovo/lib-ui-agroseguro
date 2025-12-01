import {
	ChangeDetectionStrategy,
	Component,
	input,
	model,
	signal,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'ui-accordion',
	standalone: true,
	templateUrl: './ui-accordion.component.html',
	styleUrl: './ui-accordion.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'accordion',
		'[class.accordion--open]': 'open()',
		'[class.accordion--closed]': '!open()',
		'[class.accordion--complete]': 'status() === 0',
		'[class.accordion--revision]': 'status() === 1',
		'[class.accordion--noComplete]': 'status() === 2'
	}
})
export class UiAccordionComponent {
	public title = input<string>(); //Título del accordeón
	public showIcon = input<boolean>(); //Variable para ver si se ven los iconos
	public status = input<number>(); //Estado, con esta variable controlamos los colores por css también
	public open = model<boolean>(false); //Para mostrar o no el contenido del accordeon al inicio

	//Función para ocultar/msotrar el contenido del accordeon
	showContent() {
		this.open.set(!this.open());
	}
}
