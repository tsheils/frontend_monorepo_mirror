/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SGEdge} from '../models/sgedge';
import {SGNode} from '../models/sgnode';

/**
 * service to create edges
 * track which edges have been clicked on
 * track which edge is hovered on
 */
@Injectable({
    providedIn: 'root'
  }
)
export class EdgeService {
  /**
   * map of all created edges
   */
  private  masterEdgeMap: Map<string, SGEdge> = new Map();

  /**
   * RxJs subject that broadcasts changes to clikced/hovered edges
   */
  private edgeSource = new Subject<any>();
  /**
   * list of edges that have been clicked on
   */
  private clickedEdgeList: SGEdge[] = [];
  /**
   * edge that is currently hovered on, wrapped in an array
   */
  private hoveredEdgeList: SGEdge[] = [];

  //  Observable navItem stream
  /**
   * Observable for components to subscribe to (primarily to display edges)
   */
  edgeslist$ = this.edgeSource.asObservable();

  /**
   * return array of all edges (mapped by uuid)
   */
  getEdgesArr(): SGEdge[] {
      return Array.from(this.masterEdgeMap.values());
    }

  /**
   * get edge by id
   * @param id
   */
  getById(id): SGEdge {
    return this.masterEdgeMap.get(id);
  }

  /**
   * set edge in {masterEdgeMap}
   * @param edge
   */
  setEdge(edge: SGEdge): void {
    this.masterEdgeMap.set(edge.id, edge);
  }

  /**
   * searches to see if a edge exists. if it does, it returns the edge with the sent data merged,
   * if it doesn't exist, it makes a new edge with the data
   * @param id
   * @param source
   * @param target
   * @param data
   */
  makeEdge(id: string, source?: any, target?: any, data?: any): void {
    let l: SGEdge = this.masterEdgeMap.get(id);
    if (!l) {
      l = new SGEdge(source, target, data);
      l.id = id;
    }
    this.setEdge(l);
  }

  /**
   * empty edge map
   */
  empty() {
    this.masterEdgeMap.clear();
  }



}
