import {Component, Input, OnInit} from '@angular/core';
import {FileLoaderDialogComponent} from "./file-loader-dialog/file-loader-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {FileQuestion} from "../../question-models/question-file";

@Component({
  selector: 'lib-ncats-file',
  templateUrl: './ncats-file.component.html',
  styleUrls: ['./ncats-file.component.css']
})
export class NcatsFileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() question: FileQuestion;
  @Input() formControl: FormControl = new FormControl();
  @Input() _value: Array<File>;
  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  /**
   * this subscribes to the the reset event from the form control
   */
  ngOnInit() {
    this.formControl.valueChanges.subscribe(res=> {
      if(res === null) {
        this.value = null;
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(FileLoaderDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.writeValue(result);
    });
  }

  //required functions
  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.formControl.setValue(value);
      this.value = value;
    }
  }
}
