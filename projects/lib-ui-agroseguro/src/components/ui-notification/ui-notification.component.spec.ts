import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiNotificationComponent } from './ui-notification.component';
import { ComponentRef } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

class MockNotificationService {
	removeNotification(notificationRef: ComponentRef<UiNotificationComponent>) {}
}

describe('UiNotificationComponent', () => {
	let component: UiNotificationComponent;
	let fixture: ComponentFixture<UiNotificationComponent>;
	let compiled: HTMLElement;
	let mockNotificationService: MockNotificationService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiNotificationComponent],
			providers: [{ provide: NotificationService, useClass: MockNotificationService }]
		}).compileComponents();

		fixture = TestBed.createComponent(UiNotificationComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('hasError', false);
		fixture.componentRef.setInput('message', 'Mensaje de error');

		mockNotificationService = TestBed.inject(
			NotificationService
		) as unknown as MockNotificationService;

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should have error class when hasError() === true', () => {
		fixture.componentRef.setInput('hasError', true);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.hasError()).toBe(true);
		expect(hostCssClasses).toContain('error');
	});

	it('should have success class when hasError() === false', () => {
		fixture.componentRef.setInput('hasError', false);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.hasError()).toBe(false);
		expect(hostCssClasses).toContain('success');
	});

	it('should have the required properties', () => {
		expect(component.hasError()).toBe(false);
		expect(component.message()).toBe('Mensaje de error');

		fixture.componentRef.setInput('hasError', true);
		fixture.componentRef.setInput('message', 'Mensaje de confirmacion');

		expect(component.hasError()).toBe(true);
		expect(component.message()).toBe('Mensaje de confirmacion');
	});

	it('should call removeNotification on close', () => {
		spyOn(mockNotificationService, 'removeNotification');

		component.close();

		expect(mockNotificationService.removeNotification).toHaveBeenCalledWith(
			component.notificationRef
		);
	});
});
