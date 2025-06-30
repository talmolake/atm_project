import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLogComponent } from './report-log.component';

describe('ReportLogComponent', () => {
  let component: ReportLogComponent;
  let fixture: ComponentFixture<ReportLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
