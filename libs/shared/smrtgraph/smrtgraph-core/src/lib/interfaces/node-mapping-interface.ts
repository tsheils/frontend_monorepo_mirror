export interface NodeMappingInterface <T> {

//  serializer: <T extends NodeSerializer>() => {};

  /**
   * map of all nodes all changes are saved here
   */
  masterNodeMap: Map<string, T>;

  /**
   * returns all created nodes as an array
   * @return {T[]}
   */
  getNodesArr(): T[];

  /**
   * fetch node in map
   * @param id
   * @return {T}
   */
  getById(id): T;

  /**
   * set node in map
   * @param {T} node
   */
  setNode(node: T): void;

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param data
   * @param {string} id
   * @return {T}
   */
  makeNode(data: any, id?: string);

  empty();
}
