import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from './in-viewport';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    InViewportModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
