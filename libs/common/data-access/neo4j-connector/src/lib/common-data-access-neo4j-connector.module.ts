import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Neo4jConnectService} from "./neo4j-connect.service";

@NgModule({
  imports: [CommonModule],
  providers: [
    Neo4jConnectService
  ]
})
export class CommonDataAccessNeo4jConnectorModule {}
