export class FakeDOMStandardElement {
  private listeners: object;
  private nodeName: string;

  constructor(nodeName: string) {
    this.listeners = {};
    this.nodeName = nodeName;
  }

  addEventListener(eventName: string, handler: any, useCapture: boolean) {
    this.listeners[eventName] = handler;
  }

  removeEventListener(eventName: string, handler: any, useCapture: boolean) {
    delete this.listeners[eventName];
  }

  trigger(eventName: string) {
    const args = Array.prototype.slice.call(arguments, 1);
    if (eventName in this.listeners) {
      this.listeners[eventName].apply(null, args);
    }
  }
}
