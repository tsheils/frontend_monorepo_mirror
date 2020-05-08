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
}
