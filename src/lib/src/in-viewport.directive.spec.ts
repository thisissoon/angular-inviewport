import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { InViewportDirective } from './in-viewport.directive';

describe('InViewportDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: InViewportDirective;
  const renderer = {
    listen: (element: HTMLElement, event: string, callback: () => void) => { }
  };
  const text = 'Exercitation est eu reprehenderit veniam anim veniam enim laboris nisi.';

  beforeEach(() => {
    node = document.createElement('p');
    node.innerText = text;
    el = new ElementRef(node);
    el.nativeElement = {offsetTop: 100, offsetLeft: 100, offsetWidth: 300, offsetHeight: 300, style: {}};
    directive = new InViewportDirective(el, <any>renderer);
    directive.ngOnInit();
  });

  describe('element in viewport', () => {
    it('should return true for `isInViewport` property', () => {
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isInViewport).toBeTruthy();
    });

    it('should return false for `isNotInViewport` property', () => {
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isNotInViewport).toBeFalsy();
    });
  });

  describe('element NOT in viewport', () => {
    it('should return false for `isInViewport` property', () => {
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 500});
      expect(directive.isInViewport).toBeFalsy();

      el.nativeElement.offsetTop = 800;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isInViewport).toBeFalsy();

      el.nativeElement.offsetTop = 100;
      el.nativeElement.offsetLeft = 1500;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isInViewport).toBeFalsy();

      el.nativeElement.offsetTop = 100;
      el.nativeElement.offsetLeft = 100;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 500, scrollY: 0});
      expect(directive.isInViewport).toBeFalsy();
    });

    it('should return true for `isNotInViewport` property', () => {
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 500});
      expect(directive.isNotInViewport).toBeTruthy();

      el.nativeElement.offsetTop = 800;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isNotInViewport).toBeTruthy();

      el.nativeElement.offsetTop = 100;
      el.nativeElement.offsetLeft = 1500;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isNotInViewport).toBeTruthy();

      el.nativeElement.offsetTop = 100;
      el.nativeElement.offsetLeft = 100;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 500, scrollY: 0});
      expect(directive.isNotInViewport).toBeTruthy();
    });
  });

  describe('emit events', () => {
    it('should emit event when `inViewport` value changes', () => {
      const spy = spyOn(directive.onInViewportChange, 'emit');
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(spy).toHaveBeenCalledWith(true);

      spy.calls.reset();
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 100, scrollY: 100});
      expect(spy).not.toHaveBeenCalled();

      spy.calls.reset();
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 500});
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('debounce event handler', () => {
    it('should debounce event handler', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.onViewportChange(768, 1366, 0, 0);
      tick(100);
      expect(spy).toHaveBeenCalledWith({width: 1366, height: 768, scrollY: 0, scrollX: 0});
      directive.ngOnDestroy();
    }));

    it('should only run event handler if no more events in the debounce period', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      directive.onViewportChange(768, 1366, 0, 0);
      tick(99);
      expect(spy).not.toHaveBeenCalled();
      directive.onViewportChange(768, 1366, 0, 0);
      tick(100);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      directive.ngOnDestroy();
    }));
  });

  describe('element is larger than viewport', () => {
    it('should return true for `isInViewport` property', () => {
      el.nativeElement.offsetHeight = 1000;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 200});
      expect(directive.isInViewport).toBeTruthy();

      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 400});
      expect(directive.isInViewport).toBeTruthy();

      el.nativeElement.offsetHeight = 300;
      el.nativeElement.offsetWidth = 1000;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 200, scrollY: 0});
      expect(directive.isInViewport).toBeTruthy();
    });

    it('should return false for `isInViewport` property', () => {
      el.nativeElement.offsetTop = 1000;
      el.nativeElement.offsetleft = 0;
      el.nativeElement.offsetWidth = 1366;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 0});
      expect(directive.isInViewport).toBeFalsy();
    });
  });

  describe('scrollable parent element', () => {
    it('should add event handler for parent element scroll events', () => {
      const div = document.createElement('div');
      const spy = spyOn(renderer, 'listen');
      directive.parentEl = div;
      directive.ngAfterViewInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should do nothing if no parent element', () => {
      const spy = spyOn(renderer, 'listen');
      directive.ngAfterViewInit();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit next value in viewport$ observable', fakeAsync(() => {
      const spy = spyOn(directive, 'calculateInViewportStatus');
      const event = {
        path: [
          { innerHeight: 768, innerWidth: 1366, scrollX: 0, scrollY: 100 }
        ]
      };
      directive.onParentScroll(event);
      tick(200);
      expect(spy).toHaveBeenCalled();
    }));

    it('should calculate in viewport status with parent element', () => {
      const div: any = {};
      div.offsetTop = 1000;
      div.offsetLeft = 0;
      div.offsetHeight = 200;
      div.offsetWidth = 1366;
      div.scrollTop = 0;
      div.scrollLeft = 0;
      directive.parentEl = div;
      el.nativeElement.offsetTop = 1250;
      el.nativeElement.offsetLeft = 0;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 1000});
      expect(directive.isInViewport).toBeFalsy();

      div.scrollTop = 250;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 1000});
      expect(directive.isInViewport).toBeTruthy();

      div.scrollTop = 551;
      directive.calculateInViewportStatus({width: 1366, height: 768, scrollX: 0, scrollY: 1000});
      expect(directive.isInViewport).toBeFalsy();
    });
  });
});
