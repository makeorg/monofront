/* @flow */

import { getQualificationIndex } from './qualification';

describe('Qualification Helper', () => {
  it('getQualificationIndex with qualificationKey & proposalId', () => {
    const qualificationIndex = getQualificationIndex('foo', 1234);
    expect(qualificationIndex).toBe('foo_1234');
  });
});
