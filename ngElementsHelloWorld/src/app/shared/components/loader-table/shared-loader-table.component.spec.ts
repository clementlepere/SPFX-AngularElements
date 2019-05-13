import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLoaderTableComponent } from './shared-loader-table.component';

/* tslint:disable:no-unused-variable */
describe('ShareLoaderTableComponent', () => {
  let component: SharedLoaderTableComponent;
  let fixture: ComponentFixture<SharedLoaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedLoaderTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLoaderTableComponent);
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
