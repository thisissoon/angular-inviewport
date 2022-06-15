# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.0.1](https://github.com/thisissoon/angular-inviewport/compare/v5.0.0...v5.0.1) (2022-06-15)

## [5.0.0](https://github.com/thisissoon/angular-inviewport/compare/v4.2.2...v5.0.0) (2022-06-15)


### ⚠ BREAKING CHANGES

* requires Angular v10

### Bug Fixes

* **@nguniversal/module-map-ngfactory-loader:** remove module-map-ngfactory-loader (deprecated) ([30e6a57](https://github.com/thisissoon/angular-inviewport/commit/30e6a570bf8858f10fa2cc0c711f1e94487ebfa9))
* **package.json:** update package versions to go along with Angular v10 upgrade ([ea3b739](https://github.com/thisissoon/angular-inviewport/commit/ea3b739fbd327579c942511ae6f71a108e83a412)), closes [#41](https://github.com/thisissoon/angular-inviewport/issues/41)
* **polyfills,lock file:** update polyfills to use proper references; rebuild lock file ([ef09fe0](https://github.com/thisissoon/angular-inviewport/commit/ef09fe0490d9247022ef9e379daa0a6d7e860934)), closes [#41](https://github.com/thisissoon/angular-inviewport/issues/41)
* update packages for audit issues ([2e8e7f5](https://github.com/thisissoon/angular-inviewport/commit/2e8e7f5e1d580cc0555e613289c838c3e6a9fbf0)), closes [#41](https://github.com/thisissoon/angular-inviewport/issues/41)
* Upgrade to Angular v10 ([3e5b1ca](https://github.com/thisissoon/angular-inviewport/commit/3e5b1ca233d0d55d5865125c6ce6ac8afafae679))

<a name="4.2.2"></a>
## [4.2.2](https://github.com/thisissoon/angular-inviewport/compare/v4.2.1...v4.2.2) (2020-02-03)



<a name="4.2.1"></a>
## [4.2.1](https://github.com/thisissoon/angular-inviewport/compare/v4.2.0...v4.2.1) (2020-02-03)


### Bug Fixes

* **window-mock:** replace intersection observer arrow functino with regular function to allow for use as a constructor. ([287fe3c](https://github.com/thisissoon/angular-inviewport/commit/287fe3c))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/thisissoon/angular-inviewport/compare/v4.1.0...v4.2.0) (2019-02-01)


### Features

* **in-viewport:** integrate feature detection for intersection observer ([4fc1a21](https://github.com/thisissoon/angular-inviewport/commit/4fc1a21)), closes [#31](https://github.com/thisissoon/angular-inviewport/issues/31)



<a name="4.1.0"></a>
# [4.1.0](https://github.com/thisissoon/angular-inviewport/compare/v4.0.0...v4.1.0) (2018-11-21)


### Features

* **in-viewport:** add angular 7 support ([e1e9f30](https://github.com/thisissoon/angular-inviewport/commit/e1e9f30))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/thisissoon/angular-inviewport/compare/v3.0.1...v4.0.0) (2018-10-08)


### Features

* **InViewport:** add ability set offset using IntersectionObserver options ([#26](https://github.com/thisissoon/angular-inviewport/issues/26)) ([cacca75](https://github.com/thisissoon/angular-inviewport/commit/cacca75)), closes [#4](https://github.com/thisissoon/angular-inviewport/issues/4)


### Performance Improvements

* **InViewport:** use intersection observer to calculate inviewport state ([#25](https://github.com/thisissoon/angular-inviewport/issues/25)) ([b722d3f](https://github.com/thisissoon/angular-inviewport/commit/b722d3f))


### BREAKING CHANGES

* **InViewport:** Removed `forRoot` method in module which is no longer required for `AppBrowserModule`. Replaced with `forServer` method for `AppServerModule`. Removed debounce feature and rxjs dependancy to leave implementation up to the consumer of the library. This reduces bundle size if debounce feature is not being used. Updated inviewport classes to `sn-inviewport--in` and `sn-inviewport--out` to match SOON styleguide



<a name="3.0.1"></a>

## [3.0.1](https://github.com/thisissoon/angular-inviewport/compare/v3.0.0...v3.0.1) (2018-07-20)

### Bug Fixes

* **window-ref:** remove incorrect pageOffset properties ([e967d32](https://github.com/thisissoon/angular-inviewport/commit/e967d32))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/thisissoon/angular-inviewport/compare/v2.2.0...v3.0.0) (2018-05-23)

### Features

* **inviewport:** adding support for angular 6 ([aeecd91](https://github.com/thisissoon/angular-inviewport/commit/aeecd91))

### BREAKING CHANGES

* **inviewport:** rxjs > 6 is now a peer dependency

<a name="2.2.0"></a>

# [2.2.0](https://github.com/thisissoon/angular-inviewport/compare/v2.1.1...v2.2.0) (2018-02-20)

### Bug Fixes

* fix peer dependancy for [@angular](https://github.com/angular)/core to 5.x.x ([20f39d4](https://github.com/thisissoon/angular-inviewport/commit/20f39d4))

### Features

* **InViewport:** export directive to be able to trigger inviewport check manually ([9903a0c](https://github.com/thisissoon/angular-inviewport/commit/9903a0c)), closes [#9](https://github.com/thisissoon/angular-inviewport/issues/9)

<a name="2.1.1"></a>

## [2.1.1](https://github.com/thisissoon/angular-inviewport/compare/v2.1.0...v2.1.1) (2018-01-23)

### Bug Fixes

* **WindowRef:** add arguments to window ref functions ([d512399](https://github.com/thisissoon/angular-inviewport/commit/d512399))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/thisissoon/angular-inviewport/compare/v2.0.0...v2.1.0) (2018-01-23)

### Bug Fixes

* **InViewport:** Fix module not working with aot ([92ace50](https://github.com/thisissoon/angular-inviewport/commit/92ace50))

### BREAKING CHANGES

* **InViewport:** Must provide the whole Provide object when providing window for browser module

<a name="2.0.0"></a>

# [2.0.0](https://github.com/thisissoon/angular-inviewport/compare/v2.0.0-rc.0...v2.0.0) (2018-01-23)

<a name="2.0.0-rc.0"></a>

# [2.0.0-rc.0](https://github.com/thisissoon/angular-inviewport/compare/v1.4.3...v2.0.0-rc.0) (2018-01-23)

### Features

* **InViewport:** Updating WindowRef service with more mock properties and functions ([6c0264a](https://github.com/thisissoon/angular-inviewport/commit/6c0264a))

### BREAKING CHANGES

* **InViewport:** inViewportModule.forRoot function now only accepts a single argument which should
  be a reference to window or a mock window implementation

<a name="1.4.3"></a>

## [1.4.3](https://github.com/thisissoon/angular-inviewport/compare/v1.4.2...v1.4.3) (2018-01-04)

### Bug Fixes

* **InViewport:** Fixed a regression when used in angular universal app ([5c210c1](https://github.com/thisissoon/angular-inviewport/commit/5c210c1))

<a name="1.4.2"></a>

## [1.4.2](https://github.com/thisissoon/angular-inviewport/compare/v1.4.1...v1.4.2) (2017-12-04)

### Bug Fixes

* **build:** generate correct metadata needed for ng-language-service ([26a0c08](https://github.com/thisissoon/angular-inviewport/commit/26a0c08))

<a name="1.4.1"></a>

## [1.4.1](https://github.com/thisissoon/angular-inviewport/compare/v1.4.0...v1.4.1) (2017-12-04)

<a name="1.4.0"></a>

# [1.4.0](https://github.com/thisissoon/angular-inviewport/compare/v1.4.0-rc.1...v1.4.0) (2017-11-29)

<a name="1.4.0-rc.1"></a>

# [1.4.0-rc.1](https://github.com/thisissoon/angular-inviewport/compare/v1.4.0-rc.0...v1.4.0-rc.1) (2017-11-29)

### Bug Fixes

* **packagr:** export all symbol reference in public_api.ts ([2d0eaec](https://github.com/thisissoon/angular-inviewport/commit/2d0eaec))

<a name="1.4.0-rc.0"></a>

# [1.4.0-rc.0](https://github.com/thisissoon/angular-inviewport/compare/v1.3.2...v1.4.0-rc.0) (2017-11-29)

### Breaking Changes

* **InViewport:** Changed `(onInViewportChange)` output to `(inViewportChange)`. Changed `[snInViewportParent]` input to `[parent]`. This was to pass default linting options with the angular cli ([f86f1c6](https://github.com/thisissoon/angular-inviewport/commit/f86f1c6))

<a name="1.3.2"></a>

## [1.3.2](https://github.com/thisissoon/angular-inviewport/compare/v1.3.1...v1.3.2) (2017-11-28)

### Bug Fixes

* **inViewport:** Avoid triggering change detection unless necessary ([e90067b](https://github.com/thisissoon/angular-inviewport/commit/e90067b))

<a name="1.3.1"></a>

## [1.3.1](https://github.com/thisissoon/angular-inviewport/compare/v1.3.0...v1.3.1) (2017-11-13)

### Bug Fixes

* **inViewport:** Fix app breaking when rendering on universal ([5b5dd4f](https://github.com/thisissoon/angular-inviewport/commit/5b5dd4f))

<a name="1.3.0"></a>

# [1.3.0](https://github.com/thisissoon/angular-inviewport/compare/v1.2.0...v1.3.0) (2017-08-30)

### Bug Fixes

* **InViewport:** Use getBoundingClientRect to get element position in viewport ([8a845a3](https://github.com/thisissoon/angular-inviewport/commit/8a845a3))

### Breaking Changes

* **InViewport:** `InViewportModule` now has to be imported with `forRoot(providers)` where `providers` has a `WindowRef` class included which should be used to provide a window object ([8a845a3](https://github.com/thisissoon/angular-inviewport/commit/8a845a3))

<a name="1.2.0"></a>

# [1.2.0](https://github.com/thisissoon/angular-inviewport/compare/v1.1.0...v1.2.0) (2017-08-29)

### Features

* **InViewport:** Added ability to specify a parent scroll container ([1045d86](https://github.com/thisissoon/angular-inviewport/commit/1045d86)), closes [#7](https://github.com/thisissoon/angular-inviewport/issues/7)

<a name="1.1.0"></a>

# [1.1.0](https://github.com/thisissoon/angular-inviewport/compare/v1.0.1...v1.1.0) (2017-08-25)

### Features

* **InViewport:** update directive selector so it matches snInViewport attribute ([0292245](https://github.com/thisissoon/angular-inviewport/commit/0292245)), closes [#5](https://github.com/thisissoon/angular-inviewport/issues/5)

<a name="1.0.1"></a>

## [1.0.1](https://github.com/thisissoon/angular-inviewport/compare/v1.0.0...v1.0.1) (2017-08-15)

<a name="1.0.0"></a>

# [1.0.0](https://github.com/thisissoon/angular-inviewport/compare/v0.2.3...v1.0.0) (2017-08-15)

### Features

* **inViewport:** moving package to thisissoon org ([7aeb1a1](https://github.com/thisissoon/angular-inviewport/commit/7aeb1a1))

<a name="0.2.3"></a>

## [0.2.3](https://github.com/edoparearyee/angular-inviewport/compare/v0.2.2...v0.2.3) (2017-08-09)

### Bug Fixes

* **inViewport:** calculation did not take into account all scenarios from both axes ([3d67ec9](https://github.com/edoparearyee/angular-inviewport/commit/3d67ec9))

<a name="0.2.2"></a>

## [0.2.2](https://github.com/edoparearyee/angular-inviewport/compare/v0.2.1...v0.2.2) (2017-08-09)

### Bug Fixes

* **inViewport:** fix inViewport calculation on mobile ([9777264](https://github.com/edoparearyee/angular-inviewport/commit/9777264))

<a name="0.2.1"></a>

## [0.2.1](https://github.com/edoparearyee/angular-inviewport/compare/v0.2.0...v0.2.1) (2017-08-09)

### Bug Fixes

* **inViewport:** inViewport status not being set correctly for large elements ([7b85443](https://github.com/edoparearyee/angular-inviewport/commit/7b85443))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/edoparearyee/angular-inviewport/compare/v0.1.3...v0.2.0) (2017-08-03)

### Features

* **inViewport:** Debounce event handler to improve performance ([0b44112](https://github.com/edoparearyee/angular-inviewport/commit/0b44112))

<a name="0.1.3"></a>

## [0.1.3](https://github.com/edoparearyee/angular-inviewport/compare/v0.1.2...v0.1.3) (2017-07-29)

### Bug Fixes

* **build:** ensure build is run before publishing package ([bd12500](https://github.com/edoparearyee/angular-inviewport/commit/bd12500))
* **build:** run build after release ([b43771e](https://github.com/edoparearyee/angular-inviewport/commit/b43771e))

<a name="0.1.2"></a>

## [0.1.2](https://github.com/edoparearyee/angular-inviewport/compare/v0.1.1...v0.1.2) (2017-07-28)

<a name="0.1.1"></a>

## [0.1.1](https://github.com/edoparearyee/angular-inviewport/compare/v0.1.0...v0.1.1) (2017-07-27)

### Bug Fixes

* **build:** make sure to run build before release ([ae3a797](https://github.com/edoparearyee/angular-inviewport/commit/ae3a797))

<a name="0.1.0"></a>

# [0.1.0](https://github.com/edoparearyee/angular-inviewport/compare/0.0.2...0.1.0) (2017-07-27)

### Features

* **inViewport:** directive will emit onInViewportChange event when inViewport value changes ([fc63560](https://github.com/edoparearyee/angular-inviewport/commit/fc63560))

<a name="0.0.2"></a>

## [0.0.2](https://github.com/edoparearyee/angular-inviewport/commit/6f04f8f) (2017-07-18)

### Features

* **inViewport:** initial release ([6f04f8f](https://github.com/edoparearyee/angular-inviewport/commit/6f04f8f))
