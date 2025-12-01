import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMultiCheckboxComponent } from './ui-multiCheckbox.component';

describe('UiMultiCheckboxComponent', () => {
	let component: UiMultiCheckboxComponent;
	let fixture: ComponentFixture<UiMultiCheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiMultiCheckboxComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiMultiCheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
