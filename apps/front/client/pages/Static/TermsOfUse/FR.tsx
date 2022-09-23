import React, { FC } from 'react';
import {
  CONTACT_EMAIL,
  GTU_DATE,
  MAKE_ADDRESS,
  MAKE_CAPITAL,
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
import {
  getDataPageLink,
  getModerationLinkByLanguage,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';

import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';

import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticTitleExtra,
  StaticParagraphStyle,
  StaticPrimaryOrderedListStyle,
  StaticPrimaryOrderedListItemStyle,
  StaticThirdLevelTitleStyle,
  StaticFourthLevelTitleStyle,
  StaticSquareListItemStyle,
  StaticSquareListStyle,
  StaticSecondaryOrderedListStyle,
  StaticSecondaryOrderedListItemStyle,
  StaticStrongStyle,
  StaticExternalLinkIconStyle,
} from '../style';

export const TermsOfUseFR: FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;

  return (
    <>
      <MetaTags
        title={i18n.t('meta.gtu.title')}
        description={i18n.t('meta.gtu.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          Conditions d’utilisation de Make.org
          <StaticTitleExtra>
            - en date du{' '}
            {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.PPP_FORMAT)} -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org est une organisation indépendante de tout parti qui édite un
          site internet et des services ouverts au public.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Pour ce faire, il permet à des Utilisateurs de faire des Propositions
          sur le site. Les autres Utilisateurs qui le souhaitent peuvent alors
          commenter ou voter pour ces Propositions afin de les soutenir,
          l’objectif étant de réussir à faire émerger dans la société des
          réflexions sur des questions d’intérêt général, notamment en matière
          économiques, sociales, civiques et citoyennes. Ces réflexions pourront
          alors être reprises par des partenaires de Make.org qui aideront à les
          rendre concrètes et à les réaliser.
        </StaticParagraphStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              OBJET DU SERVICE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les présentes conditions générales ont pour objet de définir les
              modalités et conditions d’utilisation des services proposés sur
              Make.org (ci-après : les « Services »), ainsi que de définir les
              droits et obligations des parties dans ce cadre.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Elles sont notamment accessibles et imprimables à tout moment par
              un lien direct en bas de la page d’accueil du site.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Elles peuvent être complétées, le cas échéant, par des conditions
              d’utilisation particulières à certains Services, ou par des
              conditions d’utilisation particulières à certains utilisateurs
              spécifiques. En cas de contradiction, les conditions particulières
              prévalent sur ces conditions générales.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              EXPLOITANT DU SITE ET DES SERVICES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Le Site et les Services (ou collectivement « les Services ») sont
              exploités par la société Make.org, Société par Actions Simplifiées
              au capital de {MAKE_CAPITAL}, ayant son siège social au{' '}
              {MAKE_ADDRESS}, immatriculée au RCS de PARIS sous le numéro{' '}
              {MAKE_RCS} (ci-après« Make.org »).
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org n&apos;est pas un opérateur de plateforme en ligne
              relevant du champ d&apos;application de la loi n° 2018-1202 du 22
              décembre 2018 relative à la lutte contre la manipulation de
              l&apos;information. A ce titre, nous ne sommes donc pas soumis aux
              obligations y afférentes. La véracité des informations mises en
              ligne sur notre site nous tient cependant à cœur, et nous
              détaillons au sein des présentes{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              et de notre{' '}
              <RedHTMLLinkElementStyle
                href={getModerationLinkByLanguage(language)}
                target="_blank"
                rel="noopener"
              >
                Charte de modération
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>{' '}
              les mesures que nous prenons en ce sens.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ACCÈS AU SITE ET AUX SERVICES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              L’accès au Site et aux Services est gratuit.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’accès au Site et aux Services est gratuit. Il est ouvert, sous
              réserve des restrictions prévues sur le site :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                à toute personne physique disposant de la pleine capacité
                juridique pour s’engager au titre des présentes conditions
                générales. La personne physique qui ne dispose pas de la pleine
                capacité juridique ne peut accéder au Site et aux Services
                qu’avec l’accord de son représentant légal,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                à tout mineur disposant de l’autorisation de ses représentants
                légaux ainsi que sous leur contrôle,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                à toute personne morale agissant par l’intermédiaire d’une
                personne physique disposant de la capacité juridique pour
                contracter au nom et pour le compte de la personne morale.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ACCEPTATION DES CONDITIONS GÉNÉRALES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les présentes Conditions Générales d’Utilisation (ci-après «{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              ») ont pour objet de définir les modalités selon lesquelles
              l’Utilisateur pourra accéder et utiliser les Services. Elles
              constituent un contrat entre Make.org et les Utilisateurs du
              Service. Elles annulent et remplacent toutes les dispositions
              antérieures et constituent l’intégralité des droits et obligations
              des parties. Les{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              sont communiquées à chaque Utilisateur qui en prend connaissance.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’utilisation du Service implique l’acceptation entière et sans
              réserve des présentes{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              . La non-acceptation entraîne ainsi la renonciation à
              l’utilisation de celui-ci.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’utilisation du Service implique également l’acceptation entière
              et sans réserve de la Politique d’utilisation des données de
              Make.org qui fait partie intégrante des présentes{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              et est disponible{' '}
              <RedLinkStyle to={getDataPageLink(country)}>ici</RedLinkStyle>.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Les présentes{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              sont modifiables à tout moment et sans préavis par Make.org. Toute
              modification prendra effet immédiatement à compter de la mise en
              ligne de la nouvelle version des{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              sur le Site. L’Utilisateur est donc invité à consulter
              régulièrement la dernière version des{' '}
              <abbr lang="fr" title="Conditions générales d'utilisation">
                CGUS
              </abbr>{' '}
              sur le Site. À défaut, il sera réputé accepter sans réserve la
              nouvelle version des Conditions Générales d’Utilisation.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              UTILISATION DU SITE
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Accès au site
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Le site est ouvert au public et tous les Utilisateurs peuvent
                  le visiter et voter sur des Propositions.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Utilisateurs inscrits
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Tous les Utilisateurs peuvent voter sur le site, mais seuls
                  les Utilisateurs inscrits peuvent faire des Propositions
                  citoyennes. À cette fin, ceux qui le souhaitent peuvent
                  s’inscrire sur le site en remplissant le formulaire prévu à
                  cet effet. Ils doivent alors fournir l’ensemble des
                  informations marquées comme obligatoires. Toute inscription
                  incomplète ne sera pas validée.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs inscrits sur le site sont spécifiquement
                  définis comme « Les Utilisateurs Inscrits ».
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs inscrits garantissent que toutes les
                  informations données dans le formulaire d’inscription sont
                  exactes, à jour et sincères et ne sont entachées d’aucun
                  caractère trompeur.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Il s’engage à mettre à jour ces informations dans son Espace
                  Personnel en contactant Make.org par courriel à
                  l’adresse&nbsp;
                  <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                    {`${CONTACT_EMAIL}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur Inscrit est informé et accepte que les
                  informations saisies aux fins de création ou de mise à jour de
                  son Compte vaillent preuve de son identité. Les informations
                  saisies par l’Utilisateur l’engagent dès leur validation.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Compte et Espace personnel
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’inscription entraîne automatiquement l’ouverture d’un compte
                  (ci-après : le « Compte »), donnant accès à un espace
                  personnel (ci-après : l’« Espace Personnel ») qui permet de
                  gérer l’utilisation des Services sous une forme et selon les
                  moyens techniques que Make.org juge les plus appropriés et qui
                  peuvent évoluer dans le temps.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs inscrits peuvent accéder à tout moment à leur
                  Espace Personnel après s’être identifiés à l’aide de leur
                  identifiant de connexion ainsi que de leur mot de passe.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs inscrits s’engagent à avoir une utilisation
                  uniquement personnelle des Services et à ne permettre à aucun
                  tiers de les utiliser à leur place ou pour leur compte, sauf à
                  en supporter l’entière responsabilité.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs inscrits sont pareillement responsables du
                  maintien de la confidentialité de leur identifiant et de leur
                  mot de passe. Ils doivent immédiatement contacter Make.org
                  s’ils remarquaient que leur Compte a été utilisé à leur insu.
                  Ils reconnaissent à Make.org le droit de prendre toutes
                  mesures appropriées en pareil cas.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DESCRIPTION DES SERVICES
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Propositions Citoyennes
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  La plateforme propose aux Utilisateurs de voter sur des
                  Propositions citoyennes qui ont été proposées par d’autres
                  Utilisateurs.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les propositions citoyennes déposées sur Make.org ont toutes
                  une égale chance d’être transformées en actions.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  C’est par son vote que l’utilisateur peut permettre à une
                  proposition de devenir une Action citoyenne sur lequel
                  Make.org s’engage.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org conçoit ensuite son rôle comme un intermédiaire entre
                  des propositions citoyennes et des partenaires actions. (
                  <RedHTMLLinkElementStyle href="#anchor_partners">
                    Voir au 6.8 Partenaires Actions
                  </RedHTMLLinkElementStyle>
                  )
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Formuler une Proposition Citoyenne
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs Inscrits peuvent émettre leurs propres
                  Propositions citoyennes qui sont destinées à être publiées,
                  commentées, analysées et débattues, et qui seront soumises au
                  vote des Utilisateurs.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Forme et contenu des Propositions Citoyennes
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Chaque Proposition citoyenne doit nécessairement commencer par
                  « Il faut » et contenir un nombre maximum de 140 caractères.
                  La Proposition Citoyenne doit être lisible et rédigée en
                  langue française, sous une forme permettant d’être comprise de
                  tous, sans langage abrégé et sans abus des lettres majuscules.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  La proposition ne doit pas contenir d’éléments qui seraient
                  contraires à la loi, aux bonnes mœurs ou dont les termes
                  contreviendraient aux dispositions des présentes Conditions
                  Générales d’Utilisation.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Modération et publication de la Proposition Citoyenne
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  La publication de la Proposition Citoyenne de l’Utilisateur
                  est soumise à modération dans les conditions définies aux
                  présentes{' '}
                  <abbr lang="fr" title="Conditions générales d'utilisation">
                    CGUS
                  </abbr>{' '}
                  . La demande de publication d’une Proposition Citoyenne sera
                  traitée le plus rapidement qu’il est possible aux équipes de
                  Make.org, avec l’objectif de répondre en moins de 48 heures.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Le service de modération de Make.org examine chaque
                  Proposition Citoyenne reçue avant de la mettre en ligne. En
                  conséquence, l’Utilisateur doit veiller à ne pas réitérer
                  inutilement l’envoi d’une proposition de Proposition citoyenne
                  et à ne pas soumettre une même proposition de Proposition
                  citoyenne. Il ne devra pas non plus spammer les Services en
                  proposant les mêmes Solutions avec des adresses électroniques
                  différentes. Toujours dans le but de laisser la parole à tous
                  les Utilisateurs, chacun pourra déposer 100 propositions
                  maximum sur la même consultation. Au-delà de ce seuil, nous ne
                  serons plus en capacité d’accepter les propositions et nous
                  notifierons l’Utilisateur concerné par e-mail pour lui
                  expliquer les raisons de ce seuil et l’accompagner dans son
                  usage optimal de la plateforme.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Dès validation de la Proposition citoyenne de l’Utilisateur,
                  celle-ci fera l’objet d’une publication sur le Service et une
                  notification de publication sera adressée à son auteur.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  En cas de rejet de la Proposition citoyenne de l’Utilisateur,
                  un courrier électronique lui sera adressé par Make.org lui
                  notifiant ledit rejet. L’Utilisateur pourra alors librement
                  soumettre une nouvelle Proposition citoyenne.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Une fois publiée sur le Service, elle pourra être mise en
                  avant sur les Services, sans pour autant que Make.org
                  garantisse ni sa fréquence d’apparition, ni son audience.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org s’engage à ne pas modifier arbitrairement les
                  contenus licites et répondant à ses règles de modération qui
                  lui seraient proposés, en dehors des éventuelles corrections
                  liées à l’orthographe.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Demande de suppression d’une Proposition Citoyenne par un
                  Utilisateur inscrit
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Dans l’hypothèse où un Utilisateur inscrit souhaiterait que sa
                  Proposition citoyenne publiée fasse l’objet d’une suppression,
                  il adressera sa demande par e-mail à Make.org à l’adresse
                  suivante :&nbsp;
                  <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                    {`${CONTACT_EMAIL}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  La demande de suppression de l’Utilisateur sera traitée dans
                  un délai raisonnable par Make.org.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Voter sur une Proposition Citoyenne
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs peuvent tous se prononcer par le biais de
                  votes sur les propositions citoyennes présentes sur le Site,
                  sans avoir à créer de compte, en cliquant sur les boutons «
                  D’accord », « Pas d’accord » ou « Vote Blanc ».
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Utilisation des Propositions Citoyennes
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Utilisation à des fins statistiques :&nbsp;
                  </StaticStrongStyle>
                  Make.org pourra utiliser les Propositions citoyennes, agrégées
                  ou non et expurgées de toutes données personnelles, en ce
                  compris des compilations, synthèses à des fins statistiques,
                  d’études ou à toutes autres fins.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Utilisation pour des débats :&nbsp;
                  </StaticStrongStyle>
                  Les Propositions citoyennes publiées sur le Service pourront
                  être sélectionnées par Make.org, afin d’être analysées,
                  commentées et/ou débattues à l’occasion de débats publics
                  organisés par Make.org ou par ses partenaires.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Utilisation à des fins de rapport et d’études :&nbsp;
                  </StaticStrongStyle>
                  Les Propositions citoyennes publiées sur le Service, ainsi que
                  les votes y afférents, pourront être sélectionnés par Make.org
                  afin de réaliser notamment des analyses, rapports et études à
                  des fins statistiques et de recherches ou de donner lieu à la
                  création de projets de réformes.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Utilisation à des fins de rapport et d’études :&nbsp;
                  </StaticStrongStyle>
                  Les Propositions citoyennes publiées sur le Service, ainsi que
                  les votes y afférents, pourront être sélectionnés par Make.org
                  afin de réaliser notamment des analyses, rapports et études à
                  des fins statistiques et de recherches ou de donner lieu à la
                  création de projets de réformes.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Publication de livres blancs :&nbsp;
                  </StaticStrongStyle>
                  Make.org pourra éditer ou coéditer des livres blancs à
                  vocation non commerciale reprenant, partiellement ou
                  intégralement, les Propositions citoyennes.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Utilisation éditoriale :&nbsp;
                  </StaticStrongStyle>
                  Les Propositions citoyennes, et les votes y afférents,
                  pourront en outre être repris, commentés et analysés par
                  Make.org et/ou par des journalistes partenaires afin de
                  réaliser des contenus éditoriaux.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Utilisation à des fins de communication :&nbsp;
                  </StaticStrongStyle>
                  Les Propositions citoyennes pourront également être utilisées
                  par Make.org sur le Site et faire l’objet d’affichage sur des
                  espaces publicitaires exploités par les partenaires de
                  Make.org. Dans ce cas, l’utilisation d’une Proposition
                  citoyenne sur lesdits espaces publicitaires donnera lieu à la
                  publication de la Proposition de manière anonyme si elle a été
                  publiée anonymement ou sous-titrée avec le prénom, l’âge et le
                  département si l’Utilisateur a renseigné ces informations.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Réalisation des Propositions citoyennes :&nbsp;
                  </StaticStrongStyle>
                  Enfin, les propositions pourront faire l’objet d’une action
                  concrète de transformation, soit directement par des
                  Utilisateurs, soit par le biais des partenaires action de
                  Make.org, ce que l’Utilisateur à l’origine de la Proposition
                  ainsi que les Utilisateurs ayant voté sur celle-ci comprennent
                  et acceptent expressément.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle
                id="anchor_partners"
                className="section6"
              >
                <StaticFourthLevelTitleStyle>
                  Partenaires Actions
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Les Utilisateurs Inscrits peuvent émettre leurs propres
                  Propositions citoyennes qui sont destinées à être publiées,
                  commentées, analysées et débattues, et qui seront soumises au
                  vote des Utilisateurs.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>PREUVE </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              L’Utilisateur reconnaît et accepte expressément :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                que les données recueillies sur le site et sur les équipements
                informatiques de Make.org font foi de la réalité des opérations
                intervenues dans le cadre des présentes ;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                que ces données constituent le seul mode de preuve admis entre
                les parties.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              OBLIGATIONS DE L’UTILISATEUR
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Sans préjudice des autres obligations prévues aux présentes,
              l’Utilisateur s’engage à respecter les obligations qui suivent :
            </StaticParagraphStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Respect des lois et règlements
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’engage, dans son usage des Services, à
                  respecter les lois et règlements en vigueur et à ne pas porter
                  atteinte aux droits de tiers ou à l’ordre public. Il est
                  notamment seul responsable du bon accomplissement de toutes
                  les formalités notamment administratives, fiscales et/ ou
                  sociales et de tous les paiements de cotisations, taxes ou
                  impôts de toutes natures qui lui incombent, le cas échéant, en
                  relation avec son utilisation des Services. La responsabilité
                  de Make.org ne pourra en aucun cas être engagée à ce titre.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Usage du Site et des Services
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’Utilisateur reconnaît avoir pris connaissance sur le site
                  des caractéristiques et contraintes, notamment techniques, de
                  l’ensemble des Services. Il est seul responsable de son
                  utilisation des Services.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur est informé et accepte que la mise en œuvre des
                  Services nécessite qu’il soit connecté à internet et que la
                  qualité des Services dépend directement de cette connexion,
                  dont il est seul responsable.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’engage à ne pas publier des propositions à
                  caractère publicitaire ou faisant la promotion de services à
                  but lucratif. L’Utilisateur s’engage à ne pas publier de
                  propositions qui seraient dépourvues de sérieux ou hors sujet.
                  L’Utilisateur s’engage à faire un usage strictement personnel
                  des Services. Il s’interdit en conséquence de céder, concéder
                  ou transférer tout ou partie de ses droits ou obligations au
                  titre des présentes à un tiers, de quelque manière que ce
                  soit.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’engage à ne pas publier des propositions
                  faisant la promotion ou dénigrant des partis, des
                  organisations ou des personnalités publiques.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur est également seul responsable des relations
                  qu’il pourra nouer avec les autres Utilisateurs et des
                  informations qu’il leur communique dans le cadre des Services.
                  Il lui appartient d’exercer la prudence et le discernement
                  appropriés dans ces relations et communications. L’Utilisateur
                  s’engage en outre, dans ses échanges avec les autres
                  Utilisateurs, à respecter les règles usuelles de politesse et
                  de courtoisie.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’engage à ne pas tenir de propos ou faire de
                  propositions contraires à la loi et aux bonnes mœurs et
                  notamment, sans que cette liste ne soit exhaustive :
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    des propos incitant à la haine raciale, les propos racistes,
                    antisémites, xénophobes homophobes, etc… ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos à caractère violent, pornographique, pédophile,
                    etc… ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos injurieux, dénigrants, diffamatoires, ou portant
                    atteinte aux droits de la personnalité de tiers ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos négationnistes de crimes contre l’humanité et de
                    génocides reconnus et l’apologie de crimes ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos incitant à commettre des actes réprimés par la
                    loi telle que l’incitation à commettre des actes violents,
                    terroristes, à la vente de produits stupéfiants, etc. ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos portant atteintes à la vie privée ou aux droits
                    de la propriété intellectuelle de tiers,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos portant atteinte à la présomption d’innocence ou
                    un secret de l’instruction, etc. ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos portant atteinte à la dignité humaine ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des propos pouvant être considérés comme relevant d’un abus
                    de liberté d’expression.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Relation à Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’engage à fournir à Make.org toutes les
                  informations nécessaires à la bonne exécution des Services.
                  Plus généralement, l’Utilisateur s’engage à coopérer
                  activement avec Make.org en vue de la bonne exécution des
                  présentes.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’engage à ce que ses propositions soient
                  reproduites selon les règles d’indexation, de mise en forme et
                  de mise en valeur de Make.org, en sa qualité d’éditeur du
                  Service.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              GARANTIES DE L’UTILISATEUR
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Contenus
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’Utilisateur est seul responsable des contenus de toute
                  nature (rédactionnels, graphiques, audiovisuels ou autres, en
                  ce compris la dénomination et/ou l’image éventuellement
                  choisies par l’Utilisateur pour l’identifier sur le site)
                  qu’il diffuse dans le cadre des Services (ci-après désignés :
                  les « Contenus »).
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Il garantit à Make.org qu’il dispose de tous les droits et
                  autorisations nécessaires à la diffusion de ces Contenus.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Il s’engage à ce que lesdits Contenus soient licites, ne
                  portent pas atteinte à l’ordre public, aux bonnes mœurs ou aux
                  droits de tiers, n’enfreignent aucune disposition législative
                  ou règlementaire et plus généralement, ne soient aucunement
                  susceptibles de mettre en jeu la responsabilité civile ou
                  pénale de Make.org.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur s’interdit ainsi de diffuser, notamment et sans
                  que cette liste soit exhaustive :
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    des Contenus pornographiques, obscènes, indécents, choquants
                    ou inadaptés à un public familial, diffamatoires, injurieux,
                    violents, racistes, xénophobes ou révisionnistes,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des Contenus contrefaisants,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des Contenus attentatoires à l’image d’un tiers,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des Contenus mensongers, trompeurs ou proposant ou
                    promouvant des activités illicites, frauduleuses ou
                    trompeuses,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    des Contenus nuisibles aux systèmes informatiques de tiers
                    (tels que virus, vers, chevaux de Troie, etc.),
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    et plus généralement des Contenus susceptibles de porter
                    atteinte aux droits de tiers ou d’être préjudiciables à des
                    tiers, de quelque manière et sous quelque forme que ce soit.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Limites de l’usage des Services
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’Utilisateur reconnaît que les Services lui offrent une
                  solution supplémentaire mais non alternative des moyens qu’il
                  utilise déjà par ailleurs pour atteindre le même objectif et
                  que cette solution ne saurait se substituer à ces autres
                  moyens.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur doit prendre les mesures nécessaires pour
                  sauvegarder par ses propres moyens les informations de son
                  Espace Personnel qu’il juge nécessaires.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  L’Utilisateur est informé et accepte que la mise en œuvre des
                  Services nécessite qu’il soit connecté à internet et que la
                  qualité des Services dépend directement de cette connexion,
                  dont il est seul responsable.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Réclamations et indemnités
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  L’Utilisateur garantit Make.org contre toutes plaintes,
                  réclamations, actions et revendications quelconques que
                  Make.org pourrait subir du fait de la violation, par
                  l’Utilisateur de l’une quelconque de ses obligations ou
                  garanties aux termes des présentes conditions générales.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Il s’engage à indemniser Make.org de tout préjudice qu’elle
                  subirait et à lui payer tous les frais, charges et/ou
                  condamnations qu’elle pourrait avoir à supporter de ce fait.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              COMPORTEMENTS PROHIBES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Il est strictement interdit d’utiliser les Services aux fins
              suivantes :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                l’exercice d’activités illégales, frauduleuses ou portant
                atteinte aux droits ou à la sécurité des tiers,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                l’atteinte à l’ordre public ou la violation des lois et
                règlements en vigueur,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                l’intrusion dans le système informatique d’un tiers ou toute
                activité de nature à nuire, contrôler, interférer, ou
                intercepter tout ou partie du système informatique d’un tiers,
                en violer l’intégrité ou la sécurité,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                l’envoi d’emails non sollicités et/ou de prospection ou
                sollicitation commerciale,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                les manipulations destinées à améliorer le référencement d’un
                site tiers,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                l’aide ou l’incitation, sous quelque forme et de quelque manière
                que ce soit, à un ou plusieurs des actes et activités décrits
                ci-dessus,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                et plus généralement toute pratique détournant les Services à
                des fins autres que celles pour lesquelles ils ont été conçus.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Il est strictement interdit aux Utilisateurs de copier et/ou de
              détourner à leurs fins ou à celles de tiers le concept, les
              technologies ou tout autre élément du site de Make.org.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Sont également strictement interdits : (i) tous comportements de
              nature à interrompre, suspendre, ralentir ou empêcher la
              continuité des Services, (ii) toutes intrusions ou tentatives
              d’intrusions dans les systèmes de Make.org, (iii) tous
              détournements des ressources système du site, (iv) toutes actions
              de nature à imposer une charge disproportionnée sur les
              infrastructures de ce dernier, (v) toutes atteintes aux mesures de
              sécurité et d’authentification, (vi) tous actes de nature à porter
              atteinte aux droits et intérêts financiers, commerciaux ou moraux
              de Make.org ou des usagers de son site, et enfin plus généralement
              (vii) tout manquement aux présentes conditions générales.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Il est strictement interdit de monnayer, vendre ou concéder tout
              ou partie de l’accès aux Services ou au site, ainsi qu’aux
              informations qui y sont hébergées et/ou partagées.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              LIMITATIONS DE GARANTIE DE MAKE.ORG
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Qualité de service
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org ne peut garantir que le Service ne subira aucune
                  interruption. Make.org s’engage à fournir le Service avec
                  diligence et selon les règles de l’art, étant rappelé qu’il ne
                  s’agit que d’une obligation de moyens, ce que les Utilisateurs
                  reconnaissent et acceptent expressément.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org s’engage à procéder régulièrement à des contrôles
                  afin de vérifier le fonctionnement et l’accessibilité du site.
                  A ce titre, Make.org se réserve la faculté d’interrompre
                  momentanément l’accès au site pour des raisons de maintenance.
                  De même, Make.org ne saurait être tenue responsable des
                  difficultés ou impossibilités momentanées d’accès au site qui
                  auraient pour origine des circonstances qui lui sont
                  extérieures, la force majeure, ou encore qui seraient dues à
                  des perturbations des réseaux de télécommunication.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org ne garantit pas aux Utilisateurs (i) que les
                  Services, soumis à une recherche constante pour en améliorer
                  notamment la performance et le progrès, seront totalement
                  exempts d’erreurs, de vices ou défauts, (ii) que les Services,
                  étant standard et nullement proposés à la seule intention d’un
                  Utilisateur donné en fonction de ses propres contraintes
                  personnelles, répondront spécifiquement à ses besoins et
                  attentes.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Contenus
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Bien que les Services fassent l’objet d’une modération,
                  Make.org ne peut être tenu pour responsable des Contenus, dont
                  les auteurs sont des tiers, toute réclamation éventuelle
                  devant être dirigée en premier lieu vers l’auteur des Contenus
                  en question.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les Contenus préjudiciables à un tiers peuvent faire l’objet
                  d’une notification à Make.org selon les modalités prévues par
                  l’article 6 I 5 de la loi n° 2004-575 du 21 juin 2004 pour la
                  confiance dans l’économie numérique, Make.org se réservant de
                  prendre les mesures décrites à l’article 12.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Perte d’informations
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Le service étant fourni à titre gratuit, Make.org décline
                  toute responsabilité en cas de perte éventuelle des
                  informations accessibles dans l’Espace Personnel de
                  l’Utilisateur, celui-ci devant en sauvegarder une copie et ne
                  pouvant prétendre à aucun dédommagement à ce titre.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Dommages
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  En tout état de cause, la responsabilité susceptible d’être
                  encourue par Make.org au titre des présentes est expressément
                  limitée aux seuls dommages directs avérés subis par
                  l’Utilisateur.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PROPRIÉTÉ INTELLECTUELLE
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Propriété de Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org ne revendique aucune propriété sur les Données et les
                  Contenus fournis par les Utilisateurs.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Les systèmes, logiciels, structures, infrastructures, bases de
                  données et contenus de toute nature (textes, images, visuels,
                  musiques, logos, marques, base de données, etc …) exploités
                  par Make.org au sein du site sont protégés par tous droits de
                  propriété intellectuelle ou droits des producteurs de bases de
                  données en vigueur.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Toute reproduction, représentation, publication, transmission
                  ou plus généralement toute exploitation non autorisée de tout
                  ou partie du Service et des informations qui y sont contenues,
                  sans autorisation expresse de Make.org, engagera la
                  responsabilité de l’Utilisateur.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Tous désassemblages, décompilations, décryptages, extractions,
                  réutilisations, copies et plus généralement, tous actes de
                  reproduction, représentation, diffusion et utilisation de l’un
                  quelconque de ces éléments, en tout ou partie, sans
                  l’autorisation de Make.org sont strictement interdits et
                  pourront faire l’objet de poursuites judiciaires.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Propriété des Propositions Citoyennes
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Les Propositions citoyennes elles-mêmes sont la propriété de
                  leurs auteurs lesquels concèdent à Make.org une licence
                  d’exploitation non-exclusive, transférable et gratuite, pour
                  la France et pour l’ensemble du monde, pour tout usage en
                  ligne et pour tout mode de diffusion, pendant la durée des
                  présentes{' '}
                  <abbr lang="fr" title="Conditions générales d'utilisation">
                    CGUS
                  </abbr>{' '}
                  et pour l’ensemble des usages visés par celles-ci.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              LIENS ET SITES TIERS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org ne pourra en aucun cas être tenue pour responsable de la
              disponibilité technique de sites internet ou d’applications
              mobiles exploités par des tiers (y compris ses éventuels
              partenaires) auxquels l’Utilisateur accéderait par l’intermédiaire
              du site.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org n’endosse aucune responsabilité au titre des contenus,
              publicités, produits et/ou services disponibles sur de tels sites
              et applications mobiles tiers dont il est rappelé qu’ils sont
              régis par leurs propres conditions d’utilisation.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org n’est pas non plus responsable des transactions
              intervenues entre l’Utilisateur et un quelconque annonceur,
              professionnel ou commerçant (y compris ses éventuels partenaires)
              vers lequel l’Utilisateur serait orienté par l’intermédiaire du
              site et ne saurait en aucun cas être partie à quelques litiges
              éventuels que ce soit avec ces tiers concernant notamment la
              livraison de produits et/ou services, les garanties, déclarations
              et autres obligations quelconques auxquelles ces tiers sont tenus.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SANCTIONS ET RESILISATION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              En cas de manquement à l’une quelconque des dispositions des
              présentes conditions générales ou plus généralement, d’infraction
              aux lois et règlements en vigueur par un Utilisateur, Make.org se
              réserve le droit de prendre toute mesure appropriée et notamment
              de :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                suspendre ou résilier l’accès aux Services de l’Utilisateur,
                auteur du manquement ou de l’infraction, ou y ayant participé,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                supprimer tout contenu mis en ligne sur le site,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                publier sur le site tout message d’information que Make.org
                jugera utile,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                avertir toute autorité concernée,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                engager toute action judiciaire.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>

            <StaticParagraphStyle>
              De façon générale, en cas de manquement de l’Utilisateur à ses
              obligations prévues aux présentes et/ou en cas de violation de
              toute loi ou règlement applicable, Make.org pourra résilier à son
              encontre les présentes Conditions Générales d’Utilisation de plein
              droit et sans préavis ni formalité préalable.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              La résiliation des présentes Conditions Générales d’Utilisation
              entraînera la fin de l’accès aux Services pour l’Utilisateur
              concerné, ainsi que la suppression de ses données et de ses
              contenus. L’Utilisateur sera informé de ladite résiliation par
              courriel, à l’adresse qu’il a renseignée lors de son inscription.
              La résiliation interviendra sans préjudice des dommages et
              intérêts que pourrait réclamer Make.org en réparation des
              préjudices éventuellement subis du fait des manquements reprochés
              à l’Utilisateur. Make.org pourra refuser par la suite à
              l’Utilisateur la création d’un nouveau compte sur le Service.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              En raison de la gratuité des Services, Make.org pourra supprimer à
              tout moment et sans préavis, pour toute raison, temporairement ou
              définitivement, la publication d’une Proposition Citoyenne.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              De même, en raison de la gratuité des services, Make.org pourra à
              tout moment et sans préavis, pour toute raison, temporairement ou
              définitivement, procéder à la modification ou à la suppression
              partielle ou totale des Services.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              De même, en raison de la gratuité des services, Make.org pourra à
              tout moment et sans préavis, pour toute raison, temporairement ou
              définitivement, procéder à la modification ou à la suppression
              partielle ou totale des Services.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DURÉE DES SERVICES, DÉSINSCRIPTION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les Services sont souscrits pour une durée indéterminée.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’Utilisateur Inscrit peut se désinscrire des Services à tout
              moment, en adressant une demande à cet effet à Make.org par
              courriel à&nbsp;
              <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                {`${CONTACT_EMAIL}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              La désinscription est effective immédiatement. Elle entraîne la
              suppression automatique du Compte de l’Utilisateur Inscrit ainsi
              que de ses Propositions.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              MODIFICATIONS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org se réserve la faculté de modifier à tout moment les
              présentes conditions générales.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’Utilisateur sera informé de ces modifications par tout moyen
              utile.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              L’Utilisateur qui n’accepte pas les conditions générales modifiées
              doit se désinscrire des Services selon les modalités prévues aux
              présentes conditions générales d’utilisation du site.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Tout Utilisateur qui a recours aux Services postérieurement à
              l’entrée en vigueur des conditions générales modifiées est réputé
              avoir accepté ces modifications.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>INTÉGRITÉ</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Si une ou plusieurs stipulations des présentes sont tenues pour
              nulles par une loi ou un règlement, ou déclarées telles par
              décision définitive d’une juridiction compétente, elles seront
              réputées non écrites. Les autres stipulations des présentes
              resteront en vigueur en conservant toute leur force et leur
              portée, pour autant qu’il soit possible, les Parties s’engageant,
              en tant que de besoin, à se rapprocher afin de remplacer la clause
              nulle par une clause valide, aussi proche que possible, dans son
              esprit, de celle qu’elle a vocation à remplacer.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              NON-RENONCIATION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Le fait, pour l’une des Parties, de ne pas se prévaloir à un
              moment donné de l’une des stipulations des présentes ne pourra
              être ni interprété ni considéré comme une renonciation à ses
              droits en vertu des présentes, n’affectera en aucune manière la
              validité de tout ou partie des présentes et ne portera pas
              atteinte aux droits de la Partie concernée d’agir en conséquence.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Aucune Partie ne sera réputée avoir renoncé à un droit acquis aux
              termes du contrat, sauf renonciation écrite et signée.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              FORCE MAJEURE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Tout événement imprévisible, irrésistible et extérieur aux Parties
              tels que (et de manière non limitative) les actes de guerre ou de
              terrorisme, les actes criminels, les émeutes, les catastrophes
              naturelles ou industrielles, les explosions, les réquisitions
              légales et autres dispositions d’ordre législatif ou réglementaire
              apportant des restrictions à l’exercice de l’activité de Make.org,
              les perturbations des réseaux de communications électroniques
              indépendantes de la volonté de Make.org, etc., doit être considéré
              comme un cas de force majeure. En cas de force majeure, Make.org
              peut être amené à suspendre le Service. Les effets du contrat sont
              alors suspendus et pourront reprendre après l’extinction du cas de
              force majeure pour le reste de la durée du contrat. Ils pourront
              également rester éteints.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>LANGUE</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Dans l’hypothèse d’une traduction des présentes conditions
              générales dans une ou plusieurs langues, la langue
              d’interprétation sera la langue française en cas de contradiction
              ou de contestation sur la signification d’un terme ou d’une
              disposition.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              LOI APPLICABLE ET JURIDICTION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les présentes conditions générales sont régies par la loi
              française.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              En cas de contestation sur la validité, l’interprétation et/ou
              l’exécution des présentes conditions générales, les parties
              conviennent que les tribunaux de Paris seront exclusivement
              compétents pour en juger, sauf règles de procédure impératives
              contraires.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ENTRÉE EN VIGUEUR
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Les présentes conditions générales sont entrées en vigueur le{' '}
              {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.P_FORMAT)}.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default TermsOfUseFR; // eslint-disable-line import/no-default-export
