import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ncats-fel-idg-tdl-indicator',
  templateUrl: './idg-tdl-indicator.component.html',
  styleUrls: ['./idg-tdl-indicator.component.scss']
})
export class IdgTdlIndicatorComponent implements OnInit {
  /**
   * String to be displayed background level correlates to level and is set in parent scss file
   * */
  @Input() level?: "Tbio" | "Tdark" | "Tchem" | "TClin";

  /**
   * grey out the indicator
   */
  @Input() disabled? =  false;

  //@Input() target?: Target;

  @Input() TargetID?: string;

  constructor() { }

  ngOnInit() {
  }

}
