import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPasswordComponent } from './ui-password.component';

describe('UiPasswordComponent', () => {
	let component: UiPasswordComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiPasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiPasswordComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiPasswordComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should display the correct placeholder', () => {
		fixture.componentRef.setInput('placeholder', 'Enter your name');
		expect(component.placeholder()).toBe('Enter your name');
	});

	it('should display the error message when error is true', () => {
		fixture.componentRef.setInput('error', true);
		expect(component.error()).toBe(true);
	});

	it('should toggle password visibility', () => {
		component.showPass = false;
		component.typeForPass = 'password';

		component.onShowPass();

		expect(component.showPass).toBeTrue();
		expect(component.typeForPass).toBe('text');

		component.onShowPass();

		expect(component.showPass).toBeFalse();
		expect(component.typeForPass).toBe('password');
	});

	it('should update the value when the writeValue method is called', () => {
		component.writeValue('mypassword');
		expect(component.value()).toBe('mypassword');
	});

	it('should handle input change and emit event', () => {
		spyOn(component.passwordChanges, 'emit');
		spyOn(component, 'onChange');

		let mockEvent = {
			target: { value: 'mypassword' }
		} as unknown as Event;

		component.onInputChange(mockEvent);

		expect(component.onChange).toHaveBeenCalledWith('mypassword');
		expect(component.passwordChanges.emit).toHaveBeenCalledWith(mockEvent);
	});
});
