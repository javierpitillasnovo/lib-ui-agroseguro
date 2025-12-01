import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContainerRef, Component, EventEmitter, Output } from '@angular/core';
import { UiModalComponent } from './ui-modal.component'; // Actualiza con la ruta correcta
import { of } from 'rxjs';
import { ModalService } from '../../services/modal.service';

// Componente de ejemplo para probar la inserción dinámica de componentes
@Component({
	selector: 'app-dummy',
	standalone: true,

	template: '<div></div>'
})
class DummyComponent {
	@Output() modalOutput = new EventEmitter<any>();
}

describe('UiModalComponent', () => {
	let component: UiModalComponent;
	let fixture: ComponentFixture<UiModalComponent>;
	let compiled: HTMLElement;
	let modalServiceSpy: jasmine.SpyObj<ModalService>;
	let viewContainerRefSpy: jasmine.SpyObj<ViewContainerRef>;
	let modalServiceSpyObj;
	let viewContainerRefSpyObj;
	let componentRefMock: any;

	beforeEach(async () => {
		modalServiceSpyObj = jasmine.createSpyObj('ModalService', ['close']);
		viewContainerRefSpyObj = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);

		await TestBed.configureTestingModule({
			imports: [UiModalComponent, DummyComponent],
			providers: [
				{ provide: ModalService, useValue: modalServiceSpyObj },
				{ provide: ViewContainerRef, useValue: viewContainerRefSpyObj }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(UiModalComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;
		modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
		viewContainerRefSpy = TestBed.inject(ViewContainerRef) as jasmine.SpyObj<ViewContainerRef>;

		componentRefMock = {
			instance: {
				modalOutput: new EventEmitter<any>()
			}
		};
		viewContainerRefSpy.createComponent.and.returnValue(componentRefMock);

		component.viewContainerRef = viewContainerRefSpy;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should call ModalService close method with result', () => {
		let result = 'testResult';
		component.closeModal(result);
		expect(modalServiceSpy.close).toHaveBeenCalledWith(result);
	});

	it('should call ModalService close method with undefined if no result is passed', () => {
		component.closeModal();
		expect(modalServiceSpy.close).toHaveBeenCalledWith(undefined);
	});

	it('should create and insert a dynamic component', () => {
		let params = { param1: 'value1' };
		component.insertComponent(DummyComponent, params);

		expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(DummyComponent as any);
		expect(componentRefMock.instance.param1).toBe('value1');
	});

	it('should subscribe to the modalOutput and close the modal when output emits', () => {
		let result = 'outputResult';
		let closeSpy = spyOn(component, 'closeModal');

		component.insertComponent(DummyComponent, {});
		componentRefMock.instance.modalOutput.emit(result);

		expect(closeSpy).toHaveBeenCalledWith(result);
	});

	it('should not fail if modalOutput does not exist on the dynamic component', () => {
		let closeSpy = spyOn(component, 'closeModal');
		componentRefMock.instance = {};

		expect(() => {
			component.insertComponent(DummyComponent, {});
		}).not.toThrow();
		expect(closeSpy).not.toHaveBeenCalled();
	});
});
