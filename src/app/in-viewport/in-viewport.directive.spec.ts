import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef, NgZone } from '@angular/core';
import { WindowRef } from './window/window-ref.service';
import { InViewportDirective } from './in-viewport.directive';
import { FakeDOMStandardElement } from '../testing/dom';
import { MockNgZone } from '../testing/mock-ng-zone';

describe('InViewportDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: InViewportDirective;
  const text = 'Exercitation est eu reprehenderit veniam anim veniam enim laboris nisi.';
  let windowRef: WindowRef;
  const rectSpy = jasmine.createSpy('rectSpy');
  const cdRef = { detectChanges: () => {} };
  let zone: NgZone;

  beforeEach(() => {
    windowRef = new FakeDOMStandardElement('window') as any as WindowRef;
    windowRef.innerWidth = 1366;
    windowRef.innerHeight = 768;
    (<any>windowRef).addEventListener = () => {};
    rectSpy.and.returnValue({ left: 0, right: 1366, top: 0, bottom: 500 });
    node = document.createElement('p');
    node.innerText = text;
    el = new ElementRef(node);
    el.nativeElement.getBoundingClientRect = rectSpy;
    zone = new MockNgZone();
    directive = new InViewportDirective(el, windowRef, <any>cdRef, zone);
    directive.ngAfterViewInit();
  });

  describe('element in viewport', () => {
    it('should return true for `isInViewport` property', () => {
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeTruthy();
    });

    it('should return false for `isNotInViewport` property', () => {
      directive.calculateInViewportStatus();
      expect(directive.isNotInViewport).toBeFalsy();
    });
  });

  describe('element NOT in viewport', () => {
    it('should return false for `isInViewport` property', () => {
      rectSpy.and.returnValue({ left: 0, right: 1366, top: 769, bottom: 1069 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({ left: 1367, right: 2367, top: 0, bottom: 0 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({ left: 0, right: 1366, top: -300, bottom: -100 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({ left: -1000, right: -500, top: 0, bottom: 500 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();
    });

    it('should return true for `isNotInViewport` property', () => {
      rectSpy.and.returnValue({ left: 0, right: 1366, top: 769, bottom: 1069 });
      directive.calculateInViewportStatus();
      expect(directive.isNotInViewport).toBeTruthy();

      rectSpy.and.returnValue({ left: 1367, right: 2367, top: 0, bottom: 0 });
      directive.calculateInViewportStatus();
      expect(directive.isNotInViewport).toBeTruthy();

      rectSpy.and.returnValue({ left: 0, right: 1366, top: -300, bottom: -100 });
      directive.calculateInViewportStatus();
      expect(directive.isNotInViewport).toBeTruthy();

      rectSpy.and.returnValue({ left: -1000, right: -500, top: 0, bottom: 500 });
      directive.calculateInViewportStatus();
      expect(directive.isNotInViewport).toBeTruthy();
    });
  });

  describe('emit events', () => {
    it('should emit event when `inViewport` value changes', () => {
      rectSpy.and.returnValue({ left: 0, right: 1366, top: -501, bottom: -1 });
      const spy = spyOn(directive.inViewportChange, 'emit');
      directive.calculateInViewportStatus();
      rectSpy.and.returnValue({ left: 0, right: 1366, top: 0, bottom: 500 });
      directive.calculateInViewportStatus();
      expect(spy).toHaveBeenCalledWith(true);

      spy.calls.reset();
      rectSpy.and.returnValue({ left: 0, right: 1366, top: 500, bottom: 1000 });
      directive.calculateInViewportStatus();
      expect(spy).not.toHaveBeenCalled();

      spy.calls.reset();
      rectSpy.and.returnValue({ left: 0, right: 1366, top: -501, bottom: -1 });
      directive.calculateInViewportStatus();
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('debounce event handler', () => {
    it('should debounce event handler', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.onViewportChange();
      tick(100);
      expect(spy).toHaveBeenCalled();
      directive.ngOnDestroy();
    }));

    it('should only run event handler if no more events in the debounce period', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.onViewportChange();
      tick(99);
      expect(spy).not.toHaveBeenCalled();
      directive.onViewportChange();
      tick(100);
      expect(spy).toHaveBeenCalledTimes(1);
      directive.ngOnDestroy();
    }));
  });

  describe('element is larger than viewport', () => {
    it('should return true for `isInViewport` property', () => {
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeTruthy();

      rectSpy.and.returnValue({ left: -100, right: 1400, top: 0, bottom: 500 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeTruthy();

      rectSpy.and.returnValue({ left: 0, right: 1366, top: -100, bottom: 1000 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeTruthy();
    });

    it('should return false for `isInViewport` property', () => {
      rectSpy.and.returnValue({ left: 0, right: 1366, top: -1000, bottom: -100 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();
    });
  });

  describe('scrollable parent element', () => {
    it('should add event handler for parent element scroll events', () => {
      const div = document.createElement('div');
      const spy = spyOn(div, 'addEventListener');
      directive.parent = div;
      directive.ngAfterViewInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit next value in viewport$ observable', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.onParentScroll();
      tick(200);
      expect(spy).toHaveBeenCalled();
    }));

    it('should calculate in viewport status with parent element', () => {
      const div: any = {};
      const parentRectSpy = jasmine.createSpy('parentRect');
      parentRectSpy.and.returnValue({ top: 100, left: 100, right: 500, bottom: 500 });
      rectSpy.and.returnValue({ left: 0, right: 1366, top: 501, bottom: 1000 });
      div.getBoundingClientRect = parentRectSpy;
      directive.parent = div;

      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({ left: 0, right: 1366, top: 100, bottom: 600 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeTruthy();

      rectSpy.and.returnValue({ left: 0, right: 1366, top: -399, bottom: 99 });
      directive.calculateInViewportStatus();
      expect(directive.isInViewport).toBeFalsy();
    });
  });

  describe('universal render', () => {
    it('should emit event when `inViewport` value changes', () => {
      const result = directive.isInElementViewport({ left: 0, right: 1366, top: 0, bottom: 500 }, { getBoundingClientRect: null });
      expect(result).toBeFalsy();
    });
  });
});
