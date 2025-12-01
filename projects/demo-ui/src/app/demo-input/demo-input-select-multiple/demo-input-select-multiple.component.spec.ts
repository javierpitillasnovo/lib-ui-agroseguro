import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInputSelectMultipleComponent } from './demo-input-select-multiple.component';

describe('DemoInputSelectMultipleComponent', () => {
  let component: DemoInputSelectMultipleComponent;
  let fixture: ComponentFixture<DemoInputSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoInputSelectMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoInputSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
