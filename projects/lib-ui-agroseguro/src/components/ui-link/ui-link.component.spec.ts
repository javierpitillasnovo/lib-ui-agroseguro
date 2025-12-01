import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLinkComponent } from './ui-link.component';

describe('UiLinkComponent', () => {
	let component: UiLinkComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiLinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiLinkComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should display the correct text', () => {
		fixture.componentRef.setInput('text', 'LinkText');
		expect(component.text()).toBe('LinkText');
	});

	it('should set the icon correctly', () => {
		fixture.componentRef.setInput('icon', 'test-icon');
		expect(component.icon()).toBe('test-icon');
	});

	it('should set the additionalClasses correctly', () => {
		fixture.componentRef.setInput('additionalClasses', 'test test');
		expect(component.additionalClasses()).toBe('test test');
	});
});
