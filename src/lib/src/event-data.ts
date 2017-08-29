export const eventPathScroll = [
  '$event.target.defaultView.innerHeight',
  '$event.target.defaultView.innerWidth',
  '$event.target.defaultView.scrollY',
  '$event.target.defaultView.scrollX'
];
export const eventPathResize = [
  '$event.target.innerHeight',
  '$event.target.innerWidth',
  '$event.target.scrollY',
  '$event.target.scrollX'
];
export const eventResize = 'window:resize';
export const eventScroll = 'window:scroll';
export const inViewportClass = 'class.sn-viewport-in';
export const notInViewportClass = 'class.sn-viewport-out';
