import styled from 'styled-components';
import { ActiveButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { Image } from '@make.org/ui/components/Image';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ExpirationSessionModalContentStyle = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  max-width: 350px;
  padding: ${spacings.s} 0px;
`;

export const ReloadButtonStyle = styled(ActiveButtonStyle)`
  margin-top: ${spacings.m};
`;

export const SessionExpiredPictureStyle = styled(Image)<{
  [key: string]: string;
}>`
  margin-bottom: ${spacings.m};
`;

export const SessionExpiredParagraphStyle = styled(ParagraphStyle)`
  text-align: center;
  margin-top: ${spacings.s};
`;
