import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ui-switch-button',
	standalone: true,
	imports: [NgClass],
	templateUrl: './ui-switch-button.component.html',
	styleUrl: './ui-switch-button.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		'[style.width]': '"fit-content"'
	}
})
export class UiSwitchButtonComponent {
	public power = model<boolean>(); //Boolean para controlar si está encendido o apagado
	public haveText = input<boolean>(false); //Boolean para controlar el texto
}
