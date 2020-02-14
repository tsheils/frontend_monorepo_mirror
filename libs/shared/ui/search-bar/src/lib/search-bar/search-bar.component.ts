import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable} from "rxjs";

@Component({
  selector: 'ncats-frontend-library-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;
  /**
   * optional placeholder search string
   */
  @Input() placeholderStr?: string;

  /**
   * form control for text input
   * @type {FormControl}
   */
  typeaheadCtrl: FormControl = new FormControl();

  /**
   * observable list of returned responses
   */
  filteredGroups: Observable<any>;



  @Output() query: EventEmitter<string> = new EventEmitter<string>();
  @Output() autocompleteEvent: EventEmitter<string> = new EventEmitter<string>();


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
    if (!this.placeholderStr) {
      this.placeholderStr = 'Search for targets (e.g., \'ITK\') or diseases (e.g., \'asthma\')';
    }

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
   * emits query, optionally appending a wildcard character
   * @returns void
   */
  search(wildcard?: boolean): void {
    this.autocomplete.closePanel();
    let query = this.typeaheadCtrl.value;
    if (wildcard) {
      query = `${query}.*`;
    }
  this.query.emit(query);
  }
}
