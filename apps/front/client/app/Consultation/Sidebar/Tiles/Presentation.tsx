// @flow
import { TileWithTitle } from 'Client/ui/Elements/TileWithTitle';
import React from 'react';
import { i18n } from 'Shared/i18n';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType, type PartnerType } from 'Shared/types/question';
import { PresentationTileWithTitleStyle } from 'Client/ui/Elements/TileWithTitle/style';
import { DescriptionImageStyle } from 'Client/features/consultation/Styled/Presentation';
import { useScreenWidth } from 'Client/hooks/useMedia';
import { isGreatCause } from 'Shared/helpers/question';
import { trackClickLearnMore } from 'Shared/services/Tracking';
import { FOUNDER_PARTNER, MEDIA_PARTNER } from 'Shared/constants/partner';
import { ParagraphStyle } from 'Client/ui/Elements/ParagraphElements';
import { useSelector } from 'react-redux';
import { matchDesktopDevice, matchMobileDevice } from 'Shared/helpers/styled';
import { Founders } from '../Founders';
import { SidebarNewWindowLink } from '../Link';

type Props = {
  question: QuestionType,
};
export const PresentationTile = ({ question }: Props) => {
  const { device } = useSelector((state: StateRoot) => state.appConfig);
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

  const descriptionImageHeight = isDesktop ? 204 : null;
  const descriptionImagewidth = isDesktop ? null : screenWidth;

  return (
    <>
      {!isMobile && question.descriptionImage && (
        <DescriptionImageStyle
          src={question.descriptionImage}
          alt={question.descriptionImageAlt || ''}
          height={descriptionImageHeight}
          width={descriptionImagewidth}
        />
      )}
      <TileWithTitle
        as={
          question.descriptionImage ? PresentationTileWithTitleStyle : undefined
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
