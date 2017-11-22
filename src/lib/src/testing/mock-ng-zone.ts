import { EventEmitter, NgZone } from '@angular/core';

export class MockNgZone extends NgZone {
  private _mockOnStable: EventEmitter<any> = new EventEmitter(false);
  constructor() { super({enableLongStackTrace: false}); }
  set onStable(v) {}
  get onStable() { return this._mockOnStable; }
  run(fn: Function): any { return fn(); }
  runOutsideAngular(fn: Function): any { return fn(); }
  simulateZoneExit(): void { this.onStable.emit(null); }
}
