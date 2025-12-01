import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPaginationComponent } from './demo-pagination.component';

describe('DemoPaginationComponent', () => {
  let component: DemoPaginationComponent;
  let fixture: ComponentFixture<DemoPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
