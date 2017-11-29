import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppComponent } from './app.component';
import { InViewportModule, WindowRef } from './in-viewport';

export const getWindow = () => window;

export const inViewportProviders: Provider[] = [
  { provide: WindowRef, useFactory: (getWindow) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule.forRoot(inViewportProviders)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
