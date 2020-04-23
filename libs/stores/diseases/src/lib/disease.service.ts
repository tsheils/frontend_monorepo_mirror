import { Injectable } from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(
    private neo4jConnectionService: Neo4jConnectService,
  ) { }


}
