export class SidePanelConfig {

  /**
   * sidenav panel mode, 'push' 'over' or 'side'
   */
  mode?: string;

  /**
   * optional sidenav panel class
   */
  class?: string;

  /**
   * set panel to be opened or closed by default
   */
  opened?: boolean;

  /**
   * fix sidenav in viewport
   */
  fixedInViewport?: boolean;

  /**
   * top gap for fixed panel, bumps the sidenav down for headers
   */
  fixedTopGap?: number;

  /**
   * sidenav role, ie navigation
   */
  role?: string;
}
