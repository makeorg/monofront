import { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { useAppContext } from '@make.org/store';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';

export const useSwitchProposalContent = (
  proposalId?: string
): {
  switchProposalContent: () => void;
  showOriginal: boolean;
  setShowOriginal: Dispatch<SetStateAction<boolean>>;
} => {
  const { dispatch } = useAppContext();
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  useEffect(() => {
    setShowOriginal(false);
  }, [proposalId]);

  const switchProposalContent = () => {
    setShowOriginal(!showOriginal);
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  return {
    switchProposalContent,
    showOriginal,
    setShowOriginal,
  };
};
