import {Directive, ViewContainerRef} from '@angular/core';

/**
 * Directive to return a view container reference instead of using a view child
 */
@Directive({
  selector: '[appDynamicContent]'
})

export class DynamicContentDirective {

  /**
   * sets a view container that the parent component can interact with
   * @param viewContainerRef
   */
    constructor(public viewContainerRef: ViewContainerRef) { }

}
