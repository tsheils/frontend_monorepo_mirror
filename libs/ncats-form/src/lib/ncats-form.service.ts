import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {QuestionBase} from "./question-models/question-base";
import {Observable, BehaviorSubject, of} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})

export class NcatsFormService {

  _form = new BehaviorSubject<FormGroup>(null);


  ncatsForm$ = this._form.asObservable();

  constructor () {}


  createForm(questions: QuestionBase<any>[] ): Observable<FormGroup> {
    console.log(questions);
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    console.log("pushing new form");
     return of(new FormGroup(group));
  }
}
