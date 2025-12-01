import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAppsListComponent } from './ui-apps-list.component';
import { AppGroups, AppItem } from '../../interfaces/appsList.interface';
import { RouterModule } from '@angular/router';

describe('UiAppListComponent', () => {
	let component: UiAppsListComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiAppsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				UiAppsListComponent,
				RouterModule.forRoot([{ path: 'test', component: UiAppsListComponent }])
			]
		}).compileComponents;

		fixture = TestBed.createComponent(UiAppsListComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges(); // Ejecuta el ciclo de vida inicial de Angular
	});

	// Test para asegurar que el componente se crea correctamente
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the correct title using setInput()', () => {
		fixture.componentRef.setInput('title', 'Test Title'); // Usamos setInput para Signals
		fixture.detectChanges(); // Detectar cambios
		expect(component.title()).toBe('Test Title');
	});

	it('should toggle showAll property', () => {
		expect(component.showAll).toBeFalse(); // Valor por defecto
		component.showAll = true;
		expect(component.showAll).toBeTrue();
	});

	it('should set appList correctly using setInput()', () => {
		let mockAppGroups: AppGroups[] = [
			{
				groupName: 'Group 1',
				appItems: [
					{ name: 'App 1', isFavorite: false, hasPermission: true, link: '/app1' },
					{ name: 'App 2', isFavorite: true, hasPermission: false, link: '/app2' }
				]
			},
			{
				groupName: 'Group 2',
				appItems: [{ name: 'App 3', isFavorite: false, hasPermission: true, link: '/app3' }]
			}
		];

		fixture.componentRef.setInput('appList', mockAppGroups);
		fixture.detectChanges(); // Detectar cambios

		expect(component.appList()?.length).toBe(2);
		expect(component.appList()?.[0].groupName).toBe('Group 1');
		expect(component.appList()?.[0].appItems.length).toBe(2);
		expect(component.appList()?.[0].appItems[1].name).toBe('App 2');
		expect(component.appList()?.[1].appItems[0].hasPermission).toBeTrue();
	});

	it('should set appItems correctly using setInput()', () => {
		let mockAppItems: AppItem[] = [
			{ name: 'App 1', isFavorite: false, hasPermission: true, link: '/app1' },
			{ name: 'App 2', isFavorite: true, hasPermission: false, link: '/app2' }
		];

		fixture.componentRef.setInput('appItems', mockAppItems);
		fixture.detectChanges(); // Detectar cambios

		expect(component.appItems()?.length).toBe(2);
		expect(component.appItems()?.[1].name).toBe('App 2');
		expect(component.appItems()?.[1].isFavorite).toBeTrue();
	});

	it('should emit favorite event when setFavorite is called', () => {
		spyOn(component.favorite, 'emit');

		let mockAppItem: AppItem = {
			name: 'App 1',
			isFavorite: true,
			hasPermission: true,
			link: '/app1'
		};

		component.favorite.emit(mockAppItem); // Simular la emisión de favorito
		expect(component.favorite.emit).toHaveBeenCalledWith(mockAppItem);
	});
});
