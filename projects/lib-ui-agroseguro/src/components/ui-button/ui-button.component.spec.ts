import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonComponent } from './ui-button.component';

describe('UiButtonComponent', () => {
	let component: UiButtonComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiButtonComponent]
		}).compileComponents;

		fixture = TestBed.createComponent(UiButtonComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges(); // Ejecuta el ciclo de vida inicial de Angular
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should set the correct input values', () => {
		fixture.componentRef.setInput('text', 'Text test');
		fixture.componentRef.setInput('icon', 'icon-icon');
		fixture.componentRef.setInput('additionalClasses', 'btn__primary');
		fixture.componentRef.setInput('disabled', true);

		expect(component.text()).toBe('Text test');
		expect(component.icon()).toBe('icon-icon');
		expect(component.additionalClasses()).toBe('btn__primary');
		expect(component.disabled()).toBe(true);
	});
});
