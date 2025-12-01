import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiFileUploadComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-input-file-upload',
	standalone: true,
	imports: [UiFileUploadComponent],
	templateUrl: './demo-input-file-upload.component.html',
	styleUrl: './demo-input-file-upload.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoInputFileUploadComponent {}
