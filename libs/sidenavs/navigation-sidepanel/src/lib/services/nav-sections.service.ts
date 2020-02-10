import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})

export class NavSectionsService {

  /**
   * no args constructor
   */
  constructor() { }

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _sections: any[] = [];

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _navSectionsSource = new BehaviorSubject<any[]>(null);

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _activeSection: string;

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _activeSectionSource = new BehaviorSubject<string>('summary');

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  sections$ = this._navSectionsSource.asObservable();

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  activeSection$ = this._activeSectionSource.asObservable();

  setSections(sections: any[]): void {
    this._sections = sections;
    this._navSectionsSource.next(this._sections);
  }

  setActiveSection(section: string) {
    this._activeSectionSource.next(section);
  }

  removeSection(remSection: string) {
    this._sections = this._sections.filter(section => section.section !== remSection);
    this._navSectionsSource.next(this._sections);
  }
}
