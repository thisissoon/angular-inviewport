import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef, SimpleChanges } from '@angular/core';
import { InViewportDirective } from './in-viewport.directive';

describe('InViewportDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: InViewportDirective;
  const text = 'Exercitation est eu reprehenderit veniam anim veniam enim laboris nisi.';

  beforeEach(() => {
    node = document.createElement('p');
    node.innerText = text;
    el = new ElementRef(node);
    el.nativeElement = {
      getBoundingClientRect: () => {
        return {top: 300, bottom: 300, left: 300, right: 300};
      }
    };
    directive = new InViewportDirective(el);
    directive.ngOnInit();
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
      directive.calculateInViewportStatus({width: 200, height: 768});
      expect(directive.isInViewport).toBeFalsy();

      directive.calculateInViewportStatus({width: 1366, height: 200});
      expect(directive.isInViewport).toBeFalsy();
    });

    it('should return true for `isNotInViewport` property', () => {
      directive.calculateInViewportStatus({width: 200, height: 768});
      expect(directive.isNotInViewport).toBeTruthy();
    });
  });

  describe('emit events', () => {
    it('should emit event when `inViewport` value changes', () => {
      const spy = spyOn(directive.onInViewportChange, 'emit');
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(spy).toHaveBeenCalledWith(true);

      spy.calls.reset();
      directive.calculateInViewportStatus({width: 1366, height: 768});
      expect(spy).not.toHaveBeenCalled();

      spy.calls.reset();
      directive.calculateInViewportStatus({width: 200, height: 768});
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

});
