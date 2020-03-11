import {ChangeDetectorRef, Component, InjectionToken, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Disease, DiseaseSerializer} from "../../../../models/gard/disease";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {BehaviorSubject, Observable} from "rxjs";


export const GARD_HEADER_COMPONENT = new InjectionToken<string>('GardHeaderComponent');
export const CURATION_SIDEPANEL_COMPONENT = new InjectionToken<string>('SideNavComponent');
export const GARD_DISEASE_HEADER_COMPONENT = new InjectionToken<string>('GardDiseaseHeaderComponent');
export const CURATION_MAIN_COMPONENT = new InjectionToken<string>('MainComponent');
export const GARD_FOOTER_COMPONENT = new InjectionToken<string>('GardFooter');

/**
 * this sets up the basic skeleton/sections of the app
 * todo move to config file
 */
const GARD_CURATION_SIDENAV: PanelConfig = {
  token: CURATION_SIDEPANEL_COMPONENT,
  section: Position.Left
};

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GARD Curation';
  disease: Disease;
  diseaseSerializer: DiseaseSerializer = new DiseaseSerializer();

  fields: string[];

  editing: string;

  curatedObject: {} = {};

  testdata = [
    {value: 'synonym1', references: ['hpo', 'OMIM', 'ref3', 'ref4']},
    {value: 'synonym2', references: ['ref1', 'ref12', 'ref13', 'ref4']},
    {value: 'synonym3', references: ['ref6', 'ref4', 'ref3', 'ref5']},
    {value: 'synonym4', references: ['ref1', 'ref2', 'ref8', 'ref9']},
    {value: 'synonym5', references: ['ref1', 'ref2', 'ref3', 'ref4']},
    {value: 'synonym6', references: ['ref9', 'ref6', 'ref10', 'ref4']},
    {value: 'synonym7', references: ['ref10', 'ref12', 'ref13']},
    {value: 'synonym8', references: ['ref1']},
    {value: 'synonym80', references: []},
    {
      value: 'synonym9',
      references: ['ref1', 'ref2', 'ref3', 'ref4', 'ref5', 'ref6', 'ref7', 'ref8', 'ref9', 'ref10', 'ref11', 'ref12', 'ref13', 'ref14']
    },
    {value: 'synonym10', references: ['ref10', 'ref12', 'ref13', 'ref14']}
  ];

  testdata2 = [
    {value: 'Autosomal Dominant', references: ['HPO', 'OMIM']},
    {value: 'X-Linked Dominant', references: ['ORPHANET']},
  ];

  newTestData: any[];


  orphanet: string[] = [
    'autosomal dominant',
    'autosomal recessive',
    'multigenic/multifactorial',
    'X-linked recessive',
    'mitochondrial',
    'X-linked dominant',
    'oligogenic',
    'semi-dominant',
    'Y-linked',
    'unknown inheritance',
    'no inheritance data available',
    'not genetically inherited'
  ];

  hpo: string[] = [
    'Autosomal dominant inheritance',
    'Gonosomal inheritance',
    'Multifactorial inheritance',
    'Uniparental disomy',
    'Somatic mutation',
    'Contiguous gene syndrome',
    'Autosomal recessive inheritance',
    'Genetic anticipation',
    'Heterogeneous',
    'Sporadic',
    'Mitochondrial inheritance',
    'Semidominant mode of inheritance'
  ];

omim: string[] = [
  'X-LINKED RECESSIVE X-LINKED DOMINANT (1 FAMILY)',
  'X-LINKED (FEMALE LIMITED)',
  'MITOCHONDRIAL',
  'DIGENIC',
  'AUTOSOMAL DOMINANT (ANOTHER ALLELE IN TRANS MAY BE REQUIRED)',
  'AUTOSOMAL DOMINANT (IN ONE RP53 FAMILY)',
  'AUTOSOMAL DOMINANT (LOSS OF PATERNAL ALLELE)',
  'AUTOSOMAL RECESSIVE (IN 1 PATIENT)',
  'AUTOSOMAL RECESSIVE (IN SOME FAMILIES)',
  'AUTOSOMAL DOMINANT (INCOMPLETE PENETRANCE)',
  'X-LINKED RECESSIVE',
  'AUTOSOMAL DOMINANT AUTOSOMAL RECESSIVE',
  'PSEUDOAUTOSOMAL DOMINANT',
  'AUTOSOMAL DOMINANT (LOSS OF MATERNAL ALLELE)',
  'INHERITED CHROMOSOMAL IMBALANCE',
  'AUTOSOMAL DOMINANT',
  'AUTOSOMAL RECESSIVE',
  'AUTOSOMAL DOMINANT (MILDER PHENOTYPE)',
  'DIGENIC RECESSIVE',
  'SOMATIC MOSAICISM',
  'AUTOSOMAL DOMINANT (SEE MISCELLANEOUS BELOW)',
  'PSEUDOAUTOSOMAL RECESSIVE',
  'DIGENIC (SEE MISCELLANEOUS)',
  'AUTOSOMAL DOMINANT (FROM PATERNAL ALLELE)',
  'AUTOSOMAL RECESSIVE (NULL PHENOTYPE)',
  'SOMATIC MOSAICISM (IN MALES)',
  'AUTOSOMAL DOMINANT (SEE QUALIFIER BELOW)',
  'ISOLATED CASES',
  'AUTOSOMAL RECESSIVE (RARE)',
  'SOMATIC MOSAIC',
  'AUTOSOMAL RECESSIVE (1 FAMILY)',
  'AUTOSOMAL DOMINANT (1 FAMILY)',
  'AUTOSOMAL DOMINANT (DE NOVO IN SOME PATIENTS)',
  'X-LINKED',
  'AUTOSOMAL RECESSIVE.',
  'AUTOSOMAL RECESSIVE (IN 2 PATIENTS)',
  'AUTOSOMAL DOMINANT (IN 1 PATIENT)',
  'X-LINKED DOMINANT',
  'AUTOSOMAL RECESSIVE (IN SOME PATIENTS)',
  'MULTIFACTORIAL',
  'AUTOSOMAL RECESSIVE (ONE FAMILY)',
  'Y-LINKED',
  'AUTOSOMAL RECESSIVE (IN 1 FAMILY)',
];

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

  tempdisease;

  sources: string[] = [];
  synonyms: string[] = [];
  curationData: any[] = [];
  synonymsMap: Map<string, string[]> = new Map<string, string[]>();

  components: PanelConfig[] = [
    {
      token: CURATION_SIDEPANEL_COMPONENT,
      section: Position.Left,
      dataObservable: this.fieldsObservable$
    },
    {
      token: GARD_HEADER_COMPONENT,
      section: Position.Header,
      data: {title: this.title}
    },
    {
      token: GARD_DISEASE_HEADER_COMPONENT,
      section: Position.Header,
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

  connection: Neo4jConnectService;

  constructor(
    private changeRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    console.log(this);
   // this.connect();
  }

  setConnection(connection: Neo4jConnectService) {
    console.log(connection);
    this.connection = connection;
    this.connection.fetch(
    //  `match p = (n:ENTITY)-[]-(:DATA) where n._N_Name contains 'CYSTIC FIBROSIS' return p`
      `match p = (n:S_ORDO_ORPHANET)-[]-(:DATA) where n._N_Name contains 'CYSTIC FIBROSIS '
      AND match q = (n:S_OMIM)-[]-(:DATA) where n._N_Name contains 'CYSTIC FIBROSIS' return p,q`
//        'match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20'
    ).subscribe({
      next: data => {
        const source = data._fields[0].start.labels.filter(label => label.includes('S_'))
          .map(source => source.replace('S_', ''));
        console.log(data);
        console.log(source);
        //  console.log(data);
        this.sources.push(data._fields[0].start.labels.filter(label => label.includes('S_')));
        const names = data._fields[0].start.properties.N_Name;
        console.log(names);
        if (Array.isArray(names)) {
          names.forEach(name => {
            if (this.synonymsMap.has(name)) {
              let arr: string[] = this.synonymsMap.get(name);
              arr.concat(source);
              console.log(arr);
              arr = Array.from(new Set(arr));
              this.synonymsMap.set(name, arr);
            } else {
              console.log(source);
              this.synonymsMap.set(name, source);
            }
          });

          this.synonyms.push(...names);
        } else {
          this.synonyms.push(names);
        }
        this.synonyms = Array.from(new Set(this.synonyms));
        this.tempdisease = data._fields[0].segments[0].end.properties;
        this.disease = this.diseaseSerializer.fromJson(data._fields[0].segments[0].end.properties);
        //  this.fields = Object.keys(this.disease);
        this.fields = Disease.displayFields();
        this._fieldsObservableSource.next(this.fields);
        this._diseaseObservableSource.next(this.disease);
      },
      complete: () => {
        Array.from(this.synonymsMap.entries()).forEach(entry => {
          this.curationData.push({value: entry[0], references: entry[1]})
        });
        console.log(this);
        this.changeRef.detectChanges();
      }
    });
  }

  setCuratedObject(object, field): void {
    console.log(object);
    console.log(field);
    this.curatedObject[field] = object;
  }

  setObject(field: string): void {
    console.log(field);
    this.disease[field] = this.curatedObject[field];
    this.newTestData = this.curatedObject[field];
    this.editing = null;
  }
}
