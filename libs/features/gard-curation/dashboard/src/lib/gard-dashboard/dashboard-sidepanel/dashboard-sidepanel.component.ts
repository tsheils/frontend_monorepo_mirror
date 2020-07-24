import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ncats-frontend-library-dashboard-sidepanel',
  templateUrl: './dashboard-sidepanel.component.html',
  styleUrls: ['./dashboard-sidepanel.component.scss']
})
export class DashboardSidepanelComponent implements OnInit {
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
    fixedTopGap: 66,
    role: 'directory'
  };

  open = true;


  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }


  /**
   * close the filter panel
   */
  toggleMenu() {
    this.open = !this.open;
    this.menuToggle.emit(this.open);
  }
}
