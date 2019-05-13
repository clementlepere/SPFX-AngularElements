import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageValidationComponent } from './custom-message-validation.component';

/* tslint:disable:no-unused-variable */
describe('CustomMessageValidationComponent', () => {
  let component: CustomMessageValidationComponent;
  let fixture: ComponentFixture<CustomMessageValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMessageValidationComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMessageValidationComponent);
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
