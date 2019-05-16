import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'no-content',
  templateUrl: './no-content.component.html',
})
export class NoContentComponent implements OnInit {

  constructor(private router: Router, ) { }

  public ngOnInit() {
    console.log('ngOnInit no content');
  }
}
