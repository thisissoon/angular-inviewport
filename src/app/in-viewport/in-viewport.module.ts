import { ModuleWithProviders, NgModule } from '@angular/core';
import { InViewportDirective } from './in-viewport.directive';
import { WINDOW } from '../window/window-token';
import { WINDOW_MOCK } from '../window/window-mock';

/**
 * A simple lightweight library for Angular with other dependencies
 * that detects when an element is within the browsers viewport and adds a
 * sn-viewport--in or sn-viewport--out class to the element.
 */
@NgModule({
  declarations: [InViewportDirective],
  exports: [InViewportDirective],
})
export class InViewportModule {
  static forServer(): ModuleWithProviders<InViewportModule> {
    return {
      ngModule: InViewportModule,
      providers: [{ provide: WINDOW, useValue: WINDOW_MOCK }],
    };
  }
}
