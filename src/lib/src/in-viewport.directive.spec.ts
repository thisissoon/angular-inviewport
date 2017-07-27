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
  });

  describe('element in viewport', () => {
    it('should return true for `isInViewport` property', () => {
      directive.onViewportChange(1366, 768);
      expect(directive.isInViewport).toBeTruthy();
    });

    it('should return false for `isNotInViewport` property', () => {
      directive.onViewportChange(1366, 768);
      expect(directive.isNotInViewport).toBeFalsy();
    });
  });

  describe('element NOT in viewport', () => {
    it('should return false for `isInViewport` property', () => {
      directive.onViewportChange(200, 768);
      expect(directive.isInViewport).toBeFalsy();

      directive.onViewportChange(1366, 200);
      expect(directive.isInViewport).toBeFalsy();
    });

    it('should return true for `isNotInViewport` property', () => {
      directive.onViewportChange(200, 768);
      expect(directive.isNotInViewport).toBeTruthy();
    });
  });

  describe('emit events', () => {
    it('should emit event when `inViewport` value changes', () => {
      const spy = spyOn(directive.onInViewportChange, 'emit');
      directive.onViewportChange(1366, 768);
      expect(spy).toHaveBeenCalledWith(true);

      spy.calls.reset();
      directive.onViewportChange(1366, 768);
      expect(spy).not.toHaveBeenCalled();

      spy.calls.reset();
      directive.onViewportChange(200, 768);
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

});
