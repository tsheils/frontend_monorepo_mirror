import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, Type, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, of} from "rxjs";
import {DynamicContentDirective} from "./directives/dynamic-content.directive";
import {NcatsFormService} from "./ncats-form.service";
import {QuestionTypeLookupService} from "./services/question-type-lookup.service";
import {QuestionInjectorService} from "./services/question-injector.service";
import {QuestionBase} from "@ncats-frontend-library/shared/ui/ncats-form";

@Component({
  selector: 'ncats-fel-form',
  templateUrl: './ncats-form.component.html',
  styleUrls: ['./ncats-form.component.scss'],
  providers: [NcatsFormService]
})
export class NcatsFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Output() readonly formReturner: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  form: FormGroup;
  payLoad = '';
  @ViewChild(DynamicContentDirective, {static: true}) questionHost: DynamicContentDirective;

  private _form: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  constructor(private questionInjectorService: QuestionInjectorService,
              private questionTypeLookupService: QuestionTypeLookupService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.createForm().subscribe(res => {
      if (res) {
        this.form = res;
        this.formReturner.emit(res);
        this.form.valueChanges.subscribe(val => {
          this.formReturner.emit(this.form);
        })
      }
    })
  }

  // todo this could probably use the cdkportals method that pharos uses

  createForm(): Observable<FormGroup> {
    const group: any = {};
    if (this.questions) {
      this.questions.forEach(question => {
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
        if (question.controlType) {
          const instance: Type<any> = this.questionTypeLookupService.getComponent(question.controlType);
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(instance);
          const componentRef = this.questionHost.viewContainerRef.createComponent(componentFactory);
          componentRef.instance.question = question;
          componentRef.instance.formControl = group[question.key];
        }
      });
    }
    return of(new FormGroup(group));
  }


  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.formReturner.emit(this.form);
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
