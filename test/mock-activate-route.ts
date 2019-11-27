import {BehaviorSubject} from 'rxjs';

export const MOCKACTIVATEDROUTE = {
  // here you can add your mock objects, like snapshot or parent or whatever
  // example:
  fragment: new BehaviorSubject({ foo: 'bar' }),
    snapshot: {
      fragment: new BehaviorSubject({ foo: 'bar' }),
      queryParamMap: new Map([]),
      data: {
        results: {
        },
        components: [],
        data: { data: 'myTitle ',
          components: [{}],
        },
      }
    },
    routeConfig: { children: { filter: () => {} } }
};
