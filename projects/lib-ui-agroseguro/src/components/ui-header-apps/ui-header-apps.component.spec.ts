import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiHeaderAppsComponent } from './ui-header-apps.component';

describe('UiHeaderAppsComponent', () => {
	let component: UiHeaderAppsComponent;
	let fixture: ComponentFixture<UiHeaderAppsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UiHeaderAppsComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UiHeaderAppsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the app name in the header', () => {
		fixture.componentRef.setInput('appName', 'TESTAPP');
		expect(component.appName()).toBe('TESTAPP');
	});
});
