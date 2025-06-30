import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInterfaceComponent } from './map-interface.component';

describe('MapInterfaceComponent', () => {
  let component: MapInterfaceComponent;
  let fixture: ComponentFixture<MapInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
