import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as d3 from 'd3';
import {select} from 'd3-selection';
import {XYChartOptions, XYPoint} from '@ncats-frontend-library/models/core/core-models';
import {BehaviorSubject, Subject} from "rxjs/index";


@Component({
  selector: 'ncats-frontend-library-xyplot',
  templateUrl: './xyplot.component.html',
  styleUrls: ['./xyplot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class XyplotComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * container that holds the radar chart object
   */
  @ViewChild('scatterPlotTarget') chartContainer: ElementRef;

  /**
   * behavior subject that is used to get and set chart data
   * @type {BehaviorSubject<any>}
   * @private
   */
  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Output()
private hoverEvent: EventEmitter<any> = new EventEmitter<any>();
  /**
   * setter for chart data
   * @param value
   */
  @Input()
  set data(value: any) {
    if (value) {
      this._data.next(value);
    }
  }

  /**
   * getter for chart data
   * @returns {any}
   */
  get data(): any {
    return this._data.value;
  }

  /**
   * options opbject passed from component
   */
  @Input() options?: any;
  /**
   * options for size and layout for the chart
   */
  private _chartOptions: XYChartOptions;

  /**
   * svg object that is drawn, also used to clear the chart on redraw
   */
  private svg: any;

  /**
   * html element that will hold tooltip data
   */
  private tooltip: any;

  /**
   * width of the graph retrieved from the container size
   */
  private width: number;

  /**
   * height of the graph retrieved from the container size
   */
  private height: number;

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  displayData: any = [];

  private x;
  private y;
  private k = 1;

  private voronoi;
  private voronoiGroup;
  private chartGroup;
  private zoom;

  /**
   * function to redraw/scale the graph on window resize
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
    this.updateData();
  }

  constructor() {}

  ngOnInit() {
    this._data.subscribe(x => {
      if (this.data && this.data.length > 0) {
          this.displayData = this.data;
        this.drawChart();
        this.setData();
      }
    });
  }

  ngOnChanges(change) {
    if (this.svg && this.data) {
        this.updateData();
    }
  }

  getOptions() {
    // get chart options
    this._chartOptions = this.options ? this.options : new XYChartOptions({});
  }

  drawChart(): void {
    this.getOptions();
    //////////// Create the container SVG and g /////////////
    const element = this.chartContainer.nativeElement;
    const margin = this._chartOptions.margin;
    this.width = element.offsetWidth - margin.left - margin.right;
    this.height = element.offsetHeight - margin.top - margin.bottom;

    this.x = d3.scaleLinear()
      .range([0, this.width]);

    if (this._chartOptions.xAxisScale === 'log') {
      this.x = d3.scaleLog()
        .range([0, this.width]);
    }

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    if (this._chartOptions.yAxisScale === 'log') {
      this.y = d3.scaleLog()
        .range([this.height, 0]);
    }

    this.voronoi = d3.voronoi()
      .x((d: XYPoint) => this.x(d.x))
      .y((d: XYPoint) => this.y(d.y))
      .extent([[-this._chartOptions.margin.left, -this._chartOptions.margin.top],
        [this.width + this._chartOptions.margin.right, this.height + this._chartOptions.margin.bottom]]);

    this.x.domain(
      (d3.extent(d3.merge(this.displayData).map(d => d.x)))
    ).nice();

    this.y.domain(
      (d3.extent(d3.merge(this.displayData).map(d => d.y)))
    ).nice();


    const xAxis = d3.axisBottom(this.x)
      .ticks((this.width + 2) / (this.height + 2) * 5)
      .tickSize(-this.height)
      .tickPadding(10);

    const yAxis = d3.axisRight(this.y)
      .ticks(5)
      .tickSize(this.width)
      .tickPadding(-20 - this.width);

    // Remove whatever chart with the same id/class was present before
    select(element).selectAll('svg').remove();

    this.svg = select(element)
      .append('svg:svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .append('svg:g')
      .attr('id', 'group')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.svg.append('text')
      .attr('transform',
        'translate(' + (this.width / 2) + ' ,' + (this.height + margin.top + 20) + ')')
      .attr('class', 'axis-label')
      .text(this._chartOptions.xLabel);

    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left / 1.4)
      .attr('x', 0 - (this.height / 2))
      .attr('class', 'axis-label')
      .text(this._chartOptions.yLabel);

    // Add the X Axis
    const gX = this.svg.append('svg:g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // Add the Y Axis
    const gY = this.svg.append('svg:g')
      .attr('class', 'axis')
      .call(yAxis);

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x).ticks(0));

    this.svg.append('g')
      .call(d3.axisLeft(this.y).ticks(0));

    this.chartGroup = this.svg
      .append('svg:g')
      .attr('class', 'chartbody')
      .attr('clip-path', 'url(#clip)')
      .append('svg:g')
      .attr('class', 'points');

    this.voronoiGroup = this.svg
      .append('svg:g')
      .attr('class', 'voronoiParent')
      .attr('clip-path', 'url(#clip)')
      .append('svg:g')
      .attr('class', 'voronoi');

    this.svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);


    this.tooltip = select('body').append('div')
      .attr('class', 'line-tooltip')
      .style('opacity', 0);

    const zoomed = () => {
      const t = d3.event.transform;
      this.k = t.k;

      const xt = t.rescaleX(this.x);
      const yt = t.rescaleY(this.y);
      gX.call(xAxis.scale(xt));
      gY.call(yAxis.scale(yt));

      this.svg.select('.chartbody').selectAll('.linePoints')
        .attr('r', (3 / this.k))
        .exit();

      this.voronoiGroup
        .attr('transform', d3.event.transform);
      this.chartGroup
        .attr('transform', d3.event.transform);
    };


    this.zoom = d3.zoom()
      .scaleExtent([0.75, 1000])
      .translateExtent([[-100000, -100000], [100000, 100000]])
      .on('zoom', zoomed);

    this.voronoiGroup.call(this.zoom);

  }

  setData() {
    // JOIN new data with old elements.
    const circles = this.svg.select('.points').selectAll('.linePoints')
      .data(d3.merge(this.displayData), d => d);
    circles.enter()
      .append('circle')
      .attr('class', 'linePoints')
      .attr('r', 2.5 / this.k)
      .attr('id', d => d.name)
      .attr('cy', d => this.y(d.y))
      .attr('cx', d => this.x(d.x))
      .style('fill', d => d.color)
      .style('pointer-events', 'all')
      .exit();

    // Add the valueline path.
    if (this._chartOptions.line) {
      this.svg.append('path')
        .attr('class', 'timeline')
        .attr('transform', 'translate(' + (this._chartOptions.margin.left + this._chartOptions.margin.right) + ',0)');
    }
    this.setVoronoi();
  }

  updateData(): void {
    const t = d3.transition()
      .duration(100);

    const circles = this.svg.select('.points').selectAll('.linePoints')
      .data(d3.merge(this.displayData), d => d);

    // EXIT old elements not present in new data.
    circles
      .exit()
      .transition(t)
      .style('fill-opacity', 1e-6)
      .remove();

    // don't update old elements because we want them to overlap
    // ENTER new elements present in new data.
    circles.enter()
      .append('circle')
      .attr('class', 'linePoints')
      .attr('r', 2.5 / this.k)
      .attr('id', d => d.name)
      .attr('cy', d => this.y(d.y))
      .attr('cx', d => this.x(d.x))
      .style('fill', d => d.color)
      .style('pointer-events', 'all')
      .transition(t)
      .style('fill-opacity', 1);

    if (this._chartOptions.line) {
      // Add the valueline path.
      this.svg.append('path')
        .attr('class', 'timeline')
        .attr('transform', 'translate(' + (this._chartOptions.margin.left + this._chartOptions.margin.right) + ',0)');
    }

    this.setVoronoi();
  }

  setVoronoi(): void {
    const voronoi = this.svg.select('.voronoi').selectAll('.voronoi-path')
      .data(this.voronoi.polygons(d3.merge(this.displayData)), d => d);

    // EXIT old elements not present in new data.
    voronoi
      .exit()
      .remove();

    // UPDATE old elements present in new data.
    voronoi
      .attr('d', (d) => d ? 'M' + d.join('L') + 'Z' : null);

    // ENTER new elements present in new data.
    voronoi
      .enter()
      .append('path')
      .attr('class', 'voronoi-path')
      // .style('pointer-events', 'all')
      .attr('d', (d) => d ? 'M' + d.join('L') + 'Z' : null)
      .on('mouseover', (d) => this.mouseOn(d.data))
      .on('mouseout', (d) => this.mouseOut(d.data))
      .exit();
  }

  // todo emit data, tooltip and event so this tooltip can be generic
  mouseOn(data: any): void {
    this.svg.select(`#${data.name}`)
      .attr('r', 8 / this.k)
      .exit();
    this.tooltip
      .transition()
      .duration(100)
      .style('opacity', .9);
    let span = `<span><strong>Gene:</strong>${data.name}</span><br>
                      <span><strong>Ratio:</strong> ${data.ratio}</span><br>`;
    if (data.pvalue) {
      span = span +`<span *ngIf =data.pvalue><strong>T-test P Value:</strong> ${data.pvalue}</span><br>`;
    }
    span = span +`<span><strong>hESC_Ln_NSAF:</strong>${data.x}</span><br>
                      <span><strong>hNSC_Ln_NSAF</strong>${data.y}</span>`;
    this.tooltip.html(span)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px')
      .style('width', 100);
  }


  mouseOut(data: any) {
    this.tooltip
      .transition()
      .duration(200)
      .style('opacity', 0);
    this.svg.select(`#${data.name}`)
      .attr('r', 2.5 / this.k)
      .exit();
  }

  reset() {
    this.k = 1;
    this.voronoiGroup.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    const element = this.chartContainer.nativeElement;
    select(element).selectAll('this.svg').remove();
    select('body').selectAll('.line-tooltip').remove();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
