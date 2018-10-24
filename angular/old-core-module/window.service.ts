import { Injectable } from '@angular/core';

const _window = () => window;

/**
 * Return the global native browser window object
 * wrapped in an @Injectable.
 * 
 * @export
 * @class WindowRef
 */
@Injectable()
export class WindowRef {
   get nativeWindow() : any {
      return _window();
   }
}
