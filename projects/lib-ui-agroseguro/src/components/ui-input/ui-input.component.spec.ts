import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputComponent } from './ui-input.component';

describe('UiInputComponent', () => {
	let component: UiInputComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiInputComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiInputComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should have disabled class when disabled() === true', () => {
		fixture.componentRef.setInput('disabled', true);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.disabled()).toBe(true);
		expect(hostCssClasses).toContain('disabled');
	});

	it('should have error class when error() === true', () => {
		fixture.componentRef.setInput('error', true);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.error()).toBe(true);
		expect(hostCssClasses).toContain('error');
	});

	it('should have selected class when selected() === true', () => {
		fixture.componentRef.setInput('selected', true);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.selected()).toBe(true);
		expect(hostCssClasses).toContain('selected');
	});

	it('should have withIcon class when icon() === "someiconclass"', () => {
		fixture.componentRef.setInput('icon', 'icon-icon');
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.icon()).toBe('icon-icon');
		expect(hostCssClasses).toContain('withIcon');
	});

	it('should have iFirst class when iconFirst() === true', () => {
		fixture.componentRef.setInput('iconFirst', true);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.iconFirst()).toBe(true);
		expect(hostCssClasses).toContain('iFirst');
	});

	it('should display the correct placeholder', () => {
		fixture.componentRef.setInput('placeholder', 'Enter your name');
		expect(component.placeholder()).toBe('Enter your name');
	});

	it('should display the correct label', () => {
		fixture.componentRef.setInput('label', 'Name');
		expect(component.label()).toBe('Name');
	});

	it('should display the correct help text', () => {
		fixture.componentRef.setInput('helpText', 'This is a required field.');
		expect(component.helpText()).toBe('This is a required field.');
	});

	it('should display the required indicator when required is true', () => {
		fixture.componentRef.setInput('required', true);
		expect(component.required()).toBeTrue();
	});

	it('should disable the input when disabled is true', () => {
		fixture.componentRef.setInput('disabled', true);
		expect(component.disabled()).toBeTrue();
	});

	it('should display the error message when error is true', () => {
		fixture.componentRef.setInput('error', true);
		fixture.componentRef.setInput('errorMessage', 'This field is required');
		expect(component.error()).toBe(true);
		expect(component.errorMessage()).toBe('This field is required');
	});

	it('should set the icon correctly', () => {
		fixture.componentRef.setInput('icon', 'test-icon');
		expect(component.icon()).toBe('test-icon');
	});

	it('should set the iconFirst property correctly', () => {
		fixture.componentRef.setInput('iconFirst', true);
		expect(component.iconFirst()).toBeTrue();
	});

	it('should update the value when the writeValue method is called', () => {
		component.writeValue('Test Value');
		expect(component.value()).toBe('Test Value');
	});

	it('should handle input change and emit event', () => {
		spyOn(component.inputChanges, 'emit');
		spyOn(component, 'onChange');

		let mockEvent = {
			target: { value: 'mypassword' }
		} as unknown as Event;

		component.onInputChange(mockEvent);

		expect(component.onChange).toHaveBeenCalledWith('mypassword');
		expect(component.inputChanges.emit).toHaveBeenCalledWith(mockEvent);
	});
});
