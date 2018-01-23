import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { WindowRef } from './window/window.service';
import { WINDOW } from './window/window-token';

import { InViewportDirective } from './in-viewport.directive';

const defaultWindowRef = new WindowRef();

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
export class InViewportModule {
  /**
   * Specify a static method for root module to ensure providers are only provided once
   * but allows the module to still be imported into other modules without reproviding
   * services.
   *
   * @static
   * @param {any} [windowRef=defaultWindowRef]
   * @returns {ModuleWithProviders}
   * @memberof InViewportModule
   */
  public static forRoot(windowRef: any = defaultWindowRef): ModuleWithProviders {
    return {
      ngModule: InViewportModule,
      providers: [
        { provide: WINDOW, useValue: windowRef }
      ]
    };
  }
}
