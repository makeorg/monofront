import React from 'react';
import { useAppContext } from '@make.org/store';
import { Tooltip } from '@make.org/ui/components/Tooltip';
import { LoadingDots } from '@make.org/ui/components/Loading/Dots';
import i18n from 'i18next';
import { VoteButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { VoteIconStyle } from '@make.org/ui/elements/SvgElements';

type ButtonProps = {
  /** Vote key */
  voteKey: string;
  /** button className */
  buttonClass: string;
  /** When button is in pending mode */
  displayPending: boolean;
  /** Method called when vote button is clicked */
  handleUnvote: () => void | Promise<void>;
  /** Boolean to disable click event on the vote button */
  disableClick: boolean;
};

const UnvoteButtonItem: React.FC<ButtonProps> = ({
  voteKey,
  buttonClass = voteKey,
  displayPending = false,
  handleUnvote,
  disableClick = false,
}) => {
  const handleAPICall = () => {
    if (!displayPending) {
      handleUnvote();
    }
  };
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  return (
    <VoteButtonStyle
      aria-label={
        displayPending ? i18n.t('common.loading') : i18n.t(`vote.${voteKey}`)
      }
      className={buttonClass}
      onClick={handleAPICall}
      onTouchEnd={handleAPICall}
      aria-busy={displayPending}
      data-cy-button="vote"
      data-cy-vote-key={voteKey}
      disabled={disableClick}
      isWidget={isWidget}
    >
      {displayPending ? (
        <LoadingDots isWidget={isWidget} />
      ) : (
        <VoteIconStyle
          className={isWidget ? `${buttonClass} widget` : buttonClass}
          aria-hidden
          focusable="false"
        />
      )}
    </VoteButtonStyle>
  );
};

type Props = {
  /** Vote key */
  voteKey: string;
  /** button className */
  buttonClass: string;
  /** When button is in pending mode */
  displayPending: boolean;
  /** Method called when vote button is clicked */
  handleUnvote: () => void;
  /** Boolean to disable click event on the vote button */
  disableClick: boolean;
  /** Boolean to disable tooltip on button hover event */
  withTooltip: boolean;
};

export const UnvoteButton: React.FC<Props> = ({
  voteKey,
  buttonClass = voteKey,
  displayPending = false,
  handleUnvote,
  disableClick = false,
  withTooltip = true,
}) => {
  if (withTooltip) {
    return (
      <Tooltip content={i18n.t('unvote.title')} direction="left">
        <UnvoteButtonItem
          voteKey={voteKey}
          buttonClass={buttonClass}
          displayPending={displayPending}
          handleUnvote={handleUnvote}
          disableClick={disableClick}
        />
      </Tooltip>
    );
  }

  return (
    <UnvoteButtonItem
      voteKey={voteKey}
      buttonClass={buttonClass}
      displayPending={displayPending}
      handleUnvote={handleUnvote}
      disableClick={disableClick}
    />
  );
};
