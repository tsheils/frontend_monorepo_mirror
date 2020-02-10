import { Facet } from './facet';

describe('Facet', () => {
  it('should create an instance', () => {
    expect(new Facet({facet:'targets', values: [{name: "value", count: 666}]})).toBeTruthy();
  });
});
