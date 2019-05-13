import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loader',
  templateUrl: './shared-loader.component.html',
  styleUrls: ['shared-loader.component.css'],
})
export class SharedLoaderComponent {

	@Input()
    public display: boolean = false;
    @Input()
    public fontSize: string = "50";


  constructor(
  ) {}
}
