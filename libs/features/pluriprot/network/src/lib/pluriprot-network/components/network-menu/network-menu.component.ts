import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {FormControl} from "@angular/forms";
import {RangeSliderComponentChange} from "../range-slider/range-slider.component";

@Component({
  selector: 'ncats-frontend-library-network-menu',
  templateUrl: './network-menu.component.html',
  styleUrls: ['./network-menu.component.scss']
})
export class NetworkMenuComponent implements OnInit {

  _settings: any = {
    fade: false
  };

  subGraphTypeCtrl: FormControl = new FormControl();
  activeGraph: string = 'nscs';

  @Output() resetZoom: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly optionsChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly close: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
    this.subGraphTypeCtrl.valueChanges.subscribe(val => {
      this._settings = {
        fade: false
      };
      this._settings.data = this.activeGraph;
      this._settings.subgraph = val;
      this.optionsChange.emit(this._settings);
    })
  }

  setActiveGraph(val: string) {
    this._settings = {
      fade: false
    };
    this.activeGraph = val;
    this._settings.data = val;
    this._settings.subgraph = null;
    this.optionsChange.emit(this._settings);
  }

  sliderChange(change: RangeSliderComponentChange, field: string) {
    this._settings[field] = change.value;
    this.optionsChange.emit(this._settings);

  }

  resetScale(a: number, b: number) {
    this._settings = {
      fade: false,
      hESC_NSC_Fold_Change: [a,b],
      reset: true
    };
    this.optionsChange.emit(this._settings);
    delete this._settings['reset'];
  }

  setFilterType(change: MatSlideToggleChange) {
    this._settings.fade = change.checked;
    this.optionsChange.emit(this._settings);
  }

  noData(change: MatCheckboxChange) {
    this._settings['no_data'] = change.checked;
    this.optionsChange.emit(this._settings);
  }

  closeMenu(): void {
    this.close.emit(true);
  }

  reset() {
    this.resetZoom.emit();
  }
}
