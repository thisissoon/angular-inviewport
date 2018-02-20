import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { WindowRef } from './window/window-ref.service';

import { InViewportDirective } from './in-viewport.directive';

const defaultProviders = [
  WindowRef
];

/**
 * A simple lightweight library for Angular with other dependencies
 * that detects when an element is within the browser viewport and adds a
 * sn-viewport-in or sn-viewport-out class to the element.
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
   * @memberof InViewportModule
   */
  public static forRoot(providers: Provider[] = defaultProviders): ModuleWithProviders {
    return {
      ngModule: InViewportModule,
      providers: providers
    };
  }
}
