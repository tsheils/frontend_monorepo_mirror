import {ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {BehaviorSubject, Observable} from "rxjs";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {Disease, DiseaseSerializer} from "@ncats-frontend-library/models/gard/gard-models";
import {PrevalanceViewConfig} from "../../../../../../models/gard/gard-models/src/lib/models/prevalence";
import {GeneViewConfig} from "../../../../../../models/gard/gard-models/src/lib/models/gene";


export const GARD_HEADER_COMPONENT = new InjectionToken<string>('GardHeaderComponent');
export const GARD_DISEASE_HEADER_COMPONENT = new InjectionToken<string>('GardDiseaseHeaderComponent');
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
    {
      token: GARD_DISEASE_HEADER_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
   /*{
      token: GARD_DISEASE_SEARCH_COMPONENT,
      section: Position.Content,
    //  dataObservable: this.diseaseObservable$
    },*/
    {
      token: CURATION_MAIN_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
/*    {
      token: GARD_FOOTER_COMPONENT,
      section: Position.Footer //,
      // dataObservable: this.diseaseObservable$
    }*/
  ];

  data: {
    object: Disease,
    fields: any[]
  };

  disease: Disease;
  displayDisease: Disease;
  session: RxSession;
  curatedObject = {
    name: '',
    inheritance: []
  };

  displayFields: any[] = [];
  allFields = [
    {section: 'codes', label: 'External Identifiers', type: 'list'},
    {section: 'synonyms', label: 'Synonyms', type: 'list'},
    {section: 'hierarchies', label: 'Disease Hierarchy', type: 'tree'},
    {section: 'inheritance', label: 'Inheritance', type: 'list'},
    {section: 'epidemiology', label: 'Epidemiology', type: 'table', config: new PrevalanceViewConfig().config},
    {section: 'causes', label: 'Cause', type: 'list'},
    {section: 'genes', label: 'Associated Genes', type: 'table', config: new GeneViewConfig().config},
    {section: 'symptoms', label: 'Symptoms', type: 'list'},
    {section: 'treatments', label: 'Treatments', type: 'list'},
    {section: 'prognosis', label: 'Prognosis', type: 'list'},
    {section: 'statistics', label: 'Statistics', type: 'list'},
    {section: 'organizations', label: 'Organizations', type: 'list'},
    {section: 'sources', label: 'Data Sources', type: 'list'},
    {section: 'references', label: 'References', type: 'list'}
    ];


  serializer: DiseaseSerializer = new DiseaseSerializer();

  constructor(
    private changeRef: ChangeDetectorRef,
   private diseasesFacade: DiseasesFacade,
    private connectionService: Neo4jConnectService
  ) {
  }


  ngOnInit(): void {
    this.diseasesFacade.selectedDisease$.subscribe(res=> {
      if(res) {
        this.disease = res;
        const keys = Object.keys(this.disease);
        this.displayFields = this.allFields.filter(field => keys.includes(field.section));
        this._diseaseObservableSource.next({object: this.disease, fields: this.displayFields});
        this._fieldsObservableSource.next({data: this.displayFields});
      //  this.data = {object: this.disease, fields: [{section: 'inheritance'},{section: 'synonyms'}]};
        this.changeRef.markForCheck();
      }
    });
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
  //  this.editing = null;
  }
}
