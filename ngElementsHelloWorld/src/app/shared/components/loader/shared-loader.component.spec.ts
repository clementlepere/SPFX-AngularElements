import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLoaderComponent } from './shared-loader.component';

/* tslint:disable:no-unused-variable */
describe('SharedLoaderComponent', () => {
  let component: SharedLoaderComponent;
  let fixture: ComponentFixture<SharedLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedLoaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //Global tests
  describe('Global tests', () => {
    it('should have a defined component', () => {
      expect(component).toBeDefined();
    });
  });

});