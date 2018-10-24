/**
 * CROSS TAB CONTEXT INTERFACE
 * To be implemented both in CrossTabContextLS and CrossTabContextSS.
 * The library itself provides a way of sharing both
 * sensitive (sessionStorage) and non-sensitive (localStorage)
 * information across web applications inside single origin. 
 * 
 * @interface CrossTabContext
 */
export interface CrossTabContext {
  /**
   * Get value from given key.
   * 
   * @param {string} key
   * @returns value - which will eventually be turned into a string when it gets into the localStorage or the sessionStorage.
   * 
   * @memberOf CrossTabContext
   */
  get(key : string) : any;
  
  /**
   * Set given key with given object.
   * 
   * @param {string} key
   * @param {string} value
   * 
   * @memberOf CrossTabContext
   */
  set(key : string, object: any) : any;

  /**
   * Removes the entry with the given key.
   * 
   * @param {string} key
   * 
   * @memberOf CrossTabContext
   */
  remove(key : string): void;
}
