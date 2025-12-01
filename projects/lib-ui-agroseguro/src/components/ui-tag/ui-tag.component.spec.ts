import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTagComponent } from './ui-tag.component';

describe('UiTagComponent', () => {
	let component: UiTagComponent;
	let fixture: ComponentFixture<UiTagComponent>;
	let compiled: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [UiTagComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiTagComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should allow setting status', () => {
		fixture.componentRef.setInput('status', 1);
		expect(component.status()).toBe(1);

		fixture.componentRef.setInput('status', 2);
		expect(component.status()).toBe(2);
	});

	it('should allow setting text', () => {
		fixture.componentRef.setInput('text', 'Test Tag');
		expect(component.text()).toBe('Test Tag');
	});

	it('should allow setting icon', () => {
		fixture.componentRef.setInput('icon', true);
		expect(component.icon()).toBeTrue();

		fixture.componentRef.setInput('icon', false);
		expect(component.icon()).toBeFalse();
	});
});
