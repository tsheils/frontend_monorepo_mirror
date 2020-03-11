import {Directive, Input} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[ncatsFrontendLibraryDisableControl]'
})
export class DisableControlDirective {

  @Input() set ncatsFrontendLibraryDisableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
