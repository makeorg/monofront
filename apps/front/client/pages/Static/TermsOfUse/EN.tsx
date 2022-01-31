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
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
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

export const TermsOfUseEN: FC = () => {
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
          <>MAKE.ORG terms of service</>
          <StaticTitleExtra>
            - dated{' '}
            {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.PPP_FORMAT)} -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org is an organisation that is independent from any party. It
          publishes an internet site and makes services available to the public.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          To do so, it allows Users to make Proposals on the site. Other Users
          who so choose can then vote on or comment on these Proposals to
          support them, the goal being to create conversations in society on
          questions of general interest, especially on economic, social, civic
          and citizenship issues. The ideas that emerge can then be taken up by
          Make.org’s partners, who will help in making them more concrete and in
          making them a reality.
        </StaticParagraphStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PURPOSE OF THE SERVICE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The present terms of service have as their goal to define the
              terms and conditions of use of the services proposed on Make.org
              (hereinafter the “Services”), as well as to define the rights and
              obligations of the parties in this context.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              They can be accessed and printed at any time by means of a link
              featuring at the bottom of the site’s home page.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              They may be supplemented, if need be, by terms of service specific
              to certain Services, or by terms of service specific to certain
              users. In the event of a contradiction, the specific terms of
              service will prevail over the general terms of service.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              OPERATOR OF THE SITE AND THE SERVICES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The Site and the Services (or collectively “the Services”) are
              operated by the company Make.org, a simplified joint stock company
              with a capital of {MAKE_CAPITAL}, with its headquarters at{' '}
              {MAKE_ADDRESS} FRANCE, registered at the Trade and Companies
              Register (RCS) of Paris under number {MAKE_RCS} (hereinafter
              “Make.org”).
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The fight against the diffusion of false information on the
              Internet has become a major issue for civil society, the media,
              government authorities and, above all, the citizens who are
              subjected to it. We are very anxious to ensure the truth of
              information posted on our website and in both these{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              and our{' '}
              <RedHTMLLinkElementStyle
                href={getModerationLinkByLanguage(language)}
                target="_blank"
                rel="noopener"
              >
                Moderation Charter
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>{' '}
              we set out the measures we adopt to this end.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ACCESSING THE SITE AND SERVICES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Access to the site and services is free of charge.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              It is open, subject to restrictions provided on the site:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                to any natural person who has full legal capacity to commit to
                these general terms of service. Any natural person who does not
                have full legal capacity can only access the Site and Services
                with the consent of his/her legal representative;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to any minor with the authorisation of his/her legal guardians
                and under their supervision;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to any legal person acting through a natural person who has the
                legal capacity to contract in the name of and on behalf of the
                legal person.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ACCEPTANCE OF THE GENERAL TERMS OF SERVICE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The present General Terms of Service (hereinafter{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              ) have as their goal to define the means by which the User may
              access and use the Services. They constitute a contract between
              Make.org and the Users of the Service. They invalidate and replace
              all prior provisions and constitute the totality of all of the
              rights and obligations of the parties. The{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              are communicated to each User, who is responsible for being aware
              of them.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The use of the Service implies the full and unreserved acceptance
              of the present{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              . Non-acceptance thus implies an absence of any right to use the
              Service.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The use of the Service also implies the full and unreserved
              acceptance of Make.org’s Data usage policy, which is an integral
              part of these{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              and which is available{' '}
              <RedHTMLLinkElementStyle
                href={getDataPageLink(country, language)}
                target="_blank"
                rel="noopener"
              >
                here
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>{' '}
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The present{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              can be modified at any time and without advance notice by
              Make.org. Any modification shall take immediate effect as of the
              publication of the new version of the{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              on the Site. The User is thus asked to regularly consult the
              latest version of the{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>{' '}
              on the site. Otherwise, the User will be deemed to have
              unreservedly accepted the new version of the General Terms of Use.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              USE OF THE SITE
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Access to the site
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The site is open to the public and all Users can visit it and
                  vote on the Proposals.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Registered users
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  All users may vote on the site, but only registered Users may
                  make citizen Proposals. To this end, those who would like to
                  make Proposals can register on the site by completing the form
                  provided for that purpose. They must then provide all the
                  information marked as mandatory. Any incomplete registration
                  will not be validated.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Users registered on the site are specifically defined as
                  “Registered Users”.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registered Users guarantee that all information provided on
                  the form is exact, up to date, sincere and not misleading.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The Registered User commits to updating his/her information in
                  his/her Personal Space by contacting Make.org by e-mail
                  at&nbsp;
                  <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                    {`${CONTACT_EMAIL}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The Registered User is informed and accepts that the
                  information he/she enters when creating or updating his/her
                  Account acts as proof of his/her identity. The information
                  entered by the User is binding for the User as soon as it is
                  validated.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Account and Personal Space
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registration automatically entails the opening of an account
                  (hereinafter the “Account”), which gives access to a personal
                  space (hereinafter the “Personal Space”) that makes it
                  possible to manage the use of the Services in such a way and
                  according to the technical means that Make.org judges to be
                  the most appropriate, and which are subject to change over
                  time.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registered Users can access their Personal Space at any moment
                  after signing in with their username and password.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registered Users commit to using the Services solely for their
                  own personal use and shall not allow any third party to use
                  them in their place or on their behalf, without assuming full
                  responsibility for such use.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registered Users are similarly responsible for ensuring that
                  their username and password remain private. They are to
                  immediately contact Make.org if they notice that their Account
                  has been used without their knowledge. They recognise that
                  Make.org has the right to take all appropriate measures in
                  such cases.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Truthfulness of information supplied and identify fraud
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Users attest to the truthfulness and accuracy of the
                  information transmitted by means of the Services, said
                  information being prohibited from being deceitful, dishonest,
                  incorrect or misleading.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org recalls that Article 226-4-1 of the Criminal Code
                  specifies: “The act of impersonating a third party or making
                  use of data of any kind to identify a person in order to
                  disturb their tranquillity or that of others, or prejudice
                  their honour or consideration, is punishable by one year’s
                  imprisonment and a fine of €15,000.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  This offence is punishable by the same penalties when
                  committed on a public communication network online”.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Any User suspected of identity fraud or attempted identity
                  fraud may see their access to the Service suspended or
                  forbidden, without prejudice to any possible damages or
                  interest that Make.org may claim.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DESCRIPTION OF THE SERVICES
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Citizen Proposals
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The platform offers Users the chance to vote on citizen
                  Proposals that have been proposed by other Users.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The citizen proposals filed with Make.org each have an equal
                  chance of being transformed into actions.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  It’s through his or her vote that the user can enable a
                  proposal to become a citizen Action that Make.org commits
                  itself to furthering.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org then conceives of its role as being an intermediary
                  between the citizen proposals and its partners in action. (
                  <RedHTMLLinkElementStyle href="#anchor_partners">
                    See 6.8 Partners in Action
                  </RedHTMLLinkElementStyle>
                  )
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Formulating a Citizen Proposal
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registered Users can voice their own Citizen Proposals, which
                  are intended to be published, commented on, analysed and
                  debated, and which will be submitted to the votes of Users.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Form and content of Citizen Proposals
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Each Citizen Proposal shall begin with “We should” and contain
                  a maximum of 140 characters. The Citizen Proposal should be
                  readable and written in English, and in such a way that it can
                  be understood by all, and without any abbreviations or an
                  excessive use of capital letters.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The proposal must not contain any elements that are contrary
                  to the law or public morals or whose terms would contravene
                  the provisions of these General Terms of Service.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Moderation and publication of Citizen Proposals
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The publication of a User’s Citizen Proposal is subject to
                  moderation in the conditions defined by the present{' '}
                  <abbr lang="en" title="General Terms of service">
                    GTS
                  </abbr>
                  . Therequest for publication of a Citizen Proposal will be
                  processed as quickly as possible by Make.org’s teams, with the
                  aim of responding in under 48 hours.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org’s moderation team examines each Citizen Proposal
                  before publishing it online. As a result, Users should take
                  care not to submit a Citizen Proposal more than once or to
                  submit a Citizen Proposal that already exists. Users must also
                  not spam the Service by proposing the same Solutions from
                  different e-mail addresses. One User is allowed to submit a
                  maximum of 100 solutions for each consultation during 30
                  rolling days, in order to give enough space for every User to
                  express themselves. Beyond this threshold, new solutions won’t
                  be moderated by our team, the User will be notified by email
                  and we will guide him in his correct use of the platform.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Once a User’s Citizen Proposal has been validated, it will be
                  published on the Service and a publication notification will
                  be sent to its author.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  In the event that a User’s Citizen Proposal is rejected, an
                  e-mail will be sent to the User notifying him/her of said
                  rejection. The User will then be free to submit a new Citizen
                  Proposal.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Once published on the Service, it will be highlighted on the
                  Services, without Make.org, however, making any guarantees as
                  to the frequency with which it appears or the number of people
                  who see it.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org commits to not arbitrarily altering authorised
                  content that respects the moderation rules in force, apart
                  from making any necessary spelling corrections.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Request for the deletion of a Citizen Proposal by a Registered
                  User
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  In the event that a Registered User would like his or her
                  published Citizen Proposal to be deleted, he/she should make a
                  request to Make.org via e-mail at the following address:
                  &nbsp;
                  <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                    {`${CONTACT_EMAIL}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org will process the User’s deletion request within a
                  reasonable time frame.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Voting on a Citizen Proposal
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  All Users can make their voices heard by means of voting on
                  the citizen proposals presented on the Site, without having to
                  create an account, by clicking on the “Agree”, “Disagree” or
                  “Blank Vote” buttons.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Use of Citizen Proposals
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Use for statistical purposes :&nbsp;
                  </StaticStrongStyle>
                  Make.org may use Citizen Proposals, aggregated or not and
                  expunged of all personal data, including compilations and
                  syntheses, for statistical purposes, for the purposes of
                  studies or for any other purpose.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>Use for debates :&nbsp;</StaticStrongStyle>
                  Citizen Proposals published on the Service could be selected
                  by Make.org in order to be analysed, commented on and/or
                  debated on the occasion of public debates organised by
                  Make.org or its partners.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Use for the purposes of reports and studies :&nbsp;
                  </StaticStrongStyle>
                  Citizen Proposals published on the Service, as well as the
                  votes attributed to them, could be selected by Make.org with
                  the aim of carrying out, in particular, analyses, reports and
                  studies for statistical and research purposes or for the
                  creation of reform projects.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Publication of white papers :&nbsp;
                  </StaticStrongStyle>
                  Make.org may publish or co-publish white papers for
                  non-commercial purposes that make use of, in whole or in part,
                  Citizen Proposals.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Publication of white papers :&nbsp;
                  </StaticStrongStyle>
                  Make.org may publish or co-publish white papers for
                  non-commercial purposes that make use of, in whole or in part,
                  Citizen Proposals.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>Editorial use :&nbsp;</StaticStrongStyle>
                  Citizen Proposals, and the votes attributed to them, could
                  moreover be used, commented on and analysed by Make.org and/or
                  partner journalists in the creation of editorial content.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Use for communication purposes :&nbsp;
                  </StaticStrongStyle>
                  Citizen Proposals could also be used by Make.org on the Site
                  and be used for display purposes on advertising spaces
                  operated by Make.org’s partners. In such a case, the use of a
                  Citizen Proposal on said advertising spaces will lead to the
                  Proposal being published anonymously, whether the Proposal had
                  been published anonymously on the Site or with the User’s
                  first name, age and region, if the User had included such
                  information.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Making Citizen Proposals a Reality :&nbsp;
                  </StaticStrongStyle>
                  Finally, proposals may be transformed into concrete action,
                  either directly by Users, or by means of Make.org’s partners
                  in action, with the Users behind such Proposals and those who
                  voted for them understanding this and expressly agreeing to
                  it.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle
                id="anchor_partners"
                className="section6"
              >
                <StaticFourthLevelTitleStyle>
                  Partners in Action
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org will mobilise civil society actors (companies,
                  institutions, NGOs) to take up the cause of the proposals that
                  received the most support on the platform and to make them a
                  reality.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  At any moment, and without Make.org making any request, these
                  partners in action may take any proposal present in the
                  “Actions Space” and attempt to put it into action directly.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org conceives of its role as being an intermediary
                  between the citizen proposals and its partners in action.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org engages to then ensure that the proposals are put
                  into action effectively and that they receive appropriate
                  media exposure.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle> PROOF </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The User recognises and expressly accepts:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                that the data collected on the Make.org site and its IT
                equipment reflects the reality of the operations carried out
                within the framework of this campaign;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                ‍that this data is the only mode of proof recognised by the
                parties.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              OBLIGATIONS OF THE USER
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Without prejudice to the other obligations provided for herein,
              the User commits to complying with the following obligations:
            </StaticParagraphStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Compliance with laws and regulations
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The User commits, in his/her use of the Services, to comply
                  with the laws and regulations in force and not to infringe
                  upon the rights of third parties or act in a way that is
                  contrary to public order. The User alone is responsible for
                  carrying out any necessary formalities, particularly
                  administrative, fiscal and/or social, and of making all
                  payments of contributions and taxes of any kind that he/she
                  may be responsible for, as the case may be, in connection with
                  the use of the Services. Make.org shall not in any way be held
                  liable in such circumstances.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Use of the Site and the Services
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The User acknowledges that he/she is aware of the
                  characteristics and constraints, notably technical, of all of
                  the Services. The User alone is responsible for his/her use of
                  the Services.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User is informed and accepts that using the Services
                  requires an internet connection and that the quality of the
                  Services depends directly on this connection, for which he/she
                  is solely responsible.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User pledges not to publish any proposals of a promotional
                  nature or to promote services for commercial gain. The User
                  pledges not to publish proposals that are not serious or that
                  are off topic. The User pledges to make strictly personal use
                  of the Services. It is therefore forbidden to cede, grant or
                  transfer all or part of his/her rights or obligations as
                  discussed herein to any third party in any way whatsoever.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User pledges not to publish any proposals that promote or
                  denigrate any parties, organisations or public figures.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User is also solely responsible for any relationships
                  he/she may form with other Users and for any information that
                  he/she may communicate to them within the framework of the
                  Services. It is incumbent upon the User to exercise
                  appropriate caution and discernment in these relationships and
                  communications. The User moreover pledges, in his/her
                  conversations with other Users, to respect the standard norms
                  of politeness and courtesy.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User pledges not to make any remarks or proposals that are
                  contrary to the law or public morals and particularly, without
                  this list being exhaustive:
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    remarks that incite racial hatred, or remarks that are, for
                    example, anti-Semitic, xenophobic, homophobic;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks of a violent, pornographic or paedophiliac nature;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that are insulting, denigrating, defamatory, or
                    which infringe on the personality rights of third parties;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that deny recognised genocides and crimes against
                    humanity or that defend crimes;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that incite others to commit illegal acts, such as
                    incitation to commit violent acts, terrorist acts or the
                    sale of narcotics;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that breach the privacy rights or intellectual
                    property rights of third parties;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that breach the presumption of innocence or that
                    violate judicial confidentiality;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that are offensive to human dignity ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    remarks that could be construed as an abuse of freedom of
                    expression.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Relationship with Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The User pledges to supply Make.org with all the information
                  necessary to properly carry out the Services. More generally,
                  the User pledges to actively cooperate with Make.org with the
                  aim of properly carrying out the Services.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User accepts that Make.org, as provider of the Service,
                  will reproduce the User’s proposals according to Make.org’s
                  standards of indexing, layout and emphasis.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              GUARANTEES MADE BY THE USER
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Content
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The User is solely responsible for all content (editorial,
                  visual, audiovisual or otherwise, including the name and/or
                  image the User chooses to identify himself/herself on the
                  site) that he/she disseminates within the framework of the
                  Services (hereinafter designated as the “Content”).
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User guarantees to Make.org that he/she possesses all the
                  necessary rights and authorisations required to disseminate
                  this Content.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User pledges that said content is lawful, not contrary to
                  public order, public morals or third party rights, does not
                  violate any statutory or regulatory provisions, and, more
                  generally, would not result in the civil or criminal liability
                  of Make.org.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User will therefore restrain from disseminating (and
                  without this being an exhaustive list):
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    Content that is pornographic, obscene, indecent, shocking or
                    not family friendly, defamatory, insulting, violent, racist,
                    xenophobic or that denies the existence of genocides;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Content that infringes on copyright;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Content that is prejudicial to the image of a third party;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Content that is knowingly false, deceitful or that proposes
                    or promotes illegal, fraudulent or deceitful activities;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Content that can damage a third party’s IT systems (such as
                    viruses, worms, Trojan horses, etc.);
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    and more generally, any Content that could infringe upon the
                    rights of third parties or be prejudicial to third parties,
                    in any manner whatsoever and in any form whatsoever.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Limits to use of the Services
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The User acknowledges that the Services offer him/her a
                  supplemental but not alternative solution to the means he/she
                  makes use of already to achieve the same objective and that
                  this solution is not a substitute for these other means.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User should take all necessary measures to protect, by
                  his/her own means, the information on his/her Personal Space
                  that he/she deems in need of protection.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User is informed and accepts that using the Services
                  requires an internet connection and that the quality of the
                  Services depends directly on this connection, for which he/she
                  is solely responsible.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Claims and compensation
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The User shall hold Make.org harmless against any complaints,
                  claims, lawsuits and demands of any kind that Make.org may
                  face in the event that the User violates any of his/her
                  obligations or guarantees in these present terms of service.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The User pledges to indemnify Make.org from any loss it may
                  suffer and to pay any fees, charges and/or fines that it may
                  have to bear as a result.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PROHIBITED BEHAVIOUR
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              It is strictly forbidden to use the Services for the following
              ends:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                to carry out activities that are illegal, fraudulent or that
                infringe upon the rights or security of third parties;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to disrupt public order or violate existing laws and
                regulations;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to hack into a third party’s IT system or any other activity
                that is capable of damaging, controlling, interfering with or
                intercepting all or part of a third party’s IT system, and of
                violating the integrity or security of said system;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to send unsolicited e-mails and/or to canvass for business;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to attempt to carry out manipulations designed to improve the
                search engine performance of a third party site;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                to aid or incite someone, in any form and in any manner
                whatsoever, to one or more of the acts and activities described
                above;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                and more generally, to attempt any act that would divert the
                Services to ends other than those for which they were conceived.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              It is strictly forbidden for Users to copy and/or divert for their
              own purposes or those of a third party the concept, technologies
              or any other element of the Make.org site.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The following are also strictly forbidden: (i) any behaviour
              capable of interrupting, suspending, slowing down or preventing
              the continuity of the Services, (ii) any hacking or attempted
              hacking into the systems of Make.org, (iii) any misuse of the
              site’s system resources, (iv) any actions that are liable to
              disproportionately burden the site’s infrastructure, (v) any
              attacks on security and authentication measures, (vi) any acts
              liable to infringe the financial, commercial or moral rights and
              interests of Make.org or of the site’s users, and finally, more
              generally, (vii) any failure to uphold these present terms of
              service.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              It is strictly forbidden to make money from, sell or concede, in
              whole or in part, access to the Services or to the site, as well
              as the information hosted and/or shared there.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              MAKE.ORG’S GUARANTEE LIMITATIONS
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Quality of service
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org cannot guarantee that the Service will not be subject
                  to interruption. Make.org pledges to provide the Service with
                  conscientiousness and according to best practice, expressly
                  recalling that this is only a best-effort obligation, which
                  Users expressly acknowledge and accept.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org pledges to regularly carry out checks to verify the
                  functioning and accessibility of the site. To this end,
                  Make.org reserves the right to temporarily interrupt access to
                  the site for maintenance purposes. Similarly, Make.org shall
                  not be held responsible for any temporary difficulties or
                  impossibility in accessing the site, which could be due to
                  external circumstances, force majeure, or problems with
                  telecommunications networks.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org does not guarantee to Users (i) that the Services,
                  which are subject to continuous research with the aim of
                  improving their performance and progress, will be completely
                  free from errors, faults or flaws, (ii) that the Services,
                  being standard and not all meant for any given User based on
                  his/her personal constraints, will meet specific needs and
                  expectations.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Content
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Although the Services are subject to moderation, Make.org
                  cannot be held responsible for the Content, of which the
                  authors are third parties. Any potential complaints should be
                  first addressed to the author of the Content in question.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Content that could be harmful to a third party can be
                  signalled to Make.org according to the methods provided for by
                  Article 6.I.5 of Law no. 2004-575 of 21 June 2004 regarding
                  trust in the digital economy, with Make.org reserving the
                  right to take the measures described in article 12.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Loss of information
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The service being provided free of charge, Make.org accepts no
                  responsibility in the event that any information accessible in
                  the User’s Personal Space is lost, the User being responsible
                  for backing up this information and cannot claim any
                  compensation in this regard.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Damages
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  At all events, the liability that may be incurred by Make.org
                  in relation to these provisions is expressly limited to proven
                  direct harm suffered by the User.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              INTELLECTUAL PROPERTY
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Make.org’s property
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org makes no claim to ownership of the Data and Content
                  provided by Users.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  The systems, software, structures, infrastructure, databases
                  and content of all kinds (texts, images, visuals, music,
                  logos, brands, databases, etc.) used and operated by Make.org
                  on the site are protected by all intellectual property rights
                  or database producer rights in force.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Any reproduction, representation, publication, dissemination
                  or more generally any unauthorised exploitation of all or part
                  of the Service and of the information contained therein,
                  without the express authorisation of Make.org, will engage the
                  User’s liability.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Any disassembling, decompiling, decryption, extraction, reuse,
                  copying and, more generally, any acts of reproduction,
                  representation, dissemination, and use of any one of these
                  elements, in whole or in part, without the authorisation of
                  Make.org, is strictly forbidden and may result in legal
                  proceedings.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Ownership of Citizen Proposals
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  The Citizen Proposals themselves are the property of their
                  authors, who grant Make.org a non-exclusive, transferable and
                  free licence, for France and the entire world, for all online
                  use and for any mode of dissemination, for the duration of
                  these{' '}
                  <abbr lang="en" title="General Terms of service">
                    GTS
                  </abbr>{' '}
                  and for all of the uses intended for by these{' '}
                  <abbr lang="en" title="General Terms of service">
                    GTS
                  </abbr>
                  .
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              LINKS AND THIRD PARTY SITES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org shall not in any case be held responsible for the
              technical availability of internet sites or mobile phone
              applications operated by third parties (including any potential
              partners) to which the User might access by means of the site.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org assumes no responsibility for any content,
              advertisements, products and/or services available on such third
              party sites and mobile phone applications, and it is recalled that
              these sites and applications are governed by their own terms of
              service.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org is also not responsible for any transactions carried out
              between the User and any advertiser, professional or retailer
              (including its potential partners) to whom the User may be
              directed by means of the site and shall in no case be party to any
              lawsuits whatsoever with these third parties concerning, notably,
              the delivery of products and/or services, guarantees, declarations
              and any other obligations to which these third parties are
              subject.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PENALTIES AND TERMINATION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              In case of any failure to uphold the clauses in these present
              terms of service or, more generally, of any violations of existing
              laws and regulations by the User, Make.org reserves the right to
              take any appropriate measure, and notably to:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                suspend or terminate access to the Services for the User who
                committed the infraction or breached the rules, or who
                participated in such an infraction or breach of rules;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                delete any content published on the site;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                publish on the site any information message that Make.org deems
                useful;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                notify the relevant authorities;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                undertake legal action.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>

            <StaticParagraphStyle>
              Generally speaking, should a User fail to uphold his/her
              obligations as specified in the present terms of service and/or
              break any applicable law or regulation, Make.org can terminate the
              present General Terms of Service with respect to him/her as is its
              right and without any prior warning or formality.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The termination of the present General Terms of Service will lead
              to the end of access to the Services for the User in question, as
              well as the deletion of his/her data and content. The User will be
              informed of said termination by e-mail, at the address provided
              during registration. Termination will take place without prejudice
              to the damages and interests that Make.org may claim as
              reparations for harm suffered due to the violations committed by
              the User. Make.org will then be able to deny the User the right to
              create a new account on the Service.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              As the Services are free of charge, Make.org may delete, at any
              moment and without any warning, and for any reason, the
              publication of a Citizen Proposal, temporarily or permanently.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Similarly, as the Services are free of charge, Make.org may, at
              any moment and without any warning, and for any reason, modify or
              delete all or part of the Services, temporarily or permanently.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              No termination, interruption, modification or deletion of the
              Services will grant a right to compensation to the User.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DURATION OF THE SERVICES AS OF REGISTRATION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The Services are subscribed to for an indefinite period of time.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The Registered User can de-register from the Services at any time
              by making a request by e-mail to this effect to Make.org at&nbsp;
              <RedHTMLLinkElementStyle href={`mailto:${CONTACT_EMAIL}`}>
                {`${CONTACT_EMAIL}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              De-registration will be effective immediately. It will
              automatically lead to the deletion of the Registered User’s
              Account as well as of his/her Proposals.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              MODIFICATIONS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org reserves the right to modify the present terms of service
              at any moment.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              The User will be informed of these changes by any appropriate
              means.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Any User who does not accept the modified terms of service must
              de-register from the Services by means of the methods provided for
              in the present{' '}
              <abbr lang="en" title="General Terms of service">
                GTS
              </abbr>
              .
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Any User who makes use of the Services at a date after the
              modified terms of service take effect is considered to have
              accepted these modifications.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>INTEGRITY</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              If one or several of the stipulations of these provisions should
              be found to be null by a law or regulation, or declared as such by
              a court decision with jurisdictional authority, they will be
              deemed unwritten. The other stipulations of the present provisions
              will maintain their validity and scope, to the greatest extent
              possible, the Parties committing, where necessary, to come
              together to replace the null clause with a valid clause as similar
              as possible, and in the same spirit, as the clause it is designed
              to replace.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>NON-WAIVER</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The fact that one of the Parties may not take advantage at a given
              moment of one of the stipulations of the present provisions shall
              not be interpreted or considered as a waiver of its rights
              contained in these provisions, will not affect in any way the
              validity of all or part of these provisions and shall not infringe
              upon the rights of the Party concerned to take appropriate action.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              No Party shall be considered to have waived any of its rights
              under the terms of the contract, absent a written and signed
              waiver.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              FORCE MAJEURE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Any event that is unforeseeable, uncontrollable and external to
              the Parties such as (but not limited to) acts of war or terrorism,
              criminal acts, riots, natural or industrial disasters, explosions,
              legal requisitions and other legislative or regulatory provisions
              placing restrictions on Make.org’s functioning, disturbances to
              electronic communications networks outside of Make.org’s control,
              etc., shall be considered as a case of force majeure. In the event
              of a force majeure, Make.org may be required to suspend the
              Service. Contractual obligations, therefore, will be suspended and
              may come back into effect after the end of the case of force
              majeure for the remainder of the contract’s duration. They may
              also remain void.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>LANGUAGE</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              In the event that these present terms of service are translated
              into one or several languages, the language of interpretation will
              be French should there be any contradiction or dispute as to the
              meaning of a term or provision.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              APPLICABLE LAW AND JURISDICTION
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The present terms of service are governed by French law.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Should there be any dispute regarding the validity, interpretation
              and/or execution of the present terms of service, the parties
              agree that the courts of Paris will have sole jurisdiction, absent
              any overriding procedural rules.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ENTRY INTO FORCE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The present terms of service came into force on{' '}
              {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.P_FORMAT)}.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default TermsOfUseEN; // eslint-disable-line import/no-default-export
