import { Component, output } from '@angular/core';
import { UiButtonComponent } from '../../../../../lib-ui-agroseguro/src/components/ui-button/ui-button.component';

@Component({
	selector: 'app-demo-modal-test',
	standalone: true,
	imports: [UiButtonComponent],
	templateUrl: './demo-modal-test.component.html',
	styleUrl: './demo-modal-test.component.scss'
})
export class DemoModalTestComponent {
	public modalOutput = output<any>();
}
