import { CrossTabContextLS } from './modules/ls';
import { CrossTabContextSS } from './modules/ss';
import { CrossTabContextListen } from './modules/listen';

export class CrossTabContext {
  private contextLS = new CrossTabContextLS();
  private contextSS = new CrossTabContextSS();
  private contextListen = new CrossTabContextListen();

  constructor() {}

  getFromStorageArea(anyFeature: string, storageArea: 'local' | 'session') {
    if (storageArea !== 'local' && storageArea !== 'session') throw Error(`Storage Area must be specified either as 'local' or as 'session'`);
    if (storageArea === 'local') return this.contextLS.get(anyFeature);
    if (storageArea === 'session') return this.contextSS.get(anyFeature);
  }

  setInStorageArea(obj: any, anyFeature: string, keysToLS?: Array<keyof any>, keysToSS?: Array<keyof any>) {
    if(!keysToLS && !keysToSS) throw Error('No any keys were specified!');

    if (keysToLS) {
      let anyToLS: any = {gpId: obj['gpId']};
      for (let keyToLS of keysToLS) {
        if (keyToLS !== 'gpId') {
          anyToLS[keyToLS] = obj[keyToLS];
        } 
      }
      this.contextLS.set(anyFeature, anyToLS);
    }

    if (keysToSS) {
      let anyToSS: any = {gpId: obj['gpId']};
      for (let keyToSS of keysToSS) {
        if (keyToSS !== 'gpId') {
          anyToSS[keyToSS] = obj[keyToSS];
        } 
      }
      this.contextSS.set(anyFeature, anyToSS);
    }
  }

  removeFromStorageArea(anyFeature: string, storageArea: 'local' | 'session') {
    if (storageArea !== 'local' && storageArea !== 'session') throw Error(`Storage Area must be specified either as 'local' or as 'session'`);
    if (storageArea === 'local') this.contextLS.remove(anyFeature);
    if (storageArea === 'session') this.contextSS.remove(anyFeature);
  }

  listen(key:string, callback: Function) {   
    this.contextListen.listen(key, callback);
  }
}
