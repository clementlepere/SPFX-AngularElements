import 'intl';
import 'intl/locale-data/jsonp/en';

import { Component, ElementRef, Input, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IsOnlineService } from '@app/core/services/helpers/isOnline.service';

// import { Version } from '@microsoft/sp-core-library';

// import {
//   BaseClientSideWebPart,
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-webpart-base';

// import { AppState } from '@app/app.service';
@Component({
  selector: 'app-root',
  // encapsulation: ViewEncapsulation.Native,
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css'],
})
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppComponent implements OnInit{
  @Input() isOnline: boolean;
  // title = 'Angular';
  constructor(elm: ElementRef, private router: Router, private isOnlineService: IsOnlineService) {
    this.isOnline = elm.nativeElement.getAttribute('isOnline');
    this.isOnline !== null && this.isOnline !== undefined ? this.isOnlineService.update(this.isOnline) : this.isOnlineService.update(false);
    console.log('******COMPONENT******');
  }

  public ngOnInit() {
    console.log('onInit app component');
  }
}
