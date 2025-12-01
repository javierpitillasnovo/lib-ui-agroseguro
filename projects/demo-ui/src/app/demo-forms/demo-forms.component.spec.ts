import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFormsComponent } from './demo-forms.component';

describe('DemoFormsComponent', () => {
  let component: DemoFormsComponent;
  let fixture: ComponentFixture<DemoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
