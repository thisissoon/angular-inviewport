# Angular InViewport
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

A simple lightweight library for [Angular (2+)][angular] with no other dependencies that detects when an element is within the browser viewport and adds a `sn-viewport-in` or `sn-viewport-out` class to the element.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).


## Install

`npm i @thisissoon/angular-inviewport --save`

`app.module.ts`
```ts
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
  imports: [
    InViewportModule
  ]
})
export class AppModule { }
```


## Example

### Just using classes

```html
<p class="foo" snInViewport>Amet tempor excepteur occaecat nulla.</p>
```

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

```html
<p class="foo" snInViewport (onInViewportChange)="onInViewportChange($event)">
  Amet tempor excepteur occaecat nulla.
</p>
```

```ts
export class AppComponent {
  highlight = false;

  onInViewportChange(inViewport: boolean) {
    this.highlight = inViewport;
  }
}
```

```css
.highlight {
  background-color: yellow;
}
```

### Specify debounce time (default: 100ms)

```html
<p class="foo" snInViewport [debounce]="500">
  Amet tempor excepteur occaecat nulla.
</p>
```

[travis-badge]: https://travis-ci.org/thisissoon/angular-inviewport.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-inviewport
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-inviewport/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-inviewport?branch=master
[angular]: https://angular.io/
