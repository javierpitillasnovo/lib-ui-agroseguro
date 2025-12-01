import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAccordionComponent } from './ui-accordion.component';

describe('UiAccordionComponent', () => {
	let component: UiAccordionComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiAccordionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiAccordionComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiAccordionComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have complete class when status === 0', () => {
		fixture.componentRef.setInput('status', 0);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.status()).toBe(0);
		expect(hostCssClasses).toContain('complete');
	});

	it('should have revision class when status === 1', () => {
		fixture.componentRef.setInput('status', 1);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.status()).toBe(1);
		expect(hostCssClasses).toContain('revision');
	});

	it('should have noComplete class when status === 2', () => {
		fixture.componentRef.setInput('status', 2);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.status()).toBe(2);
		expect(hostCssClasses).toContain('noComplete');
	});

	it('should have showContent class when open() === true', () => {
		fixture.componentRef.setInput('open', true);
		fixture.detectChanges();

		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.open()).toBe(true);
		expect(hostCssClasses).toContain('showContent');
	});

	it('should have open set to false by default', () => {
		expect(component.open()).toBeFalse();
	});

	it('should toggle the value of open when showContent is called', () => {
		component.showContent();
		expect(component.open()).toBeTrue();

		component.showContent();
		expect(component.open()).toBeFalse();
	});

	it('should set the correct input values', () => {
		fixture.componentRef.setInput('title', 'Test Title');
		fixture.componentRef.setInput('showIcon', true);
		fixture.componentRef.setInput('status', 1);

		expect(component.title()).toBe('Test Title');
		expect(component.showIcon()).toBeTrue();
		expect(component.status()).toBe(1);
	});

	it('should display icons when showIcon is true', () => {
		fixture.componentRef.setInput('showIcon', true);
		fixture.componentRef.setInput('status', 1);

		fixture.detectChanges();

		expect(compiled.querySelector('.icon-danger')).toBeTruthy();
	});

	it('should not display icons when showIcon is false', () => {
		fixture.componentRef.setInput('showIcon', false);

		fixture.detectChanges();

		expect(compiled.querySelector('.icon-check')).toBeFalsy();
		expect(compiled.querySelector('.icon-danger')).toBeFalsy();
		expect(compiled.querySelector('.icon-cross')).toBeFalsy();
	});
});
