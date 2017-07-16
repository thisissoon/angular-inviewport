import { NgModule } from '@angular/core';

import { InViewportDirective } from './in-viewport.directive';

@NgModule({
  declarations: [InViewportDirective],
  exports: [InViewportDirective]
})
export class InViewportModule { }
