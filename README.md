# Angular InViewport

[![CircleCI][circle-badge]][circle-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]
[![Commitizen friendly][commitizen-badge]][commitizen]

A simple lightweight library for [Angular][angular] that detects when an element is within the browser viewport and adds a `sn-viewport--in` or `sn-viewport--out` class to the element.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v5.0][apfv5].

## Install

### via NPM

```bash
npm i @thisissoon/angular-inviewport
```

### via Yarn

```bash
yarn add @thisissoon/angular-inviewport
```

`app.module.ts`

```ts
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
  imports: [InViewportModule]
})
export class AppModule {}
```

`app.server.module.ts`
Only required For Server Side Rendering

```ts
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
  imports: [InViewportModule.forServer()]
})
export class AppServerModule {}
```

## Browser Support

This library makes use of the [Intersection Observer API][intersection-observer-api] which requires a [polyfill][intersection-observer-polyfill] to work on some browsers.

### Install the polyfill

```bash
npm i intersection-observer
```

Or use yarn

```bash
yarn add intersection-observer
```

### Include the polyfill

Add this somewhere in your `src/polyfills.ts` file

```ts
import 'intersection-observer';
```

## Examples

A working example can be found [here](https://github.com/thisissoon/angular-inviewport/tree/master/src).

### Just using classes

#### `app.component.html`

```html
<p class="foo" snInViewport>Amet tempor excepteur occaecat nulla.</p>
```

#### `app.component.css`

```css
.foo {
  transition: transform 0.35s ease-out;
}

.foo.sn-viewport--out {
  transform: translateY(-30px);
}

.foo.sn-viewport--in {
  transform: translateY(0);
}
```

### Using events

#### `app.component.html`

```html
<p
  class="foo"
  [ngClass]="{highlight: highlight}"
  snInViewport
  (inViewportChange)="onInViewportChange($event)">
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

### Debounce example

#### `app.component.html`

```html
<p
  class="foo"
  snInViewport
  (inViewportChange)="onInViewportChange($event)">
  Amet tempor excepteur occaecat nulla.
</p>
```
po
#### `app.component.ts`

```ts
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class AppComponent {
  inViewportChange: Subject<boolean>;

  constructor() {
    this.inViewportChange = new Subject<boolean>().pipe(debounceTime(300));

    this.inViewportChange.subscribe((inViewport: boolean) =>
      console.log(`element is in viewport: ${inViewport}`)
    );
  }

  onInViewportChange(inViewport: boolean) {
    this.inViewportChange.next(inViewport);
  }
}
```

### Offset example

You can pass any options [Intersection Observer][intersection-observer-api] accepts using the `[inViewportOptions]` property. This allows offsets to be set using the `rootMargin` property. This property works the same as `margin` property in CSS.

#### `app.component.html`

```html
<p
  class="foo"
  snInViewport
  [inViewportOptions]="{
    rootMargin: '100px 0px 0px 0px'
  }">
  Amet tempor excepteur occaecat nulla.
</p>
```

### Limit example

#### `app.component.html`

```html
<p
  class="foo"
  [ngClass]="{highlight: highlight}"
  snInViewport
  (inViewportChange)="onInViewportChange($event)">
  Amet tempor excepteur occaecat nulla.
</p>
```

#### `app.component.ts`

```ts
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export class AppComponent {
  inViewportChange = new Subject;
  highlight = false;

  constructor() {
    this.inViewportChange = new Subject<boolean>().pipe(take(5));

    this.inViewportChange.subscribe((inViewport: boolean) =>
      this.highlight = inViewport;
    );
  }

  onInViewportChange(inViewport: boolean) {
    this.inViewportChange.next(inViewport);
  }
}
```

#### `app.component.css`

```css
.highlight {
  background-color: yellow;
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Server side rendering

The app can be rendered on a server before serving pages to the client. Server side rendering is achieved using [Express](https://expressjs.com/) and [Angular Universal](https://github.com/angular/universal) with [Express](https://expressjs.com/) running a [node](https://nodejs.org/en/) web server and [@nguniversal/express-engine](https://github.com/angular/universal/tree/master/modules/express-engine) providing a template engine for [Express](https://expressjs.com/) to render the angular pages.

Run `npm run build:ssr && npm run serve:ssr` to build client and server bundles and run an express app which will render the angular templates before being sent to the client. Navigate to `http://localhost:4000/` to view the SSR version of the app.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Making Commits

This repo uses [Commitizen CLI][commitizen] and [Conventional Changelog][conventional-changelog] to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

## Making Releases

Run `npm run release` to create a new release. This will use [Standard Version][standard-version] to create a new release. [Standard Version][standard-version] will generate / update the changelog based on commits generated using [Commitizen CLI][commitizen], update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

[circle-badge]: https://circleci.com/gh/thisissoon/angular-inviewport.svg?style=shield
[circle-badge-url]: https://circleci.com/gh/thisissoon/angular-inviewport
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-inviewport/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-inviewport?branch=master
[angular]: https://angular.io/
[commitizen]: http://commitizen.github.io/cz-cli/
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog
[standard-version]: https://github.com/conventional-changelog/standard-version
[apfv5]: https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx
[intersection-observer-api]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
[intersection-observer-polyfill]: https://github.com/w3c/IntersectionObserver/tree/master/polyfill
