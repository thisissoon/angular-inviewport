import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule, WindowRef } from 'angular-inviewport';

export const getWindow = () => window;

export const providers: Provider[] = [
  {provide: WindowRef, useFactory: (getWindow)}
];

import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    InViewportModule.forRoot(providers)
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
