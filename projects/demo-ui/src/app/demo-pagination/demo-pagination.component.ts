import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiPaginationComponent } from '@lib-ui-agroseguro';
@Component({
	selector: 'app-demo-pagination',
	standalone: true,
	imports: [UiPaginationComponent],
	templateUrl: './demo-pagination.component.html',
	styleUrl: './demo-pagination.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPaginationComponent {
	clg(event: { pageSize: number; currentPage: number }) {
		console.log(event);
	}
}
