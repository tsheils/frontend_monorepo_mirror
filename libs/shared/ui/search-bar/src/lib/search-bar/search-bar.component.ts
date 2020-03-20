import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'ncats-frontend-library-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;
  /**
   * optional placeholder search string
   */
  @Input() placeholderStr?: string;

  @Input() disabled = false;

  /**
   * form control for text input
   * @type {FormControl}
   */
  typeaheadCtrl: FormControl;

  /**
   * observable list of returned responses
   */
  @Input() filteredGroups: any;



  @Output() query: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChangeEvent: EventEmitter<string> = new EventEmitter<string>();


  /**
   * sets up router and suggest service
   * @param {Router} _router
   * @param {SuggestApiService} suggestApiService
   */
  constructor(
    private _router: Router,
   // private suggestApiService: SuggestApiService
  ) {
  }


  /**
   * add placeholder string if required
   * set up subscription for input value changes
   * // todo: should unsubscribe
   */
  ngOnInit() {
   this.typeaheadCtrl = new FormControl({value: '', disabled: false});
    if (!this.placeholderStr) {
      this.placeholderStr = 'Search';
    }

    this.typeaheadCtrl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
        )
      .subscribe(term => this.inputChangeEvent.emit(term));

    /*if (this.autocomplete) {
      this.filteredGroups = this.typeaheadCtrl.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(term => this.autocompleteEvent.emit(term),
          ));
    }*/
  }

  /**
   * emits query
   * @returns void
   */
  search(event?: MatAutocompleteSelectedEvent): void {
    this.autocomplete.closePanel();
  this.query.emit(this.typeaheadCtrl.value);
  }

  displayFn(option: any): string {
    return option && option.key ? option.key : '';
  }
}
