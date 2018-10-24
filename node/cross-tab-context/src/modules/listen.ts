import { Prefixer } from './prefixer';

/**
 * The .listen() method from CrossTabContext interface is both valid
 * for sessionStorage and localStorage so we abstract it in its own class.
 * 
 * @export
 * @class CrossTabContextListen
 */
export class CrossTabContextListen {
  private keyPrefix = 'cross-tab-context.';

  constructor() {
  }

  listen(key:string, callback: Function) {   
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key); 
      window.addEventListener('storage', event => {
          if(event.key === prefixedKey) callback(event);
      });
  }
}
