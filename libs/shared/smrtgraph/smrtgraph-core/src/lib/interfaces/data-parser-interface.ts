import {Observable} from 'rxjs/index';
import {Subject} from 'rxjs';
import {SmrtGraphData} from '../models/smrt-graph';

/**
 * interface for custom data parsers
 */
export interface SmrtGraphDataParserInterface {

  // todo: can i make this private?
  _data: Subject<SmrtGraphData>;

  // todo: can i make this private?
  data$: Observable<SmrtGraphData>;


  setSerializers?(serializers: any): void;

  /**
   * load data from any source
   * @return {Observable<any>}
   */
  loadData?(): Observable<any>;

  connectToData?(): void;
  /**
   * get data
   * @return {SmrtGraph}
   */
  getData(): Observable<SmrtGraphData>;

  /**
   * parse data from loaded source
   * @param data
   */
   _parseData(data: any);
}
