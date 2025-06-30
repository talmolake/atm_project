import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReportComponent } from './send-report';

describe('GroupedMarkersComponent', () => {
  let component: SendReportComponent;
  let fixture: ComponentFixture<SendReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
