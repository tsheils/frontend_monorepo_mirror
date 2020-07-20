import {Component, ViewChild} from '@angular/core';
import * as d3 from 'd3';

import {XyplotComponent} from "../../../../libs/shared/visualizations/xyplot/src/lib/xyplot/xyplot.component";
import {XYChartOptions} from "../../../../libs/models/core/core-models/src";
import {PluriprotPoint} from "../../../../libs/models/pluriprot/pluriprot-models/src/lib/models/pluriprot-point";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'pluriprot';
  activeLink = 'data';

  constructor(
  ) {
    console.log("app constructor")
  }

  ngOnInit() {
  }

}
