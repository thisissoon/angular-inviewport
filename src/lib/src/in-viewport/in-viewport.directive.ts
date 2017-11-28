import {
  Directive, ElementRef, HostBinding, EventEmitter,
  Input, Output, OnDestroy, AfterViewInit,
  ChangeDetectorRef, NgZone
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/merge';

import { WindowRef } from '../window/window.service';
import { Viewport } from '../shared/viewport.model';
import * as eventData from '../shared/event-data';

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
 */
@Directive({
  selector: '[inViewport], [snInViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  /**
   * If true means the element is in the browser viewport
   *
   * @memberof InViewportDirective
   */
  private inViewport: boolean;
  /**
   * Observable that returns the size of the viewport
   *
   * @memberof InViewportDirective
   */
  private viewport$ = new Subject<void>();
  /**
   * Completes on component destroy lifecycle event
   * use to handle unsubscription from infinite observables
   *
   * @memberof InViewportDirective
   */
  private ngUnsubscribe$ = new Subject<void>();
  /**
   * Emits event when `inViewport` value changes
   *
   * @memberof InViewportDirective
   */
  @Output()
  public onInViewportChange = new EventEmitter<boolean>();
  /**
   * Amount of time in ms to wait for other scroll events
   * before running event handler
   *
   * @default 100
   * @memberof InViewportDirective
   */
  @Input()
  public debounce = 100;
  /**
   * A parent element to listen to scroll events from
   *
   * @memberof InViewportDirective
   */
  @Input('snInViewportParent')
  public parentEl: any;
  /**
   * Returns true if element is in viewport
   *
   * @readonly
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
   * @memberof InViewportDirective
   */
  @HostBinding(eventData.notInViewportClass)
  public get isNotInViewport(): boolean {
    return !this.inViewport;
  }
  /**
   * Get window viewport values
   *
   * @readonly
   * @memberof InViewportDirective
   */
  public get viewport(): Viewport {
    const bottom = this.win.innerHeight;
    const left = 0;
    const right = this.win.innerWidth;
    const top = 0;
    return { bottom, right, left, top };
  }
  /**
   * Creates an instance of InViewportDirective.
   *
   * @memberof InViewportDirective
   */
  constructor(
    private el: ElementRef,
    private win: WindowRef,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }
  /**
   * Subscribe to `viewport$` observable which
   * will call event handler
   *
   * @memberof InViewportDirective
   */
  public ngAfterViewInit(): void {
    this.calculateInViewportStatus();
    this.cdRef.detectChanges();

    this.viewport$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(this.debounce)
      .subscribe(() => this.calculateInViewportStatus());

    // Listen for window scroll/resize events.
    this.ngZone.runOutsideAngular(() => {
      Observable.merge(
          fromEvent(this.win as any, eventData.eventWindowResize),
          fromEvent(this.win as any, eventData.eventWindowScroll)
        )
        .auditTime(this.debounce)
        .subscribe(() => this.onViewportChange());
    });

    if (this.parentEl) {
      this.ngZone.runOutsideAngular(() => {
        fromEvent(this.parentEl, eventData.eventScroll)
          .auditTime(this.debounce)
          .subscribe(() => this.onParentScroll());
      });
    }
  }
  /**
   * Get window element from parent scroll event and
   * emit next value in `viewport$` observable
   *
   * @memberof InViewportDirective
   */
  public onParentScroll() {
    this.viewport$.next();
  }
  /**
   * On window scroll/resize/load events
   * emit next `viewport$` observable value
   *
   * @memberof InViewportDirective
   */
  public onViewportChange(): void {
    this.viewport$.next();
  }
  /**
   * Calculate inViewport status and emit event
   * when viewport status has changed
   *
   * @memberof InViewportDirective
   */
  public calculateInViewportStatus(): void {
    const el = this.el.nativeElement;
    let inParentViewport = false;
    let inWindowViewport = false;

    if (this.parentEl) {
      const parentBounds = this.parentEl.getBoundingClientRect();
      inParentViewport = this.isInElementViewport(parentBounds, el);
      inWindowViewport = this.isInElementViewport(this.viewport, this.parentEl);
    } else {
      inParentViewport = true;
      inWindowViewport = this.isInElementViewport(this.viewport, el);
    }
    const oldInViewport = this.inViewport;
    this.inViewport = (inParentViewport && inWindowViewport);

    if (oldInViewport !== this.inViewport) {
      this.ngZone.run(() => this.onInViewportChange.emit(this.inViewport));
    }
  }
  /**
   * Returns true if an element is currently within the `viewport`
   *
   * @memberof InViewportDirective
   */
  public isInElementViewport(viewport: Viewport, el: any): boolean {
    // Check if `getBoundingClientRect` is a function in case running this code
    // in an evironment without the DOM
    if (typeof el.getBoundingClientRect === 'function') {
      const elBounds = el.getBoundingClientRect();
      return (
        (
          (elBounds.top >= viewport.top) && (elBounds.top <= viewport.bottom) ||
          (elBounds.bottom >= viewport.top) && (elBounds.bottom <= viewport.bottom) ||
          (elBounds.top <= viewport.top) && (elBounds.bottom >= viewport.bottom)
        ) &&
        (
          (elBounds.left >= viewport.left) && (elBounds.left <= viewport.right) ||
          (elBounds.right >= viewport.left) && (elBounds.right <= viewport.right) ||
          (elBounds.left <= viewport.left && elBounds.right >= viewport.right)
        )
      );
    } else {
      return false;
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
