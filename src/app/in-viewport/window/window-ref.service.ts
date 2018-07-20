import { Injectable } from '@angular/core';

/**
 * Service that acts a reference to window object
 * in platforms where `window` does not exists
 *
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
  pageXOffset = null;
  pageYOffset = null;
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
  addEventListener(...args) {}
  alert(...args) {}
  atob(...args) {}
  blur(...args) {}
  btoa(...args) {}
  clearInterval(...args) {}
  clearTimeout(...args) {}
  close(...args) {}
  confirm(...args) {}
  focus(...args) {}
  getComputedStyle(...args) {}
  getSelection(...args) {}
  matchMedia(...args) {}
  moveBy(...args) {}
  moveTo(...args) {}
  open(...args) {}
  print(...args) {}
  prompt(...args) {}
  resizeBy(...args) {}
  resizeTo(...args) {}
  removeEventListener(...args) {}
  scroll(...args) {}
  scrollBy(...args) {}
  scrollTo(...args) {}
  setInterval(...args) {}
  setTimeout(...args) {}
  stop(...args) {}
}
