import { Component } from '@angular/core';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  highlight = false;
  options: IntersectionObserverInit = {
    rootMargin: '-100px 0px 50px 0px',
  };

  bigMockData = new Array(100);

  onInViewportChange(inViewport: boolean) {
    this.highlight = inViewport;
  }
}
