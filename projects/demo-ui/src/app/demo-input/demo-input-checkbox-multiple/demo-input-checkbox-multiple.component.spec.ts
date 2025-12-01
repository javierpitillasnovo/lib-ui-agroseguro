import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInputCheckboxMultipleComponent } from './demo-input-checkbox-multiple.component';

describe('DemoInputCheckboxMultipleComponent', () => {
  let component: DemoInputCheckboxMultipleComponent;
  let fixture: ComponentFixture<DemoInputCheckboxMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoInputCheckboxMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoInputCheckboxMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
