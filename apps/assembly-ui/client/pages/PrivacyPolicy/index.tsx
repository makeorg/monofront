import React, { FC } from 'react';
import { ROUTE_ASSEMBLY_COOKIES } from '../../../utils/routes';
import {
  LegalPagesContainerStyle,
  LegalPagesContentStyle,
  LegalPagesMaintTitleStyle,
  LegalPagesDateStyle,
  LegalPagesSubtitleStyle,
  LegalPagesTableHeaderStyle,
  LegalPagesTableTextStyle,
  LegalPagesNumberTextContainerStyle,
  LegalPagesTextStyle,
  LegalPagesNumberedArticleStyle,
  LegalPagesListStyle,
} from '../../../components/style';

const PrivacyPolicyPage: FC = () => (
  <LegalPagesContainerStyle>
    <LegalPagesContentStyle>
      <LegalPagesMaintTitleStyle>
        Politique de confidentialité
      </LegalPagesMaintTitleStyle>
      <LegalPagesDateStyle>En date du : 19.01.2024</LegalPagesDateStyle>
      <LegalPagesSubtitleStyle>
        1. A propos de cette Politique
      </LegalPagesSubtitleStyle>
      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>1.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Cette Politique de Protection de la vie Privée (la &quot;
          <b>Politique</b>&quot;) décrit comment nous (tel que défini
          ci-dessous) récoltons, partageons et utilisons, toute information qui,
          utilisée seule ou en combinaison avec d&apos;autres informations, se
          rapporte à vous (&quot;<b>Données personnelles</b>&quot;) lorsque vous
          (&quot;<b>vous</b>&quot; et &quot;<b>votre</b>&quot;) utilisez notre
          site Web à l&apos;adresse https://panoramic.make.org/ (&quot;
          <b>Site Web</b>&quot;).
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>1.2</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          La présente Politique énonce également les droits dont vous jouissez
          et qui sont relatifs aux Données personnelles que nous traitons à
          votre sujet, ainsi que la manière dont vous pouvez les exercer.
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>1.3</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          {`MAKE.ORG prend au sérieux ses obligations relatives au respect de la
          vie privée. C'est la raison pour laquelle nous avons développé cette
          Politique décrivant les standards que MAKE.ORG applique afin de
          protéger vos Données personnelles.`}
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>1.4</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Aux fins de la présente Politique, MAKE.ORG (Société par Actions
          Simplifiée), qui a son siège social à 13 rue de la Bucherie à Paris
          (75005), immatriculée au Registre du Commerce et des Sociétés de Paris
          sous le numéro 820 016 095 (&quot;<b>MAKE.ORG</b>&quot;, &quot;
          <b>nous</b>&quot;, &quot;<b>notre</b>&quot;), agit en qualité de
          responsable de traitement des Données personnelles collectées via le
          Site Web. En sa qualité de responsable de traitement, MAKE.ORG est
          responsable de veiller à ce que le traitement des Données personnelles
          soit conforme à la législation sur la protection des données en
          vigueur, et plus particulièrement au Règlement Général sur la
          Protection des Données.
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>1.5</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Veuillez prendre le temps de lire attentivement cette Politique. Si
          vous avez des questions ou commentaires, veuillez contacter{' '}
          <a href="mailto:contact-fr@make.org" style={{ whiteSpace: 'nowrap' }}>
            contact-fr@make.org
          </a>
          .
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesSubtitleStyle>
        2. Quelles Données personnelles sont collectées par MAKE.ORG et pourquoi
        ?
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>2.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Les types de Données personnelles que nous collectons, et les raisons
          pour lesquelles nous les traitons comprennent :
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <table>
        <tr>
          <LegalPagesTableHeaderStyle>
            Pourquoi nous les collectons ?
          </LegalPagesTableHeaderStyle>
          <LegalPagesTableHeaderStyle>
            Types de Données personnelles
          </LegalPagesTableHeaderStyle>
          <LegalPagesTableHeaderStyle>
            Base légale du traitement
          </LegalPagesTableHeaderStyle>
        </tr>
        <tr>
          <LegalPagesTableTextStyle>
            <b>
              Permettre aux citoyens d’accéder aux contenus exposés sur notre
              site Web et d’interroger l’Intelligence Artificielle
            </b>
          </LegalPagesTableTextStyle>
          <LegalPagesTableTextStyle>
            {` Numéro unique d'identification (visitor_id), contenu des questions
            posées via notre site Web`}
          </LegalPagesTableTextStyle>
          <LegalPagesTableTextStyle>
            Intérêt légitime de MAKE.ORG Le cas échéant, votre consentement pour
            les cookies fournis par le biais de la plateforme de gestion des
            consentements.
          </LegalPagesTableTextStyle>
        </tr>
        <tr>
          <LegalPagesTableTextStyle>
            <b>Améliorer et optimiser notre site Web</b>
          </LegalPagesTableTextStyle>
          <LegalPagesTableTextStyle>
            Veuillez consulter les informations que nous fournissons{' '}
            <a href={ROUTE_ASSEMBLY_COOKIES} target="_blank" rel="noreferrer">
              ici
            </a>{' '}
            sur les cookies et notre plateforme de gestion des consentements.
          </LegalPagesTableTextStyle>
          <LegalPagesTableTextStyle>
            Intérêt légitime de MAKE.ORG Le cas échéant, votre consentement pour
            les cookies fournis par le biais de la plateforme de gestion des
            consentements.
          </LegalPagesTableTextStyle>
        </tr>
        <tr>
          <LegalPagesTableTextStyle>
            <b>Répondre à vos questions lorsque vous nous contactez</b>
          </LegalPagesTableTextStyle>
          <LegalPagesTableTextStyle>
            Noms, adresse e-mail, demande de renseignements
          </LegalPagesTableTextStyle>
          <LegalPagesTableTextStyle>
            Notre intérêt légitime à répondre à vos questions et demandes (ou à
            prendre des mesures précontractuelles si nous concluons ensuite un
            contrat)
          </LegalPagesTableTextStyle>
        </tr>
      </table>
      <LegalPagesSubtitleStyle>
        3. Avec qui MAKE.ORG partage vos Données personnelles ?
      </LegalPagesSubtitleStyle>
      <LegalPagesTextStyle>
        Peuvent avoir, dans la limite de leurs fonctions respectives, accès aux
        données à caractère personnel :
      </LegalPagesTextStyle>
      <ul>
        <LegalPagesListStyle>
          {`Les personnes chargées de l'exploitation du service, celles chargées
          du traitement des utilisateurs et des réclamations, les responsables
          des services logistiques et informatiques ainsi que leurs supérieurs
          hiérarchiques ;`}
        </LegalPagesListStyle>
        <LegalPagesListStyle>
          Sous-traitants – dans ce cas un contrat est signé, entre les
          sous-traitants et Make.org, qui détaille les responsabilités des
          sous-traitants en termes de protection de la sécurité et de la
          confidentialité des données ;
        </LegalPagesListStyle>
        <LegalPagesListStyle>
          Les partenaires des campagnes, dont les utilisateurs auront été
          informés de leur participation.
        </LegalPagesListStyle>
        <LegalPagesListStyle>
          {`Les autorités réglementaires, organismes gouvernementaux, les
          tribunaux ou autres tiers compétents si la divulgation est nécessaire
          : (i) en vertu de la loi ou de la réglementation applicable, (ii) pour
          exercer, établir ou défendre nos droits, ou (iii) pour protéger vos
          intérêts vitaux ou ceux d'une autre personne ;`}
        </LegalPagesListStyle>
        <LegalPagesListStyle>
          {`À d'autres personnes autorisées en vertu de votre consentement
          éventuel.`}
        </LegalPagesListStyle>
      </ul>
      <LegalPagesSubtitleStyle>
        4. Comment protégeons-nous votre vie privée{' '}
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>4.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Conformément à cette Politique, nous traiterons les Données
          personnelles comme suit :
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <ol type="a">
        <LegalPagesNumberedArticleStyle>
          <b>Loyauté</b> : Nous traiterons les Données personnelles de manière
          loyale. Cela signifie que nous sommes transparents sur la façon dont
          nous traitons les Données personnelles et que nous les traiterons
          conformément au droit applicable.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          <b>Licéité</b> : Nous traiterons les données personnelles que pour des
          motifs légitimes.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          <b>Limitation de la finalité</b> : Nous traiterons les Données
          personnelles pour des finalités déterminées et licites, et nous ne les
          traiterons pas d&apos;une manière incompatible avec ces finalités.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          <b>Minimisation des données</b> : Nous traiterons les Données
          personnelles qui sont adéquates, pertinentes et limitées à ce qui est
          nécessaire pour atteindre les objectifs pour lesquels les données sont
          traitées.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          <b>Exactitude des données </b>: Nous prenons les mesures appropriées
          pour nous assurer que les Données personnelles que nous détenons sont
          exactes, complètes et, si nécessaire, tenues à jour. Cependant, il est
          également de votre responsabilité de veiller à ce que vos Données
          Personnelles soient aussi précises, complètes et à jour que possible
          en informant MAKE.ORG rapidement de tout changement ou erreur.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          <b>Sécurité des données</b> : Nous utilisons des mesures techniques et
          organisationnelles appropriées pour protéger les Données personnelles
          que nous collectons et traitons à votre sujet. Les mesures que nous
          utilisons sont conçues pour offrir un niveau de sécurité adapté au
          risque de traitement de vos Données personnelles. [Nous avons
          notamment recours aux mesures de sécurité suivantes [donnez des
          exemples –par ex. le cryptage des Données personnelles]]
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          <b>Conservation limitée</b> : Nous conservons vos Données Personnelles
          sous une forme qui nous permet de vous identifier aussi longtemps que
          nécessaire pour atteindre les objectifs pour lesquels nous traitons
          vos données et ne stockons pas vos données plus longtemps, sauf si la
          loi l&apos;exige.
        </LegalPagesNumberedArticleStyle>
      </ol>
      <LegalPagesSubtitleStyle>
        5. Stockage, conservation et suppression des données
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>5.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Les données personnelles que nous recueillons auprès de vous sont
          stockées sur nos serveurs situés à France.
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>5.2</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Nous conservons les Données personnelles que nous collectons auprès de
          vous aussi longtemps que nous en avons un besoin commercial légitime
          (par exemple afin de vous fournir un service que vous avez demandé ou
          pour nous conformer aux exigences légales, fiscales ou comptables
          applicables).
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>5.3</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          {`Lorsque nous n'avons plus de besoin commercial légitime pour traiter
          vos Données personnelles, nous les supprimons ou les rendons anonymes,
          ou si ce n'est pas possible (par exemple, lorsque vos Données
          personnelles ont été stockées dans des archives de sauvegarde), nous
          les stockons en toute sécurité et les isolons de tout autre traitement
          jusqu'à ce que la surpression soit possible.`}
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesSubtitleStyle>
        6. Transferts internationaux de données :
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>6.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Nous transférons les données personnelles récoltées à OpenIA dans le
          cadre de l’utilisation des services exposés sur Panoramic.ai.
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>6.2</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Plus précisément, nos serveurs sont situés en France, et les
          fournisseurs de service et partenaires tiers opèrent hors Union
          Européenne. Cela signifie que lorsque nous collectons vos Données
          personnelles, nous pouvons les traiter en dehors de l’Union
          Européenne.
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>6.3</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          {`Cependant, nous avons pris des mesures de protection appropriées pour
          exiger que vos Données personnelles restent protégées conformément à
          cette Politique. Elles incluent la mise en œuvre d'accords de
          transfert de données fondés sur les Clauses Contractuelles Types de la
          Commission Européenne.`}
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesSubtitleStyle>
        7. Vos droits à la protection des données
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>7.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Vous disposez des droits à la protection des données suivants :
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <ol type="a">
        <LegalPagesNumberedArticleStyle>
          Si vous souhaitez{' '}
          <b>accéder, corriger, mettre à jour ou demander la suppression</b> de
          vos Données personnelles, vous pouvez le faire à tout moment en nous
          contactant via :{' '}
          <a href="mailto:contact-fr@make.org" style={{ whiteSpace: 'nowrap' }}>
            contact-fr@make.org
          </a>
          .
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          En outre, dans certaines circonstances, vous pouvez
          <b> vous opposer au traitement</b> de vos Données personnelles, nous
          demander de <b>limiter le traitement</b> de vos Données personnelles,
          ou <b>demander la portabilité</b> de vos Données personnelles. A
          nouveau, vous pouvez exercer ces droits en nous contactant via :{' '}
          <a href="mailto:contact-fr@make.org" style={{ whiteSpace: 'nowrap' }}>
            contact-fr@make.org
          </a>
          .
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          Si nous avons collecté et traité vos Données personnelles avec votre
          consentement, vous pouvez <b>retirer votre consentement</b> à tout
          moment. Le retrait de votre consentement n&apos;affectera pas la
          légalité de tout traitement que nous avons effectué avant ce retrait
          et n&apos;affectera pas le traitement de vos Données personnelles
          effectué sur la base de fondements légaux autres que le consentement.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          Si vous avez une plainte ou une préoccupation concernant la façon dont
          nous traitons vos Données personnelles, nous nous efforcerons de
          répondre à ces préoccupations. Si vous estimez que nous n&apos;avons
          pas suffisamment pris en compte votre plainte ou préoccupation, vous
          avez le{' '}
          <b>
            droit de vous plaindre auprès d&apos;une autorité de protection des
            données
          </b>{' '}
          à propos de la collecte et de l&apos;utilisation que nous faisons de
          vos Données personnelles.
        </LegalPagesNumberedArticleStyle>
        <LegalPagesNumberedArticleStyle>
          {`Vous avez le droit de définir des directives générales ou
          particulières relatives à l'utilisation et à la communication de vos
          données à caractère personnel après votre décès, conformément à la loi
          Informatique et Libertés.`}
        </LegalPagesNumberedArticleStyle>
      </ol>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>7.2</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          Nous répondons à toutes les demandes que nous recevons de personnes
          souhaitant exercer les droits relatifs à la protection de leurs
          données personnelles conformément au droit applicable en matière de
          protection des données.
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesSubtitleStyle>
        {`  8. Liens vers d'autres sites`}
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>8.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          {`       Le Site Web peut contenir des hyperliens vers des sites Web détenus et
          exploités par des tiers. Ces sites Web ont leurs propres politiques de
          confidentialité et nous vous invitons à les examiner. Ils régiront
          l'utilisation des Données personnelles que vous soumettez en visitant
          ces sites Web.`}
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesTextStyle>
        Nous déclinons toute responsabilité pour les pratiques de
        confidentialité de ces sites tiers et votre utilisation de ces sites Web
        est à vos risques et périls.
      </LegalPagesTextStyle>
      <LegalPagesSubtitleStyle>
        9. Mise à jour de la présente Politique
      </LegalPagesSubtitleStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>9.1</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          {`        Nous pouvons mettre à jour cette Politique de temps à autre en réponse
          à l'évolution des développements juridiques, techniques ou
          commerciaux. Lorsque nous mettrons à jour notre Politique, nous
          prendrons les mesures appropriées pour vous en informer, compte tenu
          de l'importance des changements que nous apporterons. Nous obtiendrons
          votre consentement à tout changement important apporté à cette
          Politique si cela est requis par le droit sur la protection des
          données applicable.`}
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesNumberTextContainerStyle>
        <LegalPagesTextStyle>9.2</LegalPagesTextStyle>
        <LegalPagesTextStyle>
          {`         Vous pouvez voir la date de dernière mise à jour de cette Politique en
          vous reportant à la date de la "dernière mise à jour" affichée en haut
          de cette Politique.`}
        </LegalPagesTextStyle>
      </LegalPagesNumberTextContainerStyle>

      <LegalPagesSubtitleStyle>
        10. Comment nous contacter ?
      </LegalPagesSubtitleStyle>
      <LegalPagesTextStyle>
        Le délégué à la protection des données désigné conformément à l’article
        37 du Règlement européen sur la protection des données est Fieldfisher
        Belgium,{' '}
        <a href="mailto:contact-be@make.org" style={{ whiteSpace: 'nowrap' }}>
          contact-be@make.org
        </a>
        , l’Arsenal, Bd Louis Schmidt 29 boîte 15, 1040 Bruxelles, Belgique.
      </LegalPagesTextStyle>
    </LegalPagesContentStyle>
  </LegalPagesContainerStyle>
);

// default export needed for loadable component
export default PrivacyPolicyPage; // eslint-disable-line import/no-default-export
