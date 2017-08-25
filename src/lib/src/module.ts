import { NgModule } from '@angular/core';

import { InViewportDirective } from './in-viewport.directive';

/**
 * A simple lightweight library for Angular 2/4+ with other dependencies
 * that detects when an element is within the browser viewport and adds a
 * sn-viewport-in or sn-viewport-out class to the element.
 *
 * @export
 * @class InViewportModule
 */
@NgModule({
  declarations: [InViewportDirective],
  exports: [InViewportDirective]
})
export class InViewportModule { }
