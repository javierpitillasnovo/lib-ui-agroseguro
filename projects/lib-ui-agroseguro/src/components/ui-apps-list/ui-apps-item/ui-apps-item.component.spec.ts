import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAppsItemComponent } from './ui-apps-item.component';
import { AppItem } from '../../../interfaces/appsList.interface';
import { RouterModule } from '@angular/router';

describe('UiAppItemComponent', () => {
	let component: UiAppsItemComponent;
	let compiled: HTMLElement;
	let fixture: ComponentFixture<UiAppsItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				UiAppsItemComponent,
				RouterModule.forRoot([{ path: 'test', component: UiAppsItemComponent }])
			]
		}).compileComponents;

		fixture = TestBed.createComponent(UiAppsItemComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges(); // Ejecuta el ciclo de vida inicial de Angular
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should set appItems correctly using setInput()', () => {
		let mockAppItems: AppItem[] = [
			{ name: 'App 1', isFavorite: false, hasPermission: true, link: '/app1' },
			{ name: 'App 2', isFavorite: true, hasPermission: true, link: '/app2' }
		];

		fixture.componentRef.setInput('appItems', mockAppItems);
		fixture.detectChanges();

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
