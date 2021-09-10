import React, { FC } from 'react';
import {
  CNIL_NUMBER,
  CONTACT_EMAIL,
  PRIVACY_POLICY_DATE,
} from '@make.org/utils/constants/config';
import { MetaTags } from '@make.org/components/MetaTags';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
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
} from '../style';

export const DataEN: FC = () => (
  <>
    <MetaTags
      title={i18n.t('meta.privacy_policy.title')}
      description={i18n.t('meta.privacy_policy.description')}
    />
    <StaticPageWrapperStyle>
      <StaticSecondLevelTitleStyle>
        Privacy policy
        <StaticTitleExtra>
          - Dated{' '}
          {DateHelper.localizedAndFormattedDate(
            PRIVACY_POLICY_DATE,
            DATE.PPP_FORMAT
          )}{' '}
          -
        </StaticTitleExtra>
      </StaticSecondLevelTitleStyle>
      <StaticParagraphStyle>
        <>
          The present document supplements MAKE.ORG’s Terms of Service and
          concerns Make.org’s commitments relative to the respect of the
          regulations in force concerning the processing of personal data and,
          in particular, Regulation (
        </>
        <abbr title="European Union">EU</abbr>
        <>
          )&nbsp;2016/679 of the European Parliament and of the Council of 27
          April 2016 and applicable as of 25 May 2018 (hereinafter “the GDPR”).
        </>
      </StaticParagraphStyle>
      <StaticParagraphStyle>
        In this framework, Make.org will be the data controller.
      </StaticParagraphStyle>
      <StaticPrimaryUnorderedListStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            DESCRIPTION OF PROCESSING
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            Make.org is particularly sensitive to the protection of personal
            data in general and of its users’ personal data in particular. For
            Make.org, this is one of the fundamental digital values and an
            essential condition for the freedom of conscience. To this end,
            Make.org is committed to limiting the quantity of personal data
            collected to that which is strictly necessary for the functioning of
            its site and its services.
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            {`Make.org has filed a declaration with the CNIL under number
            ${CNIL_NUMBER} and has chosen to name a DPO in order to guarantee the
            best level of protection possible.`}
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            Make.org will only process personal data that is strictly necessary
            to carry out its activities.
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            It will do so for the following purposes: &nbsp;
          </StaticParagraphStyle>
          <StaticSquareListStyle>
            <StaticSquareListItemStyle>
              the use and improvement of Make.org’s site and services;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              the implementation of Make.org’s campaigns.
            </StaticSquareListItemStyle>
          </StaticSquareListStyle>
          <StaticParagraphStyle>
            The personal data processed consists of: &nbsp;
          </StaticParagraphStyle>
          <StaticSquareListStyle>
            <StaticSquareListItemStyle>
              elements of identification;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              contact information;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              data necessary for the use of Make.org’s site and services as well
              as for the implementations of campaigns.
            </StaticSquareListItemStyle>
          </StaticSquareListStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            OBLIGATIONS OF MAKE.ORG
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>Make.org commits to :</StaticParagraphStyle>
          <StaticSquareListStyle>
            <StaticSquareListItemStyle>
              processing data solely for the objective of its activity ;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              guaranteeing the confidentiality of personal data ;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              ensuring that third parties authorised to process personal data :
              <StaticSquareListStyle>
                <StaticSquareListItemStyle>
                  ‍ are committed to respecting confidentiality or have an
                  appropriate legal obligation to respect confidentiality;
                </StaticSquareListItemStyle>
                <StaticSquareListItemStyle>
                  have the necessary training as concerns the protection of
                  personal data ;
                </StaticSquareListItemStyle>
                <StaticSquareListItemStyle>
                  take into account the principles of Privacy by Design, whether
                  in terms of tools, products, applications or services.
                </StaticSquareListItemStyle>
              </StaticSquareListStyle>
            </StaticSquareListItemStyle>
          </StaticSquareListStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            DATA RECIPIENTS
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            The following may, within the limits of their respective functions,
            have access to personal data:
          </StaticParagraphStyle>
          <StaticSquareListStyle>
            <StaticSquareListItemStyle>
              people responsible for operating the service, those with the
              responsibility of dealing with users and complaints, those
              responsible for logistical and IT services as well as their
              superiors ;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              data processors – once a contract is signed between data
              processors and Make.org that details the responsibilities of data
              processors in terms of the protection of the security and
              confidentiality of data ;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              the partners for campaigns, about which users will have been
              informed of their participation.
            </StaticSquareListItemStyle>
          </StaticSquareListStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            COMMUNICATION TO THIRD PARTIES
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            Personal data processed in connection with Make.org’s activity
            cannot be divulged to third parties, except for the cases allowed
            for above or by legal or regulatory provisions.
          </StaticParagraphStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>COOKIES </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            In order for the User to not have to sign in each time he/she
            accesses the Service, apart from the first time accessing it,
            Make.org uses session cookies. These files are stored on the
            computer and make it possible to identify the User each time he/she
            connects to the Site. Moreover, in order to improve the Service,
            Make.org uses audience measurement cookies that provide measurements
            such as the number of page views, the number of visits, the activity
            of visitors on the Site and how often they return.
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            These cookies only enable the improvement of the site’s functioning
            and services as well as the establishing of statistical studies on
            the traffic of visitors to the Site, the results of which are
            completely anonymous.
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            Generally speaking, any User can, should he/she so desire, refuse
            the use of cookies by selecting the appropriate settings on his/her
            browser to disable cookies (the browser&apos;s help menu will
            specify the steps to take).
          </StaticParagraphStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            EXERCISE OF USER RIGHTS
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            Make.org implements all user rights, such as: the right of access,
            rectification, deletion and objection, the right to restriction of
            processing, the right to data portability, the right not to be
            subject to automated decision-making (including profiling).
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            These rights can be exercised by any means, and notably by sending
            an e-mail to the following address :&nbsp;
            <RedHTMLLinkElementStyle as="a" href={`mailto:${CONTACT_EMAIL}`}>
              {`${CONTACT_EMAIL}`}
            </RedHTMLLinkElementStyle>
          </StaticParagraphStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            SECURITY AND CONFIDENTIALITY OF PROCESSING
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            Make.org will take all necessary measures to preserve and ensure the
            respect of the integrity and confidentiality of personal data.
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            Make.org is committed notably to implementing technical and
            organisational measures making it possible to ensure, to the extent
            that is possible, a level of appropriate security and
            confidentiality with respect to the risks associated with processing
            and the nature of personal data.
          </StaticParagraphStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            DATA RETENTION
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>Data is retained:</StaticParagraphStyle>
          <StaticSquareListStyle>
            <StaticSquareListItemStyle>
              for as long as is necessary for the implementation of the campaign
              ;
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              for a duration of three years following the end of the use of the
              site or services, or from the de-registration of the user.
            </StaticSquareListItemStyle>
            <StaticSquareListItemStyle>
              Data will not be retained any longer than is legally required if
              the user so requests.
            </StaticSquareListItemStyle>
          </StaticSquareListStyle>
        </StaticPrimaryUnorderedListItemStyle>
        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            DATA PROTECTION OFFICER
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            The data protection officer designated pursuant to Article 37 of the
            European Data Protection Regulation is the law firm FWPA, located at
            18 Rue des Pyramides, 75001, Paris, represented by Jean-Baptiste
            Soufron.
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            The DPO can be contacted at the following address:&nbsp;
            <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
              {`${CONTACT_EMAIL}`}
            </RedHTMLLinkElementStyle>
          </StaticParagraphStyle>
        </StaticPrimaryUnorderedListItemStyle>

        <StaticPrimaryUnorderedListItemStyle>
          <StaticThirdLevelTitleStyle>
            RECORDS OF PROCESSING ACTIVITIES
          </StaticThirdLevelTitleStyle>
          <StaticParagraphStyle>
            Make.org affirms that it maintains written records of all processing
            activities carried out in the framework of the performance of its
            activities.
          </StaticParagraphStyle>
        </StaticPrimaryUnorderedListItemStyle>
      </StaticPrimaryUnorderedListStyle>
    </StaticPageWrapperStyle>
  </>
);

// default export needed for loadable component
export default DataEN; // eslint-disable-line import/no-default-export
