import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {XyplotComponent} from "../../../../../../shared/visualizations/xyplot/src";
import {PluriprotPoint} from "../../../../../../models/pluriprot/pluriprot-models/src/lib/models/pluriprot-point";
import {XYChartOptions} from "../../../../../../models/core/core-models/src";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import * as d3 from 'd3';


@Component({
  selector: 'ncats-frontend-library-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent implements OnInit {
  @ViewChild('scatterInstance') scatterInstance: XyplotComponent;

  dataMap: Map<string, PluriprotPoint[]> = new Map<string, PluriprotPoint[]>();
  displayData: any = [];
  filters: string[] = ['gray', 'blue', 'green', 'red'];
  chartOptions: XYChartOptions = new XYChartOptions({
    line: false,
    xLabel: 'hESC_Ln_NSAF',
    yLabel: 'hNSC_Ln_NSAF'
  });

  loading = true;

  constructor(
      private changeRef: ChangeDetectorRef
  )
  {
    console.log("constructor");
  }

  ngOnInit() {
    this.loadData().subscribe(data => {
      this.dataMap = data;
      this.displayData = [];
      this.filters.forEach(color => {
        this.displayData.push(this.dataMap.get(color));
      });
      this.loading = false;
    });
  }

  reset() {
    this.scatterInstance.reset();
  }

  filterData(event: any) {
    this.filters = event;
    this.displayData = [];
    this.filters.forEach(color => {
      this.displayData.push(this.dataMap.get(color));
    });
    this.changeRef.detectChanges();
  }

  loadData(): Observable<Map<string, PluriprotPoint[]>> {
    const dataMap: Map<string, PluriprotPoint[]> = new Map<string, PluriprotPoint[]>();
    return fromPromise(d3.dsv(',', './assets/data/pluriprot-shiny.csv', (d) => {
      return new PluriprotPoint({
        name: d.Symbol,
        label: d.Symbol,
        x: parseFloat(d.hESC_Ln_NSAF),
        y: parseFloat(d.hNSC_Ln_NSAF),
        ratio: Number(d.NSAF_SpC_ratio).toFixed(3),
        pvalue: d.t_test_p,
        color: d.color
      });
    }).then(function(data) {
      data.map(point => {
        const points: PluriprotPoint[] = dataMap.get(point.color);
        if (points) {
          points.push(point);
          dataMap.set(point.color, points);
        } else {
          dataMap.set(point.color, [point]);
        }
      });
      return dataMap;
    }));
  }
}
