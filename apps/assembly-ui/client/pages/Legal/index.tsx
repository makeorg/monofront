import React, { FC } from 'react';
import {
  LegalPagesContainerStyle,
  LegalPagesContentStyle,
  LegalPagesMaintTitleStyle,
  LegalPagesTextStyle,
} from '../../../components/style';

const LegalPage: FC = () => (
  <LegalPagesContainerStyle>
    <LegalPagesContentStyle>
      <LegalPagesMaintTitleStyle>Mentions légales</LegalPagesMaintTitleStyle>
      <LegalPagesTextStyle>
        Editeur du site : MAKE.ORG, Société par Actions Simplifiées au capital
        de 1.056.017,00·€, ayant son siège social au 13-15 Rue de la Bûcherie
        75005 Paris, immatriculée au RCS de PARIS sous le numéro 820 016 095
        (ci-après« MAKE.ORG »).
      </LegalPagesTextStyle>
      <LegalPagesTextStyle>
        Adresse de courrier électronique :{' '}
        <a href="mailto:contact-fr@make.org" style={{ whiteSpace: 'nowrap' }}>
          contact-fr@make.org
        </a>
        .
      </LegalPagesTextStyle>
      <LegalPagesTextStyle>
        Numéro de téléphone : (+33)1·84·25·15·74
      </LegalPagesTextStyle>
      <LegalPagesTextStyle>
        Directeur de Publication : Axel Dauchez
      </LegalPagesTextStyle>
      <LegalPagesTextStyle>
        Hébergeur du site : OVH, 2 rue Kellermann, 59100 Roubaix FRANCE
      </LegalPagesTextStyle>
      <LegalPagesTextStyle>
        Numéro de téléphone : (+33)8 99 70 17 61
      </LegalPagesTextStyle>
      <LegalPagesTextStyle>
        La Commission européenne met à disposition une plateforme de règlement
        des litiges en ligne pour les consommateurs, à l&apos;adresse{' '}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noreferrer"
          style={{ whiteSpace: 'nowrap' }}
        >
          https://ec.europa.eu/consumers/odr
        </a>
      </LegalPagesTextStyle>
    </LegalPagesContentStyle>
  </LegalPagesContainerStyle>
);

// default export needed for loadable component
export default LegalPage; // eslint-disable-line import/no-default-export
