import React from 'react';
import { shallow } from 'enzyme';
import { LoadingDots } from '@make.org/ui/elements/Loading/Dots';
import { Qualification } from './index';
import { QualificationButton } from './Button';

describe('ProposalSubmitContainer', () => {
  const qualifications = [
    {
      qualificationKey: 'doNotUnderstand',
      count: 2,
      hasQualified: false,
    },
    {
      qualificationKey: 'noOpinion',
      count: 4,
      hasQualified: false,
    },
    {
      qualificationKey: 'doNotCare',
      count: 6,
      hasQualified: false,
    },
  ];
  const votedKey = 'neutral';
  const proposalId = 'fooProposalId';
  const proposalKey = 'fooProposalKey';
  const index = 2;

  it('Renders Initial Props & State', () => {
    const wrapper = shallow(
      <Qualification
        qualifications={qualifications}
        votedKey={votedKey}
        proposalId={proposalId}
        proposalKey={proposalKey}
        index={index}
      />
    );

    const QualifyButtonProps = wrapper
      .find(QualificationButton)
      .first()
      .props();

    expect(QualifyButtonProps.qualification).toBe(qualifications[0]);
    expect(QualifyButtonProps.votedKey).toBe(votedKey);
    expect(QualifyButtonProps.proposalId).toBe(proposalId);
    expect(QualifyButtonProps.proposalKey).toBe(proposalKey);
    expect(QualifyButtonProps.index).toBe(index);

    expect(wrapper.find(LoadingDots)).toHaveLength(0);
  });
});
