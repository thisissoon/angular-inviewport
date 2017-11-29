import { Component } from '@angular/core';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  highlight = false;

  onInViewportChange(inViewport: boolean) {
    this.highlight = inViewport;
  }
}
