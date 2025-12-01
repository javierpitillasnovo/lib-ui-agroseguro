import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMultiSelectComponent } from './ui-multiSelect.component';

describe('UiInputMultiSelectComponent', () => {
	let component: UiMultiSelectComponent;
	let fixture: ComponentFixture<UiMultiSelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiMultiSelectComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiMultiSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
