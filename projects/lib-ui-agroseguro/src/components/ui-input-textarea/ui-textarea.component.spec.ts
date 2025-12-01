import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTextareaComponent } from './ui-textarea.component';

describe('UiTextareaComponent', () => {
	let component: UiTextareaComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiTextareaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiTextareaComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiTextareaComponent);
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
		expect(component.error()).toBe(true);
	});

	it('should update the value when the writeValue method is called', () => {
		component.writeValue('textareatext');
		expect(component.value()).toBe('textareatext');
	});

	it('should handle input change and emit event', () => {
		spyOn(component.textAreaChanges, 'emit');
		spyOn(component, 'onChange');

		let mockEvent = {
			target: { value: 'mypassword' }
		} as unknown as Event;

		component.onInputChange(mockEvent);

		expect(component.onChange).toHaveBeenCalledWith('mypassword');
		expect(component.textAreaChanges.emit).toHaveBeenCalledWith(mockEvent);
	});
});
