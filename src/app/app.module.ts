import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InViewportModule } from './in-viewport';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule.forRoot(window)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
