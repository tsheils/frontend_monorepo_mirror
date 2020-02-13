
import { QuestionBase } from './question-base';

export class MultiselectQuestion extends QuestionBase<string> {
  controlType = 'multiselect';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
