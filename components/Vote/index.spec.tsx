import React from 'react';
import { shallow } from 'enzyme';
import { Vote } from './index';
import { VoteWrapperStyle } from './style';

// doDo: fix test
describe.skip('VoteContainer', () => {
  let wrapper;

  const proposalId = 'fooId';
  const votes = [];
  const index = 1;
  const currentIndex = 1;
  const goToNextCard = () => {};

  beforeEach(() => {
    wrapper = shallow(
      <Vote
        proposalId={proposalId}
        initialVotes={votes}
        index={index}
        currentIndex={currentIndex}
        goToNextCard={goToNextCard}
      />
    );
  });

  it('render VoteComponent and passed props', () => {
    const voteComponentWrapper = wrapper.find(VoteWrapperStyle);
    expect(voteComponentWrapper).toHaveLength(1);
  });
});
