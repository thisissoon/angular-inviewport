import {
  Directive, ElementRef, HostListener, HostBinding,
  EventEmitter, Input, Output, OnInit, OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

import { Viewport } from './viewport';
import * as eventData from './event-data';

/**
 * A simple lightweight library for Angular (2+) with no
 * external dependencies that detects when an element is within the
 * browser viewport and adds a `in-viewport` or `not-in-viewport` class
 * to the element.
 *
 * @example
 * ```
 * <p
 *  class="foo"
 *  inViewport (onInViewportChange)="myEventHandler($event)"
 *  [debounce]="300">
 *  Amet tempor excepteur occaecat nulla.
 * </p>
 * ```
 *
 * @export
 * @class InViewportDirective
 */
@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy {
  /**
   * If true means the element is in the browser viewport
   *
   * @private
   * @type {boolean}
   * @memberof InViewportDirective
   */
  private inViewport: boolean;
  /**
   * Observable that returns the size of the viewport
   *
   * @private
   * @type {Subject<Viewport>}
   * @memberof InViewportDirective
   */
  private viewport$ = new Subject<Viewport>();
  /**
   * Completes on component destroy lifecycle event
   * use to handle unsubscription from infinite observables
   *
   * @type {Subject<void>}
   * @memberof InViewportDirective
   */
  private ngUnsubscribe$ = new Subject<void>();
  /**
   * Emits event when `inViewport` value changes
   * @type {EventEmitter<boolean>}
   * @memberof InViewportDirective
   */
  @Output()
  public onInViewportChange = new EventEmitter<boolean>();
  /**
   * Amount of time in ms to wait for other scroll events
   * before running event handler
   *
   * @type {number}
   * @default 100
   * @memberof InViewportDirective
   */
  @Input()
  public debounce = 100;
  /**
   * Returns true if element is in viewport
   *
   * @readonly
   * @type {boolean}
   * @memberof InViewportDirective
   */
  @HostBinding(eventData.inViewportClass)
  public get isInViewport(): boolean {
    return this.inViewport;
  }
  /**
   * Returns true if element is not in viewport
   *
   * @readonly
   * @type {boolean}
   * @memberof InViewportDirective
   */
  @HostBinding(eventData.notInViewportClass)
  public get isNotInViewport(): boolean {
    return !this.inViewport;
  }
  /**
   * Creates an instance of InViewportDirective.
   * @param {ElementRef} el
   * @memberof InViewportDirective
   */
  constructor(private el: ElementRef) { }
  /**
   * Subscribe to `viewport$` observable which
   * will call event handler
   *
   * @memberof InViewportDirective
   */
  public ngOnInit(): void {
    this.viewport$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(this.debounce)
      .subscribe((viewport) => this.calculateInViewportStatus(viewport));
  }
  /**
   * On window scroll/resize/load events
   * emit next `viewport$` observable value
   *
   * @param {number} height
   * @param {number} width
   * @param {number} scrollY
   * @param {number} scrollX
   * @memberof InViewportDirective
   */
  @HostListener(eventData.eventLoad, eventData.eventPathLoadScroll)
  @HostListener(eventData.eventScroll, eventData.eventPathLoadScroll)
  @HostListener(eventData.eventResize, eventData.eventPathResize)
  public eventHandler(
    height: number,
    width: number,
    scrollY: number,
    scrollX: number
  ): void {
    const viewport: Viewport = { height, width, scrollY, scrollX };
    this.viewport$.next(viewport);
  }
  /**
   * Calculate inViewport status and emit event
   * when viewport status has changed
   *
   * @param {Viewport} viewport
   * @memberof InViewportDirective
   */
  public calculateInViewportStatus(viewport: Viewport): void {
    const el: HTMLElement = this.el.nativeElement;
    const viewportBounds = {
      top: viewport.scrollY,
      bottom: viewport.scrollY + viewport.height,
      left: viewport.scrollX,
      right: viewport.scrollX + viewport.width,
    };
    const elBounds = {
      top: el.offsetTop,
      bottom: el.offsetTop + el.offsetHeight,
      left: el.offsetLeft,
      right: el.offsetLeft + el.offsetWidth,
    };
    const oldInViewport = this.inViewport;
    this.inViewport = (
      (
        (elBounds.top >= viewportBounds.top) && (elBounds.top <= viewportBounds.bottom) ||
        (elBounds.bottom >= viewportBounds.top) && (elBounds.bottom <= viewportBounds.bottom) ||
        (elBounds.top <= viewportBounds.top) && (elBounds.bottom >= viewportBounds.bottom)
      ) &&
      (
        (elBounds.left >= viewportBounds.left) && (elBounds.left <= viewportBounds.right) ||
        (elBounds.right >= viewportBounds.left) && (elBounds.right <= viewportBounds.right) ||
        (elBounds.left <= viewportBounds.left && elBounds.right >= viewportBounds.right)
      )
    );
    if (oldInViewport !== this.inViewport) {
      this.onInViewportChange.emit(this.inViewport);
    }
  }
  /**
   * trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   *
   * @memberof InViewportDirective
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
