import { Directive, ElementRef, HostListener, HostBinding, EventEmitter, Output } from '@angular/core';

const eventPathLoadScroll = ['$event.target.defaultView.innerHeight', '$event.target.defaultView.innerWidth'];
const eventPathResize = ['$event.target.innerHeight', '$event.target.innerWidth'];
const eventLoad = 'window:load';
const eventResize = 'window:resize';
const eventScroll = 'window:scroll';
const inViewportClass = 'class.in-viewport';
const notInViewportClass = 'class.not-in-viewport';

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective {
  /**
   * If true means the element is in the browser viewport
   *
   * @private
   * @type {boolean}
   * @memberof InViewportDirective
   */
  private inViewport: boolean;
  /**
   * Emits event when `inViewport` value changes
   * @type {EventEmitter<boolean>}
   * @memberof InViewportDirective
   */
  @Output()
  public onInViewportChange = new EventEmitter<boolean>();
  /**
   * Returns true if element is in viewport
   *
   * @readonly
   * @type {boolean}
   * @memberof InViewportDirective
   */
  @HostBinding(inViewportClass)
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
  @HostBinding(notInViewportClass)
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
   * On window scroll/resize/load events
   * check if element is in viewport
   *
   * @param {number} height
   * @memberof InViewportDirective
   */
  @HostListener(eventLoad, eventPathLoadScroll)
  @HostListener(eventScroll, eventPathLoadScroll)
  @HostListener(eventResize, eventPathResize)
  public onViewportChange(height: number, width: number): void {
    const el: HTMLElement = this.el.nativeElement;
    const bounds = el.getBoundingClientRect();
    const oldInViewport = this.inViewport;
    this.inViewport = (
      (bounds.top > 0) && (bounds.bottom < height) &&
      (bounds.left > 0) && (bounds.right < width)
    );
    if (oldInViewport !== this.inViewport) {
      this.onInViewportChange.emit(this.inViewport);
    }
  }
}
