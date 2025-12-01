import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSwitchButtonComponent } from './ui-switch-button.component';

describe('UiSwitchButtonComponent', () => {
	let component: UiSwitchButtonComponent;
	let fixture: ComponentFixture<UiSwitchButtonComponent>;
	let compiled: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [UiSwitchButtonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiSwitchButtonComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default value of haveText to false', () => {
		expect(component.haveText()).toBeFalse();
	});

	it('should change power state', () => {
		component.power.set(true);
		expect(component.power()).toBeTrue();

		component.power.set(false);
		expect(component.power()).toBeFalse();
	});

	it('should allow setting haveText to true', () => {
		fixture.componentRef.setInput('haveText', true);
		expect(component.haveText()).toBeTrue();
	});

	it('should allow setting haveText to false', () => {
		fixture.componentRef.setInput('haveText', true);

		expect(component.haveText()).toBeTrue();

		fixture.componentRef.setInput('haveText', false);

		expect(component.haveText()).toBeFalse();
	});
});
