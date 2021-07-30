import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import React, { FC } from 'react';
import i18n from 'i18next';
import { QuestionType, PartnerType } from '@make.org/types';
import { PresentationTileWithTitleStyle } from '@make.org/ui/components/TileWithTitle/style';
import { useScreenWidth } from '@make.org/utils/hooks/useMedia';
import { isGreatCause } from '@make.org/utils/helpers/question';
import { trackClickLearnMore } from '@make.org/utils/services/Tracking';
import {
  FOUNDER_PARTNER,
  MEDIA_PARTNER,
} from '@make.org/utils/constants/partner';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { useAppContext } from '@make.org/store';
import {
  matchDesktopDevice,
  matchMobileDevice,
} from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { DescriptionImageStyle } from '../../Styled/Presentation';
import { Founders } from '../Founders';
import { SidebarNewWindowLink } from '../Link';

type Props = {
  question: QuestionType;
};
export const PresentationTile: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const isDesktop = matchDesktopDevice(device);
  const screenWidth = useScreenWidth();
  const foundersOrMedia: PartnerType[] = question.partners
    ? question.partners.filter(
        partner =>
          partner.partnerKind === FOUNDER_PARTNER ||
          partner.partnerKind === MEDIA_PARTNER
      )
    : [];

  const descriptionImageHeight = isDesktop ? 204 : 0;
  const descriptionImagewidth = isDesktop ? 0 : screenWidth;

  return (
    <>
      {!isMobile && question.descriptionImage && (
        <DescriptionImageStyle
          src={question.descriptionImage}
          alt={question.descriptionImageAlt || ''}
          height={descriptionImageHeight}
          width={descriptionImagewidth || Breakpoints.LargeMobile}
        />
      )}
      <TileWithTitle
        as={
          question.descriptionImage
            ? PresentationTileWithTitleStyle
            : TileWithTitle
        }
        title={i18n.t('consultation.presentation.title')}
      >
        {question.wording.description && (
          <ParagraphStyle
            id="presentation_text"
            dangerouslySetInnerHTML={{
              __html: question.wording.description,
            }}
          />
        )}
        {question.aboutUrl && (
          <SidebarNewWindowLink
            linkUrl={question.aboutUrl}
            linkText={i18n.t('consultation.presentation.link_text')}
            tracking={() => trackClickLearnMore()}
          />
        )}
        <Founders
          founders={foundersOrMedia}
          isGreatCause={isGreatCause(question.operationKind)}
        />
      </TileWithTitle>
    </>
  );
};
