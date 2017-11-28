import { Injectable } from '@angular/core';

/**
 * Service that acts a reference to window object
 * in platforms where `window` does not exists
 *
 * @export
 */
@Injectable()
export class WindowRef {
  innerWidth: number;
  innerHeight: number;
}
