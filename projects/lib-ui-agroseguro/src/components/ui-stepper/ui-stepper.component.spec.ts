import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStepperComponent } from '@lib-ui-agroseguro';
import { StepTemplateDirective } from '../../directives/step-content.directive';

describe('UiStepperComponent', () => {
	let component: UiStepperComponent;
	let fixture: ComponentFixture<UiStepperComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiStepperComponent, StepTemplateDirective]
		}).compileComponents();

		fixture = TestBed.createComponent(UiStepperComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('buttonsDisabled', false);

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with default values', () => {
		expect(component.activeStep()).toBe(1);
		expect(component.buttonsDisabled()).toBeFalse();
		expect(component.showInitialButton()).toBeFalse();
		expect(component.showEndButton()).toBeFalse();
	});

	it('should decrement activeStep on prev()', () => {
		component.activeStep.set(2);
		component.prev();
		expect(component.activeStep()).toBe(1);
		expect(component.buttonsDisabled()).toBeTrue();
	});

	it('should not decrement activeStep below 1', () => {
		component.activeStep.set(1);
		component.prev();
		expect(component.activeStep()).toBe(1);
	});

	it('should emit initialButtonClicked on initial button click', () => {
		spyOn(component.initialButtonClicked, 'emit');
		component.initialButtonClicked.emit(true);
		expect(component.initialButtonClicked.emit).toHaveBeenCalledWith(true);
	});

	it('should emit endButtonClicked on end button click', () => {
		spyOn(component.endButtonClicked, 'emit');
		component.endButtonClicked.emit(true);
		expect(component.endButtonClicked.emit).toHaveBeenCalledWith(true);
	});
});
