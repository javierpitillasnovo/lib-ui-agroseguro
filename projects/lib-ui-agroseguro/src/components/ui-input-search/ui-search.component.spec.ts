import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSearchComponent } from './ui-search.component';

describe('UiSearchComponent', () => {
	let component: UiSearchComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiSearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiSearchComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiSearchComponent);
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

	it('should set the icon correctly', () => {
		fixture.componentRef.setInput('icon', 'test-icon');
		expect(component.icon()).toBe('test-icon');
	});

	it('should update the value when the writeValue method is called', () => {
		component.writeValue('termToSearch');
		expect(component.value()).toBe('termToSearch');
	});

	it('should handle input change and emit event', () => {
		spyOn(component.searchChanges, 'emit');
		spyOn(component, 'onChange');

		let mockEvent = {
			target: { value: 'mypassword' }
		} as unknown as Event;

		component.onInputChange(mockEvent);

		expect(component.onChange).toHaveBeenCalledWith('mypassword');
		expect(component.searchChanges.emit).toHaveBeenCalledWith(mockEvent);
	});
});
