import { CrossTabContext } from './interface';
import { Prefixer } from './prefixer';
import { Logger } from './logger';

/**
 * Implementation of CrossTabContext interface with sessionStorage 
 * 
 * @class CrossTabContextLS 
 * @implements {CrossTabContext}
 */
export class CrossTabContextSS implements CrossTabContext{
  private keyPrefix = 'cross-tab-context.';

  constructor() {
    if (typeof(Storage) === 'undefined') throw Error('Your browser does not support Storage');
  }

  get(key: string): any {
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key);
      let jsonStringifiedObj = sessionStorage.getItem(prefixedKey);
      let object = JSON.parse(jsonStringifiedObj);
      object.storageArea = 'session';
      jsonStringifiedObj = JSON.stringify(object);
      Logger.log(`CrossTabContextSS get key: ${key}`, 'info');
      Logger.log(`object: ${jsonStringifiedObj}`);
      return object;
  }

  set(key: string, object: any) {
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key);
      let jsonStringifiedObj = JSON.stringify(object);
      try {
        sessionStorage.setItem(prefixedKey, jsonStringifiedObj);
        Logger.log(`CrossTabContextSS set key: ${key}`, 'info');
        Logger.log(`object: ${jsonStringifiedObj}`);
        return { result: true, message: 'success' }
      } catch (e) {
        Logger.log('CrossTabContextSS set failed', 'error');
        return { return: false, message: e.message }
      }
  }

  remove(key: string){
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key); 
      sessionStorage.removeItem(prefixedKey);
      Logger.log(`CrossTabContextSS remove key: ${key}`, 'warn');
  }
}
