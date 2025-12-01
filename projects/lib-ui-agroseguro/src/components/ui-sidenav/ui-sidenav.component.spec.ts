import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSidenavComponent } from './ui-sidenav.component';
import { UiSidenavItemComponent } from './ui-sidenav-item/ui-sidenav-item.component';
import { MenuItem } from '../../interfaces/menuItem.interface';

describe('UiSidenavComponent', () => {
	let component: UiSidenavComponent;
	let fixture: ComponentFixture<UiSidenavComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiSidenavComponent, UiSidenavItemComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UiSidenavComponent);
		compiled = fixture.nativeElement as HTMLElement;
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should return modified sideNav data', () => {
		let menuItems: MenuItem[] = [
			{ label: 'Item 1', link: '/item1', children: [] },
			{ label: 'Item 2', link: '/item2', children: [{ label: 'Child 1', link: '/item2/child1' }] }
		];

		fixture.componentRef.setInput('sideNavData', menuItems);

		expect(component.sideNav().length).toBe(2);
	});

	it('should mark child as active if current URL matches child link', () => {
		let menuItem: MenuItem = {
			label: 'Item 2',
			link: '/item2',
			children: [
				{ label: 'Child 1', link: '/item2/child1' },
				{ label: 'Child 2', link: '/item2/child2' }
			]
		};

		component.currentUrl = '/item2/child1';

		expect(component.isChildActive(menuItem)).toBeTrue();
	});

	it('should not mark item as active if no children match', () => {
		let menuItem: MenuItem = {
			label: 'Item 3',
			link: '/item3',
			children: [
				{ label: 'Child 3', link: '/item3/child3' },
				{ label: 'Child 4', link: '/item3/child4' }
			]
		};

		component.currentUrl = '/item3/child1';

		expect(component.isChildActive(menuItem)).toBeFalse();
	});
});
