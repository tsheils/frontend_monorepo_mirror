import {InjectionToken} from "@angular/core";
import {NavHeaderConfig} from "./nav-header-config";

export enum Position {
  Header = 'headerPortalOutlet',
  Content = 'contentPortalOutlet',
  Left = 'leftPortalOutlet',
  Right = 'rightPortalOutlet',
}


export interface DynamicPanelConfig {
  /**
   * token for the panel component
   */
  token: InjectionToken<string>;

  section?: Position;
  /**
   * navigation header to add to the sidenav
   */
  navHeader?: NavHeaderConfig;

  /**
   * list of various api calls to retrieve data specific to the panel
   */
 // api?: PharosApi[];
}
