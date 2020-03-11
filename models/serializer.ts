  /**
   * initial serializer, simply sets up methods to be implemented
   */
  export interface Serializer {
  /**
   * return classed object from json
   * @param json
   * @return {any}
   */
  fromJson(json: any): any;

  /**
   * return json from classed object
   * @param object
   * @return {any}
   */
  toJson(object: any): any;

  /**
   * return object as series of property objects
   * @param object
   * @return {any}
   * @private
   */
  _asProperties(object: any): any;
}
