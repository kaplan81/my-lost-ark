/**
 * To create a specific namespace on keys that belong to this context library.
 * 
 * @export
 * @class Prefixer
 */
export class Prefixer {
  constructor() {}

  static setPrefixedKey(prefix: string, key: string){
      return prefix + key;
  }

  static unprefixKey(prefix: string, prefixedKey: string) {
      return prefixedKey.replace(prefix,'');
  }
}