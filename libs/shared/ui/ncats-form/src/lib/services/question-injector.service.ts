import {ComponentFactoryResolver, Injectable, InjectionToken, Injector, Type} from '@angular/core';

/**
 * dynamically inject a question into an element host
 */
@Injectable({
  providedIn: 'root'
})
export class QuestionInjectorService {

  /**
   * initialize services
   * @param _questionFactoryResolver
   * @param _injector
   */
  constructor(private _questionFactoryResolver: ComponentFactoryResolver,
              private _injector: Injector) {
  }
  /**
   * created question instance,
   * does not clear component host view container
   * adds question to whatever is inside container
   * used for iterating over lists of questions
   * @param questionHost
   * @param questionInstance
   * @returns Type<any>
   */
  appendQuestion(questionHost: any, questionInstance: Type<any>): Type<any> {
    const questionFactory = this._questionFactoryResolver.resolveComponentFactory(questionInstance);
    const viewContainerRef = questionHost.viewContainerRef;
    return viewContainerRef.createQuestion(questionFactory);
  }

  /**
   * return the question token, which is then passed to the next functions
   * todo: could probably just happen internally instead of round tripping the token
   * @returns Type<any>
   * @param token
   */
  getQuestionToken(token: InjectionToken<any>): Type<any> {
    return this._injector.get<Type<any>>(token);
  }

}
