import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTabsComponent } from './ui-tabs.component';

describe('UiTabsComponent', () => {
	let component: UiTabsComponent;
	let fixture: ComponentFixture<UiTabsComponent>;
	let compiled: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [UiTabsComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiTabsComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('data', ['Tab 1', 'Tab 2', 'Tab 3']);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize itemActive to first tab when data is provided', () => {
		expect(component.itemActive()).toBe('Tab 1');
	});

	it('should return "No items" when no data is provided', () => {
		fixture.componentRef.setInput('data', []);
		expect(component.itemActive()).toBe('No items');
	});

	it('should allow manualItemActive to override itemActive', () => {
		component.manualItemActive.set('Tab 2');
		expect(component.itemActive()).toBe('Tab 2');
	});

	it('should initialize manualItemActive to empty string', () => {
		expect(component.manualItemActive()).toBe('');
	});
});
