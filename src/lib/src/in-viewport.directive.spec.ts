import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef, SimpleChanges } from '@angular/core';
import { InViewportDirective } from './in-viewport.directive';

describe('InViewportDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: InViewportDirective;
  const text = 'Exercitation est eu reprehenderit veniam anim veniam enim laboris nisi.';
  const rectSpy = jasmine.createSpy('rect');

  beforeEach(() => {
    node = document.createElement('p');
    node.innerText = text;
    el = new ElementRef(node);
    el.nativeElement = {
      getBoundingClientRect: rectSpy
    };
    directive = new InViewportDirective(el);
    directive.ngOnInit();
    rectSpy.and.returnValue({top: 100, bottom: 400, left: 100, right: 400});
  });

  describe('element in viewport', () => {
    it('should return true for `isInViewport` property', () => {
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeTruthy();
    });

    it('should return false for `isNotInViewport` property', () => {
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isNotInViewport).toBeFalsy();
    });
  });

  describe('element NOT in viewport', () => {
    it('should return false for `isInViewport` property', () => {
      rectSpy.and.returnValue({top: -400, bottom: -100, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({top: 1000, bottom: 1300, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({top: -400, bottom: -100, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeFalsy();

      rectSpy.and.returnValue({top: 100, bottom: 400, left: -400, right: -100});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeFalsy();
    });

    it('should return true for `isNotInViewport` property', () => {
      rectSpy.and.returnValue({top: -400, bottom: -100, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isNotInViewport).toBeTruthy();

      rectSpy.and.returnValue({top: 1000, bottom: 1300, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isNotInViewport).toBeTruthy();

      rectSpy.and.returnValue({top: -400, bottom: -100, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isNotInViewport).toBeTruthy();

      rectSpy.and.returnValue({top: 100, bottom: 400, left: -400, right: -100});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isNotInViewport).toBeTruthy();
    });
  });

  describe('emit events', () => {
    it('should emit event when `inViewport` value changes', () => {
      const spy = spyOn(directive.onInViewportChange, 'emit');
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(spy).toHaveBeenCalledWith(true);

      spy.calls.reset();
      rectSpy.and.returnValue({top: 500, bottom: 800, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(spy).not.toHaveBeenCalled();

      spy.calls.reset();
      rectSpy.and.returnValue({top: 1000, bottom: 1300, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('debounce event handler', () => {
    it('should debounce event handler', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.eventHandler(768, 1366);
      tick(100);
      expect(spy).toHaveBeenCalledWith({width: 1366, height: 768});
      directive.ngOnDestroy();
    }));

    it('should only run event handler if no more events in the debounce period', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.eventHandler(768, 1366);
      tick(99);
      expect(spy).not.toHaveBeenCalled();
      directive.eventHandler(768, 1366);
      tick(100);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({width: 1366, height: 768});
      directive.ngOnDestroy();
    }));
  });

  describe('element is larger than viewport', () => {
    it('should return true for `isInViewport` property', () => {
      rectSpy.and.returnValue({top: -50, bottom: 1000, left: 100, right: 400});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeTruthy();

      rectSpy.and.returnValue({top: 100, bottom: 400, left: -100, right: 1500});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeTruthy();

      rectSpy.and.returnValue({top: 100, bottom: 400, left: -100, right: 700});
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(directive.isInViewport).toBeTruthy();
    });
  });

});
