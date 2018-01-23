# Angular InViewport
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

A simple lightweight library for [Angular (2/4/5+)][angular] with no other dependencies that detects when an element is within the browser viewport and adds a `sn-viewport-in` or `sn-viewport-out` class to the element.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v5.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).


## Install

### npm

```
npm i @thisissoon/angular-inviewport --save
```
### yarn

```
yarn add @thisissoon/angular-inviewport
```

`app.module.ts`
```ts
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
  imports: [
    // pass window object to forRoot function
    InViewportModule.forRoot(window)
  ]
})
export class AppModule { }
```

`app.server.module.ts`
```ts
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
  imports: [
    // no need to pass any arguments to forRoot
    // function for server module
    InViewportModule.forRoot()
  ]
})
export class AppServerModule { }
```


## Examples

### Just using classes

#### `app.component.html`

```html
<p class="foo" snInViewport>Amet tempor excepteur occaecat nulla.</p>
```

#### `app.component.css`

```css
.foo {
  transition: transform .35s ease-out;
}

.foo.sn-viewport-out {
  transform: translateY(-30px);
}

.foo.sn-viewport-in {
  transform: translateY(0);
}
```

### Using events

#### `app.component.html`

```html
<p class="foo" snInViewport (inViewportChange)="onInViewportChange($event)">
  Amet tempor excepteur occaecat nulla.
</p>
```

#### `app.component.ts`

```ts
export class AppComponent {
  highlight = false;

  onInViewportChange(inViewport: boolean) {
    this.highlight = inViewport;
  }
}
```

#### `app.component.css`

```css
.highlight {
  background-color: yellow;
}
```

### Specify debounce time (default: 100ms)

#### `app.component.html`

```html
<p class="foo" snInViewport [debounce]="500">
  Amet tempor excepteur occaecat nulla.
</p>
```

### Specify parent scrollable element

Useful if element is within another scrollable element

#### `app.component.html`

```html
<div #container>
  <p class="foo" snInViewport [debounce]="500" [parent]="container">
    Amet tempor excepteur occaecat nulla.
  </p>
</div>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[travis-badge]: https://travis-ci.org/thisissoon/angular-inviewport.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-inviewport
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-inviewport/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-inviewport?branch=master
[angular]: https://angular.io/
