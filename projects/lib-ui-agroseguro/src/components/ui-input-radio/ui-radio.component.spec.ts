import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRadioComponent } from './ui-radio.component';

describe('UiRadioComponent', () => {
	let component: UiRadioComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiRadioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiRadioComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiRadioComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('name', 'radioTest');
		fixture.componentRef.setInput('options', ['RadioOption1', 'RadioOption2', 'RadioOption3']);

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

	it('should disable the optionsLabels when optionsLabels is true', () => {
		fixture.componentRef.setInput('optionsLabels', true);
		expect(component.optionsLabels()).toBeTrue();
	});

	it('should display the error message when error is true', () => {
		fixture.componentRef.setInput('error', true);
		fixture.componentRef.setInput('errorMessage', 'This field is required');
		expect(component.error()).toBe(true);
		expect(component.errorMessage()).toBe('This field is required');
	});

	it('should write value', () => {
		component.writeValue('option1');
		expect(component.value()).toBe('option1');

		component.writeValue('option2');
		expect(component.value()).toBe('option2');
	});

	it('should handle input change and emit event', () => {
		spyOn(component.radioChanges, 'emit');
		spyOn(component, 'onChange');

		let mockEvent = {
			target: { value: 'option2' }
		} as unknown as Event;

		component.onInputChange(mockEvent);

		expect(component.onChange).toHaveBeenCalledWith('option2');
		expect(component.radioChanges.emit).toHaveBeenCalledWith(mockEvent);
	});
});
