import { Injectable } from '@angular/core';

/**
 * Service that acts a reference to window object
 * in platforms where `window` does not exists
 *
 * @export
 * @property WindowRef
 */
@Injectable()
export class WindowRef {
  closed = null;
  defaultStatus = null;
  document = null;
  frameElement = null;
  frames = null;
  history = null;
  innerHeight = null;
  innerWidth = null;
  length = null;
  localStorage = null;
  location = null;
  name = null;
  navigator = null;
  opener = null;
  outerHeight = null;
  outerWidth = null;
  pageXOffsetleft = null;
  pageYOffsetleft = null;
  parent = null;
  screen = null;
  screenLeft = null;
  screenTop = null;
  screenX = null;
  screenY = null;
  sessionStorage = null;
  scrollX = null;
  scrollY = null;
  self = null;
  status = null;
  top = null;
  addEventListener() {}
  alert() {}
  atob() {}
  blur() {}
  btoa() {}
  clearInterval() {}
  clearTimeout() {}
  close() {}
  confirm() {}
  focus() {}
  getComputedStyle() {}
  getSelection() {}
  matchMedia() {}
  moveBy() {}
  moveTo() {}
  open() {}
  print() {}
  prompt() {}
  resizeBy() {}
  resizeTo() {}
  removeEventListener() {}
  scroll() {}
  scrollBy() {}
  scrollTo() {}
  setInterval() {}
  setTimeout() {}
  stop() {}
}
