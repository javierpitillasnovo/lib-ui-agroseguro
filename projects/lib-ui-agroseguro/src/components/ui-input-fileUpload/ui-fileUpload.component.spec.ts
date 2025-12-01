import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputFileUploadComponent } from './ui-fileUpload.component';

describe('UiInputFileUploadComponent', () => {
	let component: UiInputFileUploadComponent;
	let fixture: ComponentFixture<UiInputFileUploadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiInputFileUploadComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiInputFileUploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
