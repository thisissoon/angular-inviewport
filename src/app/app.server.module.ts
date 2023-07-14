import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { InViewportModule } from './in-viewport';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [AppModule, ServerModule, InViewportModule.forServer()],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
