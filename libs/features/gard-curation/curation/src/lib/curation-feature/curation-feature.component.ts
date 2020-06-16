import {ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {BehaviorSubject, Observable} from "rxjs";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {Disease, DiseaseSerializer} from "@ncats-frontend-library/models/gard/gard-models";


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

  displayFields = [
    {section: 'codes', label: 'External Identifiers'},
    {section: 'synonyms', label: 'Synonyms'},
    {section: 'hierarchies', label: 'Disease Hierarchy'},
    {section: 'inheritance', label: 'Inheritance'},
    {section: 'sources', label: 'References'}
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
      if(res && res.disease) {
        this.disease = res.disease;
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
