import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InViewportModule, WindowRef } from './in-viewport';

const providers = [
  { provide: WindowRef, useValue: window }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule.forRoot(providers)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
