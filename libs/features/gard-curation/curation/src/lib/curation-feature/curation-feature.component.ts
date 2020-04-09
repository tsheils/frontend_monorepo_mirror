import {ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {concatAll, map, mergeMap, switchMap} from "rxjs/operators";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import * as DiseasesActions from "../../../../../../stores/diseases/src/lib/+state/diseases/diseases.actions";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";


export const GARD_HEADER_COMPONENT = new InjectionToken<string>('GardHeaderComponent');
export const CURATION_SIDEPANEL_COMPONENT = new InjectionToken<string>('SideNavComponent');
export const GARD_DISEASE_SEARCH_COMPONENT = new InjectionToken<string>('GardDiseaseSearchComponent');
export const CURATION_MAIN_COMPONENT = new InjectionToken<string>('MainComponent');
export const GARD_FOOTER_COMPONENT = new InjectionToken<string>('GardFooter');

@Component({
  selector: 'ncats-frontend-library-curation-feature',
  templateUrl: './curation-feature.component.html',
  styleUrls: ['./curation-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurationFeatureComponent implements OnInit {
  fields: string[];

  /**
   * RxJs subject to broadcast data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _fieldsObservableSource = new BehaviorSubject<any>({});

  /**
   * Observable stream of panel data changes
   * @type {Observable<boolean>}
   */
  fieldsObservable$ = this._fieldsObservableSource.asObservable();

  /**
   * RxJs subject to broadcast data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _diseaseObservableSource = new BehaviorSubject<any>({});

  /**
   * Observable stream of panel data changes
   * @type {Observable<boolean>}
   */
  diseaseObservable$ = this._diseaseObservableSource.asObservable();

  components: PanelConfig[] = [
    {
      token: CURATION_SIDEPANEL_COMPONENT,
      section: Position.Left,
      dataObservable: this.fieldsObservable$
    },
    /*{
      token: GARD_HEADER_COMPONENT,
      section: Position.Header,
      data: {title: this.title}
    },*/
   /* {
      token: GARD_DISEASE_HEADER_COMPONENT,
      section: Position.Header,
      dataObservable: this.diseaseObservable$
    },*/
   {
      token: GARD_DISEASE_SEARCH_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
    {
      token: CURATION_MAIN_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
    {
      token: GARD_FOOTER_COMPONENT,
      section: Position.Footer //,
      // dataObservable: this.diseaseObservable$
    }
  ];

  disease: Disease;
  displayDisease: Disease;
  session: RxSession;
  curatedObject = {
    name: '',
    inheritance: []
  };

  searching = false;
  editing: string = '';
  typeaheadFields: Observable<any> = new Observable<any>();
  dataLoaded = false;
  serializer: DiseaseSerializer = new DiseaseSerializer();
  gardDriver: any;
  gardSession: RxSession;

  constructor(
    private changeRef: ChangeDetectorRef,
   private diseasesFacade: DiseasesFacade,
    private connectionService: Neo4jConnectService
  ) {
  }


  ngOnInit(): void {
    this.diseasesFacade.selectedDisease$.subscribe(res=> {
      if(res) {
        console.log(res);
        this.disease = this.serializer.fromJson(res);
        this._diseaseObservableSource.next(this.disease);
        this.changeRef.markForCheck();
      }
    });
  }

  getData(call: string) {
    return this.gardSession.readTransaction(txc => txc.run(call).records());
  }

  search(event: any) {
    console.log(event);
    console.log(this.disease);
    const call = `
          match p = (d:Disease {gard_id:'${this.disease.gard_id}'})-[]-(r:DataRef) RETURN collect(properties(r)) as data;
        `;
    console.log(call);
     this.connectionService.read('gard-data', call).pipe(
      map(response => {
        console.log(response)
        this.disease.inheritance = response['data'];
        this.displayDisease = this.disease;
        this.dataLoaded = true;
        this.editing = "inheritance";
      })
  ).subscribe(res=> {
    console.log(res);
     })
  }

  /**
   * @param object
   * @param field
   */
  setCuratedObject(object, field): void {
    this.curatedObject[field] = object;
  }

  setObject(field: string): void {
    this.displayDisease[field] = this.curatedObject[field];
    this.editing = null;
  }
}
