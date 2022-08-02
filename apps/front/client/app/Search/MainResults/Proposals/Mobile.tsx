import React, { useRef } from 'react';
import { ProposalType, SliderParamsType } from '@make.org/types';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import {
  TopComponentContext,
  TopComponentContextValue,
  TopComponentContextValueType,
} from '@make.org/store/topComponentContext';
import { ProposalCardWithQuestion } from '@make.org/components/Proposal/ProposalCardWithQuestion';
import { SearchSliderListStyle, SearchSliderListItemStyle } from './style';

type Props = {
  proposals: ProposalType[];
};

const SEARCH_SLIDER = 'search';
const SearchSliderParams: SliderParamsType = {
  slidesToShow: 1.15,
  interactiveChildren: { links: true, buttons: true },
};

export const MainResultsProposalsMobile: React.FC<Props> = ({ proposals }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const hasProposals = proposals.length > 0;
  useSlider(sliderRef, SearchSliderParams, hasProposals);
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSearchResultProposalList();

  return (
    <TopComponentContext.Provider value={topComponentContext}>
      <GliderStylesheet />
      <div className={`${SEARCH_SLIDER} glider-contain`}>
        <div className={`${SEARCH_SLIDER} glider`} ref={sliderRef}>
          <SearchSliderListStyle className={`${SEARCH_SLIDER} glider-track`}>
            {proposals.map((proposal, index) => (
              <SearchSliderListItemStyle
                key={proposal.id}
                className={SEARCH_SLIDER}
              >
                <ProposalCardWithQuestion
                  proposal={proposal}
                  position={index + 1}
                  size={proposals.length}
                  withMobileRadius
                />
              </SearchSliderListItemStyle>
            ))}
          </SearchSliderListStyle>
        </div>
      </div>
    </TopComponentContext.Provider>
  );
};
