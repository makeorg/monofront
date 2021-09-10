import React, { FC } from 'react';
import {
  CONTACT_EMAIL,
  PRIVACY_POLICY_DATE,
  MAKE_ADDRESS,
  MAKE_RCS,
} from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
import {
  RedHTMLLinkElementStyle,
  RedLinkStyle,
} from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getCountryDPA } from '@make.org/utils/helpers/countries';
import { getCookiesPageLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticTitleExtra,
  StaticParagraphStyle,
  StaticPrimaryUnorderedListStyle,
  StaticPrimaryUnorderedListItemStyle,
  StaticThirdLevelTitleStyle,
  StaticSquareListStyle,
  StaticSquareListItemStyle,
  StaticExternalLinkIconStyle,
  StaticFourthLevelTitleStyle,
  StaticListTitleStyle,
} from '../style';

export const DataFR: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  return (
    <>
      <MetaTags
        title={i18n.t('meta.privacy_policy.title')}
        description={i18n.t('meta.privacy_policy.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          Charte de données personnelles
          <StaticTitleExtra>
            - en date du{' '}
            {DateHelper.localizedAndFormattedDate(
              PRIVACY_POLICY_DATE,
              DATE.PPP_FORMAT
            )}{' '}
            -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Le présent document complète les Conditions Générales de MAKE.ORG et
          représente les engagements de Make.org, Société par Actions
          Simplifiées, ayant son siège social au {MAKE_ADDRESS}, immatriculée au
          RCS de PARIS sous le numéro {MAKE_RCS}, agissant en tant que
          responsable de traitement, en ce qui concerne le respect de la
          réglementation en vigueur applicable au traitement de données
          personnelles et, en particulier, le règlement (
          <abbr title="Union Européenne">UE</abbr>) 2016/679 du Parlement
          européen et du Conseil du 27 avril 2016 applicable à compter du 25 mai
          2018 (ci-après, « le RGPD »).
        </StaticParagraphStyle>
        <StaticPrimaryUnorderedListStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DESCRIPTION DU TRAITEMENT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org est soucieuse de la protection des données personnelles
              en général et de celle des utilisateurs de son site internet et de
              ses consultations en ligne en particulier. Il s’agit pour Make.org
              de l’une des valeurs fondamentales du numérique et d’une condition
              essentielle de la liberté de conscience. À cette fin, Make.org
              s’engage à limiter la quantité de données personnelles recueillies
              à ce qui est seulement nécessaire pour le fonctionnement de son
              site internet et de ses consultations et autres opérations en
              ligne.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              En conséquence, Make.org ne pourra procéder à un traitement de
              données personnelles que dans le strict exercice de sa mission et
              selon les finalités suivantes:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                utilisation et amélioration du site internet et des services de
                Make.org ; et
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                mise en œuvre des consultations et autres opérations de
                Make.org.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              La base légale des traitements de données personnelles effectués
              par Make.org est le consentement des utilisateurs du site internet
              et de ses consultations et autres opérations en ligne.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org permet aux utilisateurs de soumettre des propositions à
              la consultation (option n°1) et/ou de réagir et voter pour les
              propositions soumises à la consultation par d’autres utilisateurs
              (option n°2). Les données personnelles traitées par Make.org
              varient selon ces deux options :
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Option n°1
            </StaticFourthLevelTitleStyle>
            <StaticListTitleStyle>Identité</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>Prénom</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Date de naissance
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Profession (optionnel pour certaines consultations)
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Code postal (optionnel pour certaines consultations)
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>Connexion</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>Adresse IP</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Facebook ID</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Google ID</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>
              Et/ou, en cas d&#39;ouverture d&#39;un compte personnalisé auprès
              de Make.org
            </StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Adresse email
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Mot de passe
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>
              Participation à la consultation
            </StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Propositions soumises à la consultation
                <StaticParagraphStyle>
                  Le cas échéant, réactions aux propositions soumises à la
                  consultation
                </StaticParagraphStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Option n°2
            </StaticFourthLevelTitleStyle>
            <StaticListTitleStyle>Identité</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>Prénom</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>Connexion</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>Adresse IP</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>
              Participation à la consultation
            </StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Réactions aux propositions soumises à la consultation
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              À l&#39;exception des catégories de données personnelles
              identifiées comme optionnelles, le refus de fournir les données
              mentionnées ci-dessus empêchera l’utilisateur de soumettre des
              propositions à la consultation (option n°1) et/ou de réagir aux
              propositions soumises à consultation (option n°2).
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              OBLIGATIONS DE MAKE.ORG
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org s&#x27;engage à :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                traiter les données personnelles uniquement pour les seules
                finalités exposées ci-dessous;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                garantir la confidentialité des données personnelles, en
                particulier en s’assurant que les tiers autorisés à traiter les
                données personnelles s’engagent à respecter leur confidentialité
                ou soient soumis à une obligation légale appropriée de
                confidentialité ;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                prendre en compte, s’agissant de ses outils, consultations,
                applications ou services, les principes de protection des
                données dès la conception et de protection des données par
                défaut (Privacy By Design).
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DESTINATAIRES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les données personnelles traitées en exécution de la mission ne
              pourront faire l’objet d’aucune divulgation à des tiers en dehors
              des cas prévus ci-dessous, ou sauf par disposition légale ou
              réglementaire.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Ainsi, peuvent, dans le seul but d’accomplir leurs missions
              respectives, avoir accès aux données personnelles :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                les personnes chargées de l’exécution de la consultation, celles
                chargées de traiter la relation avec les utilisateurs et les
                réclamations, celles chargées des services logistiques et
                informatiques ainsi que leurs responsables hiérarchiques ;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                les éventuels sous-traitants de Make.org –étant précisé que le
                contrat signé entre lesdits sous-traitants et Make.org fera
                mention des obligations incombant aux sous-traitants en matière
                de protection de la sécurité et de la confidentialité des
                données ;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                le cas échéant, les partenaires ou commanditaires des
                consultations, en particulier aux fins d&#39;accompagnement et
                de valorisation, notamment éditoriale, de celles-ci.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Enfin, les données relatives à la participation à la consultation
              sont disponibles de manière anonymisée en open source –à
              l’exclusion, évidemment, des données relatives à l’identité des
              utilisateurs ainsi que des données de connexion.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>COOKIES </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Lorsque vous vous connectez sur notre site, des cookies sont
              déposés sur votre terminal afin d’améliorer votre expérience,
              accroître la performance de notre site et optimiser nos
              consultations citoyennes. Les informations contenues dans les
              cookies ne visent pas à vous identifier personnellement et ne sont
              jamais utilisées à d‘autres fins que celles indiquées sur notre
              page de{' '}
              <RedLinkStyle to={`${getCookiesPageLink(country)}`}>
                gestion des cookies
              </RedLinkStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              EXERCICE DES DROITS DES UTILISATEURS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les utilisateurs bénéficient d’un droit d’accès à leurs données
              personnelles, d’un droit de rectification de leurs données
              personnelles, d’un droit d’effacement de leurs données
              personnelles, d’un droit à la limitation du traitement de leurs
              données personnelles, d’un droit à la portabilité de leurs données
              personnelles, d’un droit de ne pas faire l’objet d’une décision
              individuelle automatisée (y compris de profilage) ou encore d’un
              droit de définir des directives relatives au sort des données
              personnelles après la mort. Les utilisateurs disposent également
              du droit de s’opposer au traitement par Make.org de leurs données
              personnelles.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Les utilisateurs peuvent retirer leur consentement au traitement
              de leurs données personnelles par Make.org à tout moment, étant
              précisé que ce retrait ne portera pas atteinte à la licéité des
              traitements antérieurs fondés sur le consentement.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’exercice par les utilisateurs des droits ci-dessus rappelés peut
              être fait par tout moyen, et notamment par l’envoi d’un courriel à
              l’adresse :{' '}
              <RedHTMLLinkElementStyle as="a" href={`mailto:${CONTACT_EMAIL}`}>
                {`${CONTACT_EMAIL}`}
              </RedHTMLLinkElementStyle>
              . Si les utilisateurs estiment que leurs droits sur les données ne
              sont pas respectés par Make.org, ils peuvent en tout état de cause
              adresser une réclamation à la{' '}
              <RedHTMLLinkElementStyle
                as="a"
                href={`${getCountryDPA(country).link}`}
                target="_blank"
                rel="noopener"
              >
                {getCountryDPA(country).name}
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  Ouverture dans une nouvelle fenêtre
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SÉCURITÉ ET CONFIDENTIALITÉ DU TRAITEMENT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org prendra toute mesure nécessaire pour préserver et faire
              respecter l’intégrité et la confidentialité des données
              personnelles.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org s’engage notamment à mettre en place les mesures
              techniques et organisationnelles permettant d’assurer, compte tenu
              de l’état des règles de l’art, un niveau de sécurité et de
              confidentialité approprié au regard des risques présentés par le
              traitement et la nature des données à caractère personnel
              traitées.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SORT DES DONNÉES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les données personnelles sont conservées pour une durée de trois
              ans après la dernière visite sur le site ou après la dernière
              connexion sur le compte.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DÉLÉGUÉ À LA PROTECTION DES DONNÉES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Le délégué à la protection des données désigné en application de
              l’article 37 du RGPD est la SELARL FWPA Avocats, 18 rue des
              Pyramides, 75001, Paris, représentée par Maître Jean-Baptiste
              Soufron. Il peut être contacté à l’adresse :{' '}
              <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                {`${CONTACT_EMAIL}`}
              </RedHTMLLinkElementStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
        </StaticPrimaryUnorderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default DataFR; // eslint-disable-line import/no-default-export
