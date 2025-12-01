import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableComponent } from './ui-table.component';
import { getCheckboxValue } from '../../utils/getInputValue';

describe('UiTagComponent', () => {
	let component: UiTableComponent;
	let fixture: ComponentFixture<UiTableComponent>;
	let compiled: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [UiTableComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiTableComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('dataOriginal', [
			{ id: 1, col1: 'Data del 1', col2: 'Data del 2' },
			{ id: 2, col1: 'Data del 1', col2: 'Data del 2' }
		]);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have class showPag when showPagination() === true', () => {
		fixture.componentRef.setInput('showPagination', true);
		fixture.detectChanges();
		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.showPagination()).toBe(true);
		expect(hostCssClasses).toContain('showPag');
	});

	it('should have class showHeader when title()', () => {
		fixture.componentRef.setInput('title', 'title test');
		fixture.detectChanges();
		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.title()).toBe('title test');
		expect(hostCssClasses).toContain('showHeader');
	});

	it('should have class hasError when hasError()', () => {
		fixture.componentRef.setInput('hasError', true);
		fixture.detectChanges();
		let hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(component.hasError()).toBe(true);
		expect(hostCssClasses).toContain('hasError');
	});

	it('should emit itemSelected with correct values when checkbox is selected', () => {
		spyOn(component.itemSelected, 'emit');
		spyOn(component, 'defaultActions').and.returnValue('checkbox');

		let mockEvent = { target: { checked: true } } as unknown as Event;

		component.onRowSelect(mockEvent, 1);

		expect(component.itemSelected.emit).toHaveBeenCalledWith({ id: 1, selected: true });
	});

	it('should emit itemSelected with correct values when radio is selected', () => {
		spyOn(component.itemSelected, 'emit');
		spyOn(component, 'defaultActions').and.returnValue('radio');

		// Simulamos el evento para radio (seleccionado)
		component.onRowSelect({}, 2);

		expect(component.itemSelected.emit).toHaveBeenCalledWith({ id: 2, selected: true });
	});

	it('should emit itemAdd when addRow is called', () => {
		spyOn(component.itemAdd, 'emit');

		component.addRow();

		expect(component.itemAdd.emit).toHaveBeenCalledWith(true);
	});

	it('should update pageSize and emit paginationAction', () => {
		let mockEvent = { target: { value: '5' } } as unknown as Event;
		spyOn(component.paginationAction, 'emit');

		component.rowPerPageChange(mockEvent);

		expect(component.pageSize()).toBe(5);
		expect(component.paginationAction.emit).toHaveBeenCalledWith(true);
	});

	it('should decrement page on previous and emit paginationAction', () => {
		component.currentPage.set(2);
		spyOn(component.paginationAction, 'emit');

		component.previous();

		expect(component.currentPage()).toBe(1);
		expect(component.paginationAction.emit).toHaveBeenCalledWith(true);
	});

	it('should increment page on next and emit paginationAction', () => {
		component.currentPage.set(1);
		spyOn(component.paginationAction, 'emit');

		component.next();

		expect(component.currentPage()).toBe(2);
		expect(component.paginationAction.emit).toHaveBeenCalledWith(true);
	});
});
