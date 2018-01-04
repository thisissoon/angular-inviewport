# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
