import * as neo4j from "neo4j-driver";
import RxSession from "neo4j-driver/types/session-rx";

/**
 * Interface for the 'Neo4jdbs' data
 */
export interface Neo4jdbsEntity {
  id: string | number; // Primary ID
  driver: neo4j.Driver;
}

export interface Neo4jInstanceConfig {
  name: string;
  url?: string;
  bolt: string;
  user: string;
  password: string;
}
