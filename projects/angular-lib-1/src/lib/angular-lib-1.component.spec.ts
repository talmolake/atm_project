import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLib1Component } from './angular-lib-1.component';

describe('AngularLib1Component', () => {
  let component: AngularLib1Component;
  let fixture: ComponentFixture<AngularLib1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularLib1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularLib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
