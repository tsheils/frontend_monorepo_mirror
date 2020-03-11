import { DisableControlDirective } from './disable-control.directive';
import {NgControl} from "@angular/forms";

describe('DisableControlDirective', () => {
  it('should create an instance', () => {
    const directive = new DisableControlDirective({} as NgControl);
    expect(directive).toBeTruthy();
  });
});
