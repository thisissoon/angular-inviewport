import { ElementRef } from '@angular/core';
import { InViewportDirective } from './in-viewport.directive';
import { WINDOW_MOCK } from '../window/window-mock';

describe('InViewportDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: InViewportDirective;
  const text =
    'Exercitation est eu reprehenderit veniam anim veniam enim laboris nisi.';

  beforeEach(() => {
    node = document.createElement('p');
    node.innerText = text;
    el = new ElementRef(node);

    directive = new InViewportDirective(el, WINDOW_MOCK as any);
    directive.ngAfterViewInit();
  });

  it('should should set InViewport state to true and emit event', () => {
    const spy = jasmine.createSpy('spy');
    const entries = [{ isIntersecting: true }];
    directive.inViewportChange.emit = spy;
    directive.intersectionObserverCallback(entries as any);
    expect(directive.isInViewport).toBeTruthy();
    expect(directive.isNotInViewport).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should should set InViewport state to false and emit event', () => {
    const spy = jasmine.createSpy('spy');
    const entries = [{ isIntersecting: false }];
    directive.inViewportChange.emit = spy;
    directive.intersectionObserverCallback(entries as any);
    expect(directive.isInViewport).toBeFalsy();
    expect(directive.isNotInViewport).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should should do nothing if state is the same', () => {
    const spy = jasmine.createSpy('spy');
    const entries = [{ isIntersecting: true }, { isIntersecting: true }];
    directive.inViewportChange.emit = spy;
    directive.intersectionObserverCallback(entries as any);
    expect(directive.isInViewport).toBeTruthy();
    expect(directive.isNotInViewport).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should should unobserve on destroy', () => {
    const spy = jasmine.createSpy('spy');
    directive.observer.unobserve = spy;
    directive.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(node);
  });
});
