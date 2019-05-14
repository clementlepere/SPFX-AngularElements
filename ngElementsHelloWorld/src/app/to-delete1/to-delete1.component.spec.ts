import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDelete1Component } from './to-delete1.component';

describe('ToDelete1Component', () => {
  let component: ToDelete1Component;
  let fixture: ComponentFixture<ToDelete1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDelete1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDelete1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
