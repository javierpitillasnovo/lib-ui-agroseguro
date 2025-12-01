import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCheckboxComponent } from './ui-checkbox.component';

describe('UiCheckboxComponent', () => {
	let component: UiCheckboxComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiCheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiCheckboxComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiCheckboxComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('options', ['CheckOption1', 'CheckOption2', 'CheckOption3']);

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

	it('should update the value when the writeValue method is called', () => {
		component.writeValue(true);
		expect(component.value()).toBe(true);

		component.writeValue(false);
		expect(component.value()).toBe(false);
	});

	it('should handle input change and emit event', () => {
		spyOn(component.checkboxChanges, 'emit');
		spyOn(component, 'onChange');

		// Simular un checkbox válido dentro del evento
		let mockEvent = {
			target: {
				checked: true // Aquí es donde está el valor del checkbox
			}
		} as unknown as Event; // Usamos `as` para castear el tipo de Event

		component.onInputChange(mockEvent);

		expect(component.onChange).toHaveBeenCalledWith(true);
		expect(component.checkboxChanges.emit).toHaveBeenCalledWith(mockEvent);
	});
});
