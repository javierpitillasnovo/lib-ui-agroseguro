import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInputFileUploadComponent } from './demo-input-file-upload.component';

describe('DemoInputFileUploadComponent', () => {
  let component: DemoInputFileUploadComponent;
  let fixture: ComponentFixture<DemoInputFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoInputFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoInputFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
