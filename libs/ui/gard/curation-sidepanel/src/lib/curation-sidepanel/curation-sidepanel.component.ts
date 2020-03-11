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
   * list of all available sections
   * @type {any[]}
   * todo: should be PharosPanel
   */
  @Input() data: any[];

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
    fixedTopGap: 120,
    role: 'directory'
  };

  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(change) {
  }
  /**
   * close the filter panel
   */
  toggleMenu() {
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
