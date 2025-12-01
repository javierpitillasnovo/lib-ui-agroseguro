import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ui-tag',
	standalone: true,
	imports: [NgClass],
	templateUrl: './ui-tag.component.html',
	styleUrl: './ui-tag.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'tag',
		'[class.green]': 'status() === 0',
		'[class.yellow]': 'status() === 1',
		'[class.red]': 'status() === 2'
	}
})
export class UiTagComponent {
	public status = input<number>(); //Tipo de etiqueta, en base a esto se usa un color de fondo e icono.
	public text = input<string>(); //Texto de la etiqueta
	public icon = input<boolean>(); //Icono
}
