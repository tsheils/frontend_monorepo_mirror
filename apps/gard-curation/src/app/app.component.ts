import { Component } from '@angular/core';
import {DropdownQuestion, FileQuestion, MultiselectQuestion, TextboxQuestion} from "@ncats-frontend-library/ncats-form";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gard-curation';
  form: FormGroup;
  questions = [
    new TextboxQuestion({
      key: 'firstName',
      label: 'First name',
      required: true
    }),

    new TextboxQuestion({
      key: 'lastName',
      label: 'Last name',
      required: true
    }),

    new TextboxQuestion({
      key: 'school',
      label: 'School',
      required: true
    }),

    new TextboxQuestion({
      key: 'major',
      label: 'Major'
    }),

    new TextboxQuestion({
      key: 'title',
      label: 'Poster Title',
      required: true
    }),
    // todo service to generate years
    new DropdownQuestion({
      key: 'year',
      label: 'Internship Year',
      options: [
        {key: '2016', value: '2016'},
        {key: '2017', value: '2017'},
        {key: '2018', value: '2018'}
      ],
      required: true
    }),
    // todo dynamic service to retrieve names from ldap
    new MultiselectQuestion({
      key: 'mentors',
      label: 'Mentors',
      options: [
        {key: 'Trung', value: 'Trung'},
        {key: 'Alexy', value: 'Alexy'},
        {key: 'Tyler', value: 'Tyler'}
      ],
      required: true
    }),

    new FileQuestion({
      key: 'mugshot',
      label: 'Profile Photo',
      type: 'file'
    }),

    new FileQuestion({
      key: 'poster',
      label: 'Poster',
      type: 'file'
    })

  ];

  constructor(){}
  ngOnItit(){}

  /**
   * form can be set to a value here for curation, but it needs to be targetted to a specific
   * form if multiple forms are loaded
   * todo: async data load
   * @param {FormGroup} form
   * @param {string} formName
   */
  setForm(form : FormGroup) {
    this.form = form;
  }

  clearForm():void {
    this.form.reset();
  }

  saveForm(form?: string): void {
    const formVals = this.form.value;
    console.log(formVals);
  }
}
