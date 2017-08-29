import {
  Directive, ElementRef, HostListener, HostBinding,
  EventEmitter, Input, Output, OnInit, OnDestroy,
  AfterViewInit, Renderer2
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
 *  snInViewport
 *  (onInViewportChange)="myEventHandler($event)"
 *  [debounce]="300">
 *  Amet tempor excepteur occaecat nulla.
 * </p>
 * ```
 *
 * @export
 * @class InViewportDirective
 */
@Directive({
  selector: '[inViewport], [snInViewport]'
})
export class InViewportDirective implements OnInit, AfterViewInit, OnDestroy {
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
   * An element to listen to scroll events from
   *
   * @type {HTMLElement}
   * @memberof InViewportDirective
   */
  @Input()
  public scrollEl: HTMLElement;
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
  constructor(private el: ElementRef, private renderer: Renderer2) { }
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
   * Subscribe to `viewport$` observable which
   * will call event handler
   *
   * @memberof InViewportDirective
   */
  public ngAfterViewInit(): void {
    if (this.scrollEl) {
      this.renderer.listen(this.scrollEl, 'scroll', (event) => {
        const win: Window = <any>event.path[event.path.length - 1];
        const height = win.innerHeight;
        const width = win.innerWidth;
        const scrollY = win.scrollY;
        const scrollX = win.scrollX;
        const viewport: Viewport = { height, width, scrollY, scrollX };
        this.viewport$.next(viewport);
      });
    }
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
  @HostListener(eventData.eventScroll, eventData.eventPathScroll)
  @HostListener(eventData.eventResize, eventData.eventPathResize)
  public onViewportChange(
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
    let inParentViewport = false;
    let inWindowViewport = false;

    if (this.scrollEl) {
      const height = this.scrollEl.offsetHeight;
      const width = this.scrollEl.offsetWidth;
      const scrollY = (this.scrollEl.scrollTop + this.scrollEl.offsetTop);
      const scrollX = (this.scrollEl.scrollLeft + this.scrollEl.offsetLeft);
      const scrollElViewport: Viewport = { height, width, scrollY, scrollX };
      inParentViewport = this.isInElementViewport(scrollElViewport, el);
      inWindowViewport = this.isInElementViewport(viewport, this.scrollEl);
    } else {
      inParentViewport = true;
      inWindowViewport = this.isInElementViewport(viewport, el);
    }
    const oldInViewport = this.inViewport;
    this.inViewport = (inParentViewport && inWindowViewport);

    if (oldInViewport !== this.inViewport) {
      this.onInViewportChange.emit(this.inViewport);
    }
  }
  /**
   * Returns true if an element is currently within the `viewport`
   *
   * @param {Viewport} viewport
   * @param {HTMLElement} el
   * @returns {boolean}
   * @memberof InViewportDirective
   */
  public isInElementViewport(viewport: Viewport, el: HTMLElement): boolean {
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
    return (
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
