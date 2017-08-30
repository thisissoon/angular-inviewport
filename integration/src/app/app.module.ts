import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import { AppComponent }  from './app.component';

export const getWindow = () => window;

export const providers: Provider[] = [
  {provide: WindowRef, useFactory: (getWindow)}
];

@NgModule({
  imports: [
    BrowserModule,
    InViewportModule.forRoot(providers)
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
