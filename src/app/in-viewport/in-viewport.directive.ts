import {
  Directive,
  ElementRef,
  HostBinding,
  EventEmitter,
  Output,
  OnDestroy,
  AfterViewInit,
  Inject
} from '@angular/core';
import { WINDOW } from '../window/window-token';

/**
 * A simple lightweight library for Angular with that detects when an
 * element is within the browsers viewport and adds a `in-viewport` or
 * `not-in-viewport` class to the element.
 *
 * @example
 * ```html
 * <p
 *  class="foo"
 *  snInViewport
 *  (inViewportChange)="myEventHandler($event)">
 *  Amet tempor excepteur occaecat nulla.
 * </p>
 * ```
 */
// @dynamic
@Directive({
  selector: '[snInViewport]',
  exportAs: 'snInViewport'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private inViewport: boolean;
  @Output() inViewportChange = new EventEmitter<boolean>();
  observer: IntersectionObserver;

  @HostBinding('class.sn-viewport--in')
  get isInViewport(): boolean {
    return this.inViewport;
  }

  @HostBinding('class.sn-viewport--out')
  get isNotInViewport(): boolean {
    return !this.inViewport;
  }

  constructor(private el: ElementRef, @Inject(WINDOW) private window: Window) {}

  ngAfterViewInit() {
    const IntersectionObserver = this.window['IntersectionObserver'];
    this.observer = new IntersectionObserver(
      this.intersectionObserverCallback.bind(this)
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
  }

  intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (this.inViewport === entry.isIntersecting) return;
      this.inViewport = entry.isIntersecting;
      this.inViewportChange.emit(this.inViewport);
    });
  }
}
