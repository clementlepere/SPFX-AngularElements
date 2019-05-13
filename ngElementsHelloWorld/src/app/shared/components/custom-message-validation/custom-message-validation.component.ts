import { MessageValidation } from './../../Models/messageValidation/messageValidation';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-message-validation',
  templateUrl: './custom-message-validation.component.html',
  styleUrls: ['./custom-message-validation.component.css'],
})
export class CustomMessageValidationComponent  {

  @Input()
  public config: MessageValidation;

  constructor() { }

}
