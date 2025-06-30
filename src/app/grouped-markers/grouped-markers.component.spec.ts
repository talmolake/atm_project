import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedMarkersComponent } from './grouped-markers.component';

describe('GroupedMarkersComponent', () => {
  let component: GroupedMarkersComponent;
  let fixture: ComponentFixture<GroupedMarkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedMarkersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupedMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
