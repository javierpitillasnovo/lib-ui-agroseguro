import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDataGridComponent } from './ui-datagrid.component';
import { of } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { inject } from '@angular/core';

export interface DataItemI {
	col1: string | null;
	col2: string | null;
	col3: string | null;
}

export class DataItem implements DataItemI {
	col1: string | null = null;
	col2: string | null = null;
	col3: string | null = null;
	constructor(init?: Partial<DataItem>) {
		Object.assign(this, init);
	}
}

class MockModalService {
	public open = jasmine.createSpy('open').and.returnValue(true);
}

describe('UiDataGridComponent', () => {
	let component: UiDataGridComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiDataGridComponent>;
	let mockModalService: MockModalService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiDataGridComponent],
			providers: [{ provide: ModalService, useClass: MockModalService }]
		}).compileComponents;

		fixture = TestBed.createComponent(UiDataGridComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.componentRef.setInput('headers', ['Colmuna1', 'Columna2']);
		fixture.componentRef.setInput('newItem', new DataItem());
		fixture.componentRef.setInput('fieldsToShow', [{ name: 'col1' }, { name: 'col2' }]);
		fixture.componentRef.setInput('dataOriginal', [
			{ id: 1, col1: 'Data del 1', col2: 'Data del 2' },
			{ id: 2, col1: 'Data del 1', col2: 'Data del 2' }
		]);

		mockModalService = TestBed.inject(ModalService) as unknown as MockModalService;

		fixture.detectChanges(); // Ejecuta el ciclo de vida inicial de Angular
	});

	it('should create the component', () => {
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

	it('addRow', () => {
		spyOn(component.itemAdd, 'emit');

		component.addRow();

		expect(component.showAddButton()).toBe(false);
		expect(component.currentAction()).toBe('add');
		expect(component.itemAdd.emit).toHaveBeenCalledWith(true);
		expect(component.dataOriginal().length).toBe(3);
	});

	it('onRowSelected', () => {
		fixture.componentRef.setInput('dataOriginal', [
			{ id: 1, col1: 'Data del 1', col2: 'Data del 2' },
			{ id: 2, col1: 'Data del 1', col2: 'Data del 2' }
		]);

		let mockRow = { id: 1, col1: 'Data del 1', col2: 'Data del 2' };
		let mockEvent = { target: { checked: true } } as unknown as Event;

		spyOn(component, 'transformData').and.callThrough();
		spyOn(component.itemSelected, 'emit');

		fixture.detectChanges();

		component.onRowSelect(mockRow, mockEvent, 0);

		expect(component.transformData).toHaveBeenCalled();

		expect(component.showAddButton()).toBe(false);
		expect(component.currentAction()).toBe('edit');
		expect(component.itemSelected.emit).toHaveBeenCalledWith(mockRow);
		expect(component.dataOriginal()).toEqual([
			{
				id: 1,
				idForFormArray: 0,
				col1: 'Data del 1',
				col2: 'Data del 2',
				selected: true,
				disabled: false
			},
			{ id: 2, idForFormArray: 1, col1: 'Data del 1', col2: 'Data del 2', disabled: true }
		]);
	});

	it('onRowSave', () => {
		let mockRow = { id: 1, col1: 'Data del 1', col2: 'Data del 2', idForFormArray: 0 };
		spyOn(component.itemSave, 'emit');

		component.onRowSave(mockRow);

		expect(component.showAddButton()).toBe(false);
		expect(component.itemSave.emit).toHaveBeenCalledWith(mockRow);
	});

	it('onRowCancel', () => {
		component.addRow();
		expect(component.dataOriginal().length).toBe(3);
		component.onRowCancel({});

		expect(component.dataOriginal().length).toBe(2);
		expect(component.showAddButton()).toBe(true);
	});

	it('itemDelete', () => {
		let mockRow = { id: 1, col1: 'Data del 1', col2: 'Data del 2', idForFormArray: 0 };
		spyOn(component.itemDelete, 'emit');

		mockModalService.open.and.returnValue(of(true));

		component.onRowDelete(mockRow);

		expect(component.itemDelete.emit).toHaveBeenCalledWith(mockRow);
	});

	it('should emit anySelectChange', () => {
		let mockEvent = { target: { value: 'newValue' } } as unknown as Event;
		let mockFieldToShow = { name: 'description' };
		let mockRow = { id: 1, col1: 'Data del 1', col2: 'Data del 2', idForFormArray: 0 };

		spyOn(component.anySelectChange, 'emit');

		component.selectChanges(mockEvent, mockFieldToShow, mockRow);

		expect(component.anySelectChange.emit).toHaveBeenCalledWith({
			value: 'newValue',
			selectName: 'description'
		});
	});

	it('should update pageSize and emit paginationAction', () => {
		const mockEvent = { target: { value: '5' } } as unknown as Event;
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
