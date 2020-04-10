import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'ncats-frontend-library-curation-sidepanel',
  templateUrl: './curation-sidepanel.component.html',
  styleUrls: ['./curation-sidepanel.component.scss']
})
export class CurationSidepanelComponent implements OnInit, OnChanges {
  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * page section currently in view
   */
  @Input() activeElement: string;

  activeFragment: string;

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _data = new BehaviorSubject<any>({});

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set data(value: any) {
    if (value.data) {
      this._data.next(value.data);
    } else {
      this._data.next(value);
    }
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  /**
   * boolean to toggle mobile views and parameters
   * @type {boolean}
   */
  isSmallScreen = false;

  panelOptions: any //PanelOptions
    = {
    mode: 'side',
    class: 'filters-panel',
    opened: true,
    fixedInViewport: true,
    fixedTopGap: 60,
    role: 'directory'
  };

  open = true;

  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._data.subscribe()
  }

  setData() {
  this.changeRef.detectChanges();
  }

  ngOnChanges(change) {
  }
  /**
   * close the filter panel
   */
  toggleMenu() {
    this.open = !this.open;
    this.menuToggle.emit();
  }

  /**
   * jump to section on click
   * @param fragment
   */
  public scroll(fragment: any): void {
  //  this.location.replaceState(`${this.location.path(false)}#${fragment}`);
   // this.viewportScroller.scrollToAnchor(fragment);
  }

  /**
   * check of section header is the active one
   * @param {string} check
   * @returns {boolean}
   */
  isActive(check: string): boolean {
    return this.activeElement === check;
  }

}
