import {InjectionToken} from "@angular/core";
import {NavHeaderConfig} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {Observable} from "rxjs";

export enum Position {
  Header = 'headerPortalOutlet',
  Content = 'contentPortalOutlet',
  Left = 'leftPortalOutlet',
  Right = 'rightPortalOutlet',
  Footer = 'footerPortalOutlet'
}


export interface PanelConfig {
  /**
   * token for the panel component
   */
  token: InjectionToken<string>;

  section?: Position;
  /**
   * navigation header to add to the sidenav
   */
  navHeader?: NavHeaderConfig;


  data?: any;

  dataObservable?: Observable<any>;

  /**
   * list of various api calls to retrieve data specific to the panel
   */
  // api?: PharosApi[];
}

