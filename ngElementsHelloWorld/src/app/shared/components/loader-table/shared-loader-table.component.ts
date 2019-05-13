import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loader-table',
  templateUrl: './shared-loader-table.component.html',
  styleUrls: ['shared-loader-table.component.css'],
})
export class SharedLoaderTableComponent {

  @Input()
  public display: boolean = false;
  @Input()
  public fontSize: string = "50";

  constructor(
  ) { }
}
