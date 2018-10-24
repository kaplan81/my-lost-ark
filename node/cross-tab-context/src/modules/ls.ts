import { CrossTabContext } from './interface';
import { Prefixer } from './prefixer';
import { Logger } from './logger';
 
/**
 * Implementation of CrossTabContext interface with localStorage 
 * 
 * @class CrossTabContextLS 
 * @implements {CrossTabContext}
 */
export class CrossTabContextLS implements CrossTabContext {
  private keyPrefix = 'cross-tab-context.';

  constructor() {
    if (typeof(Storage) === 'undefined') throw Error('Your browser does not support Storage');
  }

  get(key: string): any {
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key);
      let jsonStringifiedObj = localStorage.getItem(prefixedKey);
      let object = JSON.parse(jsonStringifiedObj);
      object.storageArea = 'local';
      jsonStringifiedObj = JSON.stringify(object);
      Logger.log(`CrossTabContextLS get key: ${key}`, 'info');
      Logger.log(`object: ${jsonStringifiedObj}`);
      return object;
  }

  set(key: string, object: any) {
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key);
      let jsonStringifiedObj = JSON.stringify(object);
      try {
        localStorage.setItem(prefixedKey, jsonStringifiedObj);
        Logger.log(`CrossTabContextLS set key: ${key}`, 'info');
        Logger.log(`object: ${jsonStringifiedObj}`);
        return { result: true, message: 'success' }
      } catch (e) {
        Logger.log('CrossTabContextLS set failed', 'error');
        return { return: false, message: e.message }
      }
  }

  remove(key: string){
      let prefixedKey = Prefixer.setPrefixedKey(this.keyPrefix, key); 
      localStorage.removeItem(prefixedKey);
      Logger.log(`CrossTabContextLS remove key: ${key}`, 'warn');
  }
}
