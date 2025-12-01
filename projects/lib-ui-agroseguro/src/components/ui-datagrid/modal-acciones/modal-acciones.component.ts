import { Component, input, output } from '@angular/core';
import { UiButtonComponent } from '../../ui-button/ui-button.component';

@Component({
	selector: 'modal-acciones-datagrid',
	standalone: true,
	imports: [UiButtonComponent],
	templateUrl: './modal-acciones.component.html',
	styleUrl: './modal-acciones.component.scss',
	host: {
		hostID: crypto.randomUUID().toString()
	}
})
export class ModalAccionesDatagridComponent {
	public actionType = input<string>();
	public modalOutput = output<any>();
}
