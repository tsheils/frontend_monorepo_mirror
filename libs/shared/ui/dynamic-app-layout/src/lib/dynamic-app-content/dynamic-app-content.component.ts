import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ComponentRef, Injector,
  Input,
  OnDestroy,
  OnInit, Type,
  ViewChild
} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal} from "@angular/cdk/portal";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subject} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {takeUntil} from "rxjs/operators";
import {PanelConfig} from "../models/panel-config";

@Component({
  selector: 'ncats-frontend-library-dynamic-app-content',
  templateUrl: './dynamic-app-content.component.html',
  styleUrls: ['./dynamic-app-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicAppContentComponent implements OnInit, OnDestroy {
  // todo set as viewchildren, then map the array
  /**
   * left sidenav panel instance
   */
  @ViewChild('leftpanel', {static: true}) leftPanelInstance: MatSidenav;
  /**
   * right sidenav panel instance
   */
  @ViewChild('rightpanel', {static: true}) rightPanelInstance: MatSidenav;
  /**
   * left sidenav panel instance
   */
  @ViewChild('lefttemplate', {static: true, read: CdkPortalOutlet}) leftPortalOutlet: CdkPortalOutlet;
  /**
   * right sidenav panel instance
   */
  @ViewChild('righttemplate', {static: true, read: CdkPortalOutlet}) rightPortalOutlet: CdkPortalOutlet;

  /**
   * full width headet area
   */
  @ViewChild('headertemplate', {static: true, read: CdkPortalOutlet}) headerPortalOutlet: CdkPortalOutlet;
  /**
   * content are, constrained by sidenavs, if applicable
   */
  @ViewChild('contenttemplate', {static: true, read: CdkPortalOutlet}) contentPortalOutlet: CdkPortalOutlet;

  /**
   * full width footer template
   */
  @ViewChild('footertemplate', {static: true, read: CdkPortalOutlet}) footerPortalOutlet: CdkPortalOutlet;


  /**
   * list of dynamic panel component objects
   */
  @Input() components: PanelConfig[];

  /**
   * data object
   * @type {{}}
   */
  @Input() data: any = {};

  /**
   * track loaded and injected components
   * @type {Map<any, any>}
   */
  loadedComponents: Map<any, any> = new Map<any, any>();

  /**
   * boolean to adjust the content area size based on sidenavs. set to false when all items loaded.
   * @type {boolean}
   */
  autosize = true;

  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  /**
   * boolean to toggle mobile views and parameters
   * @type {boolean}
   */
  isSmallScreen = false;

  leftPortalOutletClosed = false;
  rightPortalOutletClosed = false;

  /**
   * add necessary services
   * @param {Router} router
   * @param {ActivatedRoute} _route
   * @param {ChangeDetectorRef} changeRef
   * @param {BreakpointObserver} breakpointObserver
   * @param _injector
   */
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver,
    private _injector: Injector
  ) {  }

  /**
   * set mobile view
   * fetch data from route
   * fetch component configs
   * generate new components
   * subsctibe to router change events and re-generate components and reset data
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    this.makeComponents();
  }

  /**
   * iterate over each component, make a CDKPortalOutlet, inject it, and set required properties. Sets up listeners
   * for event emitting
   */
  makeComponents() {
    if(this.components && this.components.length > 0) {
      this.components.forEach(component => {
        if (component) {
          let portalOutlet: CdkPortalOutlet;
          // make component
          const instance: ComponentRef<any> = this.loadedComponents.get(component.token);
          if (!instance) {
            const componentInstance: ComponentRef<any> = this.createComponentInstance(component, portalOutlet);
            componentInstance.instance.config = component;
            if (component.data) {
              componentInstance.instance.data = component.data;
            }
            if(component.dataObservable) {
              component.dataObservable.subscribe(data => {
                componentInstance.instance.data = data;
                this.changeRef.markForCheck();
              });
            }

            // left side panel functionality

            if (component.section === 'leftPortalOutlet' || component.section === 'rightPortalOutlet') {
            }


            if (component.section === 'leftPortalOutlet' && componentInstance.instance['panelOptions']) {
              Object.entries(componentInstance.instance['panelOptions']).forEach(ent => this.leftPanelInstance[ent[0]] = ent[1]);
              // handle emitted close events
              if (componentInstance.instance.menuToggle) {
                componentInstance.instance.menuToggle.subscribe(res => {
                  this.leftPortalOutletClosed = !res;
                  this.leftPanelInstance.toggle(res);
                  this.changeRef.markForCheck();
                });
              }
            }

            // right side panel functionality
            if (component.section === 'rightPortalOutlet' && componentInstance.instance['panelOptions']) {
              Object.entries(componentInstance.instance['panelOptions']).forEach(ent => this.rightPanelInstance[ent[0]] = ent[1]);
              // handle emitted close events
              if (componentInstance.instance.menuToggle) {
                componentInstance.instance.menuToggle.subscribe(res => {
                  this.rightPortalOutletClosed = true;
                  this.rightPanelInstance.toggle(res);
                  this.changeRef.markForCheck();
                });
              }
            }

            if (component.navHeader) {
              componentInstance.instance.description = component.navHeader.mainDescription;
              //  componentInstance.instance.apiSources = component.api;
              componentInstance.instance.field = component.navHeader.section;
              componentInstance.instance.label = component.navHeader.label;
              this.changeRef.markForCheck();
            }

            // put this last or errors are thrown because the instance keeps getting used.
            if (componentInstance.instance.selfDestruct) {
              componentInstance.instance.selfDestruct.subscribe(res => {
                if (res) {
                  this.loadedComponents.delete(component.token);
                  componentInstance.destroy();
                }
              });
            }
            this.autosize = false;
            this.loadedComponents.set(component.token, componentInstance);
            this.changeRef.markForCheck();
          } else {
            instance.instance.data = this.data.results;
            this.loadedComponents.set(component.token, instance);
            this.changeRef.detectChanges();
          }
        }
      });
    }
  }


  /**
   * close full width filter panel when clicking outside of panel
   */
  close() {
    [...this.loadedComponents.values()].forEach(component => {
      if (component.instance.panelOptions) {
        component.instance.panelOptions.opened = false;
        component.instance.changeRef.markForCheck();
      }
    });
  }

  openSidenav(section: string) {
    [...this.loadedComponents.values()].forEach(component => {
      if (component.instance.panelOptions) {
        if(component.instance.config.section === section) {
          this[`${section + 'Closed'}`] = true;
          component.instance.toggleMenu();
          this.changeRef.markForCheck();
          component.instance.changeRef.markForCheck();
        }
      }
    })
  }

  createComponentInstance(component: PanelConfig, portalOutlet: CdkPortalOutlet): ComponentRef<any> {
    const dynamicChildToken: Type<any> = this._injector.get<Type<any>>(component.token);
    if (component.section) {
      portalOutlet = this[component.section];
    } else {
      portalOutlet = this.contentPortalOutlet;
    }
    const componentPortal = new ComponentPortal<any>(
      dynamicChildToken
    );
    return portalOutlet.attachComponentPortal(componentPortal);
  }


  /**
   * clears data
   * empties component
   * unsubscribes from observables
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
