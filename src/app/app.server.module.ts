import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { InViewportModule } from './in-viewport';

@NgModule({
  imports: [AppModule, ServerModule, InViewportModule.forServer()],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
