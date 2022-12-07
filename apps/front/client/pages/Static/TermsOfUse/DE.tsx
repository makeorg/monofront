import React, { FC } from 'react';
import {
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
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
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

export const TermsOfUseDE: FC = () => {
  const { state } = useAppContext();
  const { country, language, countriesWithConsultations } = state.appConfig;
  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  return (
    <>
      <MetaTags
        title={i18n.t('meta.gtu.title')}
        description={i18n.t('meta.gtu.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          MAKE.ORG NUTZUNGSBEDINGUNGEN
          <StaticTitleExtra>
            - Stand:{' '}
            {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.PPP_FORMAT)} -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org ist eine überparteiliche Organisation, die eine öffentlich
          zugängliche Website und Dienstleistungen anbietet.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Zu diesem Zweck ermöglicht es den Benutzern, Vorschläge auf der
          Website zu machen. Andere Nutzer, die dies wünschen, können diese
          Vorschläge dann kommentieren oder für sie abstimmen, um sie zu
          unterstützen. Ziel ist es, dass es gelingt, in der Gesellschaft
          Gedanken zu Themen von allgemeinem Interesse, insbesondere zu
          wirtschaftlichen, sozialen, staatsbürgerlichen und bürgerlichen
          Angelegenheiten, in den Vordergrund zu bringen. Diese Überlegungen
          können dann von Make.org-Partnern aufgegriffen werden, die helfen, sie
          konkret und real zu machen.
        </StaticParagraphStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SERVICEZWECK
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Der Zweck dieser allgemeinen Bedingungen ist es, die Bedingungen
              für die Nutzung der auf Make.org angebotenen Dienste (im
              Folgenden: die &rdquo;Dienste&rdquo;) zu definieren, sowie die
              Rechte und Pflichten der Parteien in diesem Zusammenhang zu
              definieren.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Sie sind jederzeit über einen direkten Link am unteren Rand der
              Startseite der Website zugänglich und ausdruckbar.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Sie können ggf. durch besondere Nutzungsbedingungen für bestimmte
              Dienste oder durch besondere Nutzungsbedingungen für bestimmte
              Nutzer ergänzt werden. Im Falle von Widersprüchen gehen die
              besonderen Bedingungen diesen allgemeinen Bedingungen vor.{' '}
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              BETREIBER DER WEBSITE UND DIENSTE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Die Website und die Dienste (oder zusammen &rdquo;die
              Dienste&rdquo;) werden von Make.org, SAS mit einem Kapital von{' '}
              {MAKE_CAPITAL}, mit Sitz in {MAKE_ADDRESS} Frankreich, eingetragen
              im Handels- und Gesellschaftsregister von PARIS unter der Nummer{' '}
              {MAKE_RCS} (im Folgenden &rdquo;Make.org&rdquo;) betrieben.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Der Kampf gegen die Verbreitung falscher Informationen im Internet
              ist zu einer wichtigen Herausforderung für die Zivilgesellschaft,
              Medien, staatliche Institutionen und vor allem für davon
              betroffene Bürger:innen geworden. Der Wahrheitsgehalt der auf
              unserer Website bereitgestellten Informationen liegt uns daher
              besonders am Herzen. In diesen ANB und unserer{' '}
              <RedHTMLLinkElementStyle
                href={getModerationLinkByLanguage(language)}
                target="_blank"
                rel="noopener"
              >
                Moderationscharta
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>{' '}
              erläutern wir, welche Maßnahmen wir in diesem Sinne ergreifen.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ZUGANG ZUR WEBSITE UND ZU DEN DIENSTEN
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Der Zugang zur Website und zu den Diensten ist kostenlos.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Der Zugang zur Website und zu den Diensten ist kostenlos. Sie ist
              offen und unterliegt den auf der Seite angegebenen
              Einschränkungen:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                an jede natürliche Person, die voll geschäftsfähig ist, um sich
                an diese Bedingungen zu binden. Eine natürliche Person, die
                nicht voll geschäftsfähig ist, darf nur mit Zustimmung ihres
                gesetzlichen Vertreters auf die Website und die Dienste
                zugreifen,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                an jeden Minderjährigen mit der Genehmigung seiner gesetzlichen
                Vertreter und unter deren Kontrolle,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                jede juristische Person, die durch eine natürliche Person
                handelt, die die Rechtsfähigkeit besitzt, im Namen und im
                Auftrag der juristischen Person Verträge abzuschließen.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              AKZEPTANZ DER BEDINGUNGEN UND KONDITIONEN
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Der Zweck dieser Allgemeinen Geschäftsbedingungen (im Folgenden
              &rdquo;
              <abbr lang="de" title="Allgemeine Geschäftsbedingungen ">
                AGB
              </abbr>
              &rdquo;) ist es, die Bedingungen zu definieren, unter denen der
              Benutzer auf die Dienste zugreifen und diese nutzen kann. Sie
              stellen einen Vertrag zwischen Make.org und den Nutzern des
              Dienstes dar. Sie ersetzen alle früheren Bestimmungen und stellen
              die Gesamtheit der Rechte und Pflichten der Parteien dar. Die GCUS
              werden jedem Benutzer mitgeteilt, der sie liest.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Die Nutzung des Dienstes setzt die vollständige und
              uneingeschränkte Annahme dieser{' '}
              <abbr lang="de" title="Allgemeine Geschäftsbedingungen ">
                AGB
              </abbr>{' '}
              voraus. Die Nichtakzeptanz der Nutzungsbedingungen bedeutet den
              Verzicht auf die Nutzung des Dienstes.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Die Nutzung des Dienstes impliziert auch die vollständige und
              uneingeschränkte Akzeptanz der
              Make.org-Datenverwendungsrichtlinie, die einen integralen
              Bestandteil dieser TOS bildet und hier verfügbar{' '}
              <RedLinkStyle to={getDataPageLink(country, language)}>
                ist
              </RedLinkStyle>
              .
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Diese{' '}
              <abbr lang="de" title="Allgemeine Geschäftsbedingungen ">
                AGB
              </abbr>{' '}
              können jederzeit und ohne Ankündigung von Make.org geändert
              werden. Jede Änderung wird unmittelbar mit der Veröffentlichung
              der neuen Version der AVB auf der Website wirksam. Der Benutzer
              wird daher aufgefordert, regelmäßig die neueste Version der{' '}
              <abbr lang="de" title="Allgemeine Geschäftsbedingungen ">
                AGB
              </abbr>{' '}
              auf der Website zu konsultieren. Tun Sie dies nicht, wird davon
              ausgegangen, dass Sie die neue Version der Allgemeinen
              Nutzungsbedingungen vorbehaltlos akzeptieren.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SITE-NUTZUNG
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Zugang zum Standort
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Die Seite ist öffentlich zugänglich und alle Benutzer können
                  die Seite besuchen und über die Vorschläge abstimmen.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Registrierte Benutzer
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Alle Benutzer können auf der Seite abstimmen, aber nur
                  registrierte Benutzer können Bürgervorschläge machen. Zu
                  diesem Zweck können sich diejenigen, die dies wünschen, auf
                  der Website registrieren, indem sie das zu diesem Zweck
                  vorgesehene Formular ausfüllen. Sie müssen dann alle als
                  obligatorisch gekennzeichneten Angaben machen. Eine
                  unvollständige Anmeldung wird nicht berücksichtigt.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  ie auf der Website registrierten Benutzer werden ausdrücklich
                  als &rdquo;registrierte Benutzer&rdquo; bezeichnet.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrierte Benutzer garantieren, dass alle im
                  Registrierungsformular gemachten Angaben korrekt, aktuell und
                  wahrheitsgemäß sind und nicht irreführend sind.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, diese Informationen in seinem
                  Persönlichen Bereich zu aktualisieren, indem er Make.org per
                  E-Mail an{' '}
                  <RedHTMLLinkElementStyle
                    href={`mailto:${contactMailByCountry}`}
                  >
                    {`${contactMailByCountry}`}
                  </RedHTMLLinkElementStyle>{' '}
                  kontaktiert.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der registrierte Benutzer ist darüber informiert und
                  akzeptiert, dass die zum Zweck der Erstellung oder
                  Aktualisierung seines Kontos eingegebenen Informationen ein
                  Beweis für seine Identität sind. Die vom Benutzer eingegebenen
                  Informationen sind nach der Validierung verbindlich.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Konto und persönlicher Bereich
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Die Registrierung führt automatisch zur Eröffnung eines Kontos
                  (im Folgenden: das &rdquo;Konto&rdquo;), das Zugang zu einem
                  persönlichen Bereich (im Folgenden: der &rdquo;Persönliche
                  Bereich&rdquo;) gibt, der es ermöglicht, die Nutzung der
                  Dienste in einer Form und mit den technischen Mitteln zu
                  verwalten, die Make.org für am geeignetsten hält und die sich
                  im Laufe der Zeit ändern können.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrierte Benutzer können jederzeit auf ihren persönlichen
                  Bereich zugreifen, nachdem sie sich mit ihrem Login und
                  Passwort identifiziert haben.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrierte Nutzer verpflichten sich, die Dienste nur für
                  ihre eigenen Zwecke zu nutzen und keinem Dritten zu gestatten,
                  sie an ihrer Stelle oder in ihrem Namen zu nutzen, es sei
                  denn, sie übernehmen die volle Verantwortung dafür.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrierte Benutzer sind ebenfalls für die Geheimhaltung
                  ihres Logins und Passworts verantwortlich. Sie sollten
                  Make.org sofort kontaktieren, wenn sie feststellen, dass ihr
                  Konto ohne ihr Wissen verwendet wurde. Sie erkennen an, dass
                  Make.org das Recht hat, in solchen Fällen entsprechende
                  Maßnahmen zu ergreifen.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              BESCHREIBUNG DER DIENSTLEISTUNGEN
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Bürgervorschläge
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Die Plattform bietet Nutzern die Möglichkeit, über
                  Bürgervorschläge abzustimmen, die von anderen Nutzern
                  vorgeschlagen wurden.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Die bei Make.org eingereichten Bürgervorschläge haben alle die
                  gleiche Chance, in die Tat umgesetzt zu werden.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Durch ihr Votum können die Nutzer einen Vorschlag zu einer
                  Citizen Action werden lassen, für die sich Make.org einsetzt.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org versteht sich dann als Vermittler zwischen
                  Bürgervorschlägen und Aktionspartnern. (
                  <RedHTMLLinkElementStyle href="#anchor_partners">
                    Siehe 6.8 Aktionspartner
                  </RedHTMLLinkElementStyle>
                  )
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Einen Bürgervorschlag formulieren
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registrierte Benutzer können eigene Bürgervorschläge machen,
                  die veröffentlicht, kommentiert, analysiert und diskutiert
                  werden sollen und zur Abstimmung durch die Benutzer gestellt
                  werden.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Form und Inhalt der Bürgervorschläge
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Jeder Bürgervorschlag muss unbedingt mit &rdquo;Es muss&rdquo;
                  beginnen und darf maximal 140 Zeichen enthalten. Der
                  Bürgervorschlag muss gut lesbar und in einer allgemein
                  verständlichen Form in französischer Sprache verfasst sein,
                  ohne Abkürzungen und ohne Missbrauch von Großbuchstaben.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Vorschlag darf keine Elemente enthalten, die gegen das
                  Gesetz oder die guten Sitten verstoßen oder deren Bedingungen
                  gegen die Bestimmungen dieser Nutzungsbedingungen verstoßen
                  würden.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Moderation und Veröffentlichung des Bürgervorschlags
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Die Veröffentlichung des Bürgervorschlags des Nutzers
                  unterliegt der Moderation unter den in diesen AVB definierten
                  Bedingungen. Die Anfrage zur Veröffentlichung eines
                  Bürgervorschlags wird so schnell wie möglich von den
                  Make.org-Teams bearbeitet, mit dem Ziel, innerhalb von 48
                  Stunden zu antworten.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Moderationsdienst von Make.org prüft jeden eingegangenen
                  Bürgervorschlag, bevor er online gestellt wird. Der Nutzer
                  muss daher sicherstellen, dass er die Einreichung eines
                  Vorschlags für einen Bürgerantrag nicht unnötig wiederholt und
                  nicht denselben Vorschlag für einen Bürgerantrag einreicht. Er
                  sollte die Dienste auch nicht spammen, indem er die gleichen
                  Lösungen mit verschiedenen E-Mail-Adressen vorschlägt. Um
                  allen Nutzer:innen eine Stimme zu geben, kann jeder Nutzer und
                  jede Nutzerin maximal 100 Vorschläge zu ein und derselben
                  Konsultation einreichen. Bei Überschreitung dieses Grenzwertes
                  können wir keine Vorschläge mehr annehmen und werden die
                  betreffenden Nutzer:innen per E-Mail benachrichtigen, um ihnen
                  die Gründe dieses Grenzwertes zu erläutern und ihnen eine
                  optimale Nutzung der Plattform zu ermöglichen.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Sobald der Bürgervorschlag des Benutzers validiert ist, wird
                  er im Dienst veröffentlicht und eine Benachrichtigung über die
                  Veröffentlichung an den Autor gesendet.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Wenn der Bürgervorschlag des Nutzers abgelehnt wird, erhält
                  der Nutzer von Make.org eine E-Mail, die ihn über die
                  Ablehnung informiert. Der Benutzer kann dann frei einen neuen
                  Bürgervorschlag einreichen.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Sobald es in den Diensten veröffentlicht wurde, kann es in den
                  Diensten erscheinen, aber Make.org garantiert nicht die
                  Häufigkeit des Erscheinens oder das Publikum.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org verpflichtet sich, den legalen Inhalt, der ihm
                  vorgeschlagen wird und der seinen Moderationsregeln
                  entspricht, nicht willkürlich zu verändern, abgesehen von
                  Korrekturen, die die Rechtschreibung betreffen.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Antrag auf Löschung eines Bürgervorschlags durch einen
                  registrierten Benutzer
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Für den Fall, dass ein registrierter Benutzer seinen
                  veröffentlichten Bürgervorschlag löschen lassen möchte, sollte
                  er eine Anfrage per E-Mail an Make.org an die folgende Adresse
                  senden:{' '}
                  <RedHTMLLinkElementStyle
                    href={`mailto:${contactMailByCountry}`}
                  >
                    {`${contactMailByCountry}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Antrag des Nutzers auf Löschung wird innerhalb einer
                  angemessenen Zeit von Make.org bearbeitet.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Abstimmen über einen Bürgervorschlag
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Alle Benutzer können sich durch Abstimmungen über die
                  Bürgervorschläge auf der Website äußern, ohne ein Konto
                  erstellen zu müssen, indem sie auf die Schaltflächen
                  &rdquo;Zustimmen&rdquo;, &rdquo;Nicht zustimmen&rdquo; oder
                  &rdquo;Leere Stimme&rdquo; klicken.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Verwendung von Bürgervorschlägen
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Verwendung für statistische Zwecke:{' '}
                  </StaticStrongStyle>
                  Make.org kann die Eingaben der Bürger, aggregiert oder nicht
                  und bereinigt von allen persönlichen Daten, einschließlich
                  Zusammenstellungen, Zusammenfassungen für statistische,
                  Forschungs- oder andere Zwecke verwenden.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Verwendung für Debatten:{' '}
                  </StaticStrongStyle>
                  Die auf dem Dienst veröffentlichten Bürgervorschläge können
                  von Make.org ausgewählt werden, um in öffentlichen Debatten,
                  die von Make.org oder seinen Partnern organisiert werden,
                  analysiert, kommentiert und/oder diskutiert zu werden.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Verwendung für Berichterstattung und Forschung:{' '}
                  </StaticStrongStyle>
                  Die auf dem Dienst veröffentlichten Bürgervorschläge sowie die
                  dazu abgegebenen Stimmen können von Make.org ausgewählt
                  werden, um u.a. Analysen, Berichte und Studien für
                  statistische und Forschungszwecke durchzuführen oder um Anlass
                  für die Erstellung von Reformprojekten zu geben.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Verwendung für Berichterstattung und Forschung:{' '}
                  </StaticStrongStyle>
                  Die auf dem Dienst veröffentlichten Bürgervorschläge sowie die
                  dazu abgegebenen Stimmen können von Make.org ausgewählt
                  werden, um u.a. Analysen, Berichte und Studien für
                  statistische und Forschungszwecke durchzuführen oder um Anlass
                  für die Erstellung von Reformprojekten zu geben.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Veröffentlichung von White Papers:{' '}
                  </StaticStrongStyle>
                  Make.org kann nicht-kommerzielle White Papers veröffentlichen
                  oder mitveröffentlichen, die ganz oder teilweise die
                  Vorschläge der Bürger enthalten.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>Redaktionelle Nutzung: </StaticStrongStyle>
                  Die Bürgervorschläge und die damit verbundenen Abstimmungen
                  können auch von Make.org und/oder Partnerjournalisten
                  aufgegriffen, kommentiert und analysiert werden, um
                  redaktionelle Inhalte zu produzieren.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Verwendung zu Kommunikationszwecken:{' '}
                  </StaticStrongStyle>{' '}
                  Eingaben von Bürgern können von Make.org auch auf der Website
                  verwendet und in Werbeflächen angezeigt werden, die von
                  Make.org-Partnern betrieben werden. In diesem Fall führt die
                  Verwendung eines Bürgervorschlages in einer solchen
                  Werbefläche zur Veröffentlichung des Vorschlages, wenn dieser
                  anonym veröffentlicht wurde oder mit Vorname, Alter und
                  Abteilung versehen, wenn der Nutzer diese Angaben gemacht hat.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Umsetzung von Bürgervorschlägen:{' '}
                  </StaticStrongStyle>
                  Schließlich können die Vorschläge Gegenstand einer konkreten
                  Umwandlungsaktion sein, entweder direkt durch die Nutzer oder
                  durch die Aktionspartner von Make.org, die der Nutzer, von dem
                  der Vorschlag stammt, sowie die Nutzer, die über ihn
                  abgestimmt haben, verstehen und ausdrücklich akzeptieren.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle
                id="anchor_partners"
                className="section6"
              >
                <StaticFourthLevelTitleStyle>
                  Partner-Aktionen
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registrierte Benutzer können eigene Bürgervorschläge machen,
                  die veröffentlicht, kommentiert, analysiert und diskutiert
                  werden sollen und zur Abstimmung durch die Benutzer gestellt
                  werden.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>PROOF</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Der Nutzer nimmt dies ausdrücklich zur Kenntnis und erklärt sich
              damit einverstanden:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                dass die Daten, die auf der Website und auf der
                Computerausrüstung von Make.org gesammelt werden, ein Beweis für
                die Realität der Operationen sind, die im Rahmen des
                vorliegenden Dokuments durchgeführt werden;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                dass diese Daten die einzige zwischen den Parteien zugelassene
                Beweisart darstellen.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PFLICHTEN DES ANWENDERS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Unbeschadet der anderen hierin vorgesehenen Verpflichtungen
              verpflichtet sich der Benutzer, die folgenden Verpflichtungen
              einzuhalten:
            </StaticParagraphStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Einhaltung von Gesetzen und Vorschriften
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, bei der Nutzung der Dienste die
                  geltenden Gesetze und Vorschriften zu beachten und nicht gegen
                  die Rechte Dritter oder die öffentliche Ordnung zu verstoßen.
                  Der Nutzer ist allein verantwortlich für die ordnungsgemäße
                  Erledigung aller administrativen, steuerlichen und/oder
                  sozialen Formalitäten sowie für die Zahlung von Beiträgen,
                  Steuern oder Abgaben jeglicher Art, die im Zusammenhang mit
                  seiner Nutzung der Dienste anfallen können. Make.org kann in
                  dieser Hinsicht in keiner Weise haftbar gemacht werden.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Nutzung der Website und Dienste
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Der Benutzer erkennt an, dass er die Eigenschaften und
                  Beschränkungen aller Dienste auf der Website, insbesondere die
                  technischen, gelesen hat. Er ist allein verantwortlich für
                  seine Nutzung der Dienste.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Benutzer ist darüber informiert und akzeptiert, dass die
                  Implementierung der Dienste eine Verbindung zum Internet
                  erfordert und dass die Qualität der Dienste direkt von dieser
                  Verbindung abhängt, für die er allein verantwortlich ist.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, keine Angebote mit werbendem
                  Charakter oder zur Förderung von Dienstleistungen mit
                  Gewinnabsicht zu veröffentlichen. Der Nutzer verpflichtet
                  sich, keine nicht ernst gemeinten oder themenfremden
                  Vorschläge zu veröffentlichen. Der Nutzer verpflichtet sich
                  zur rein persönlichen Nutzung der Dienste. Folglich darf er
                  seine Rechte und Pflichten aus diesem Vertrag weder ganz noch
                  teilweise an Dritte abtreten, einräumen oder übertragen, in
                  welcher Weise auch immer.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, keine Vorschläge zu
                  veröffentlichen, die Parteien, Organisationen oder Personen
                  des öffentlichen Lebens fördern oder verunglimpfen.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer ist auch allein verantwortlich für die Beziehungen,
                  die er mit anderen Nutzern eingeht und die Informationen, die
                  er ihnen im Rahmen der Dienste mitteilt. Es liegt in der
                  Verantwortung des Benutzers, bei diesen Beziehungen und
                  Kommunikationen die erforderliche Sorgfalt und Diskretion
                  walten zu lassen. Der Nutzer verpflichtet sich außerdem, im
                  Austausch mit anderen Nutzern die üblichen Regeln der
                  Höflichkeit zu beachten.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Benutzer verpflichtet sich, keine Kommentare oder
                  Vorschläge zu machen, die gegen das Gesetz oder die guten
                  Sitten verstoßen, insbesondere, ohne dass diese Aufzählung
                  abschließend ist:
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    Äußerungen, die zum Rassenhass aufstacheln, rassistische,
                    antisemitische, fremdenfeindliche, homophobe Äußerungen,
                    usw.;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    gewalttätig, pornografisch, pädophil, usw..;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    beleidigend, verunglimpfend, diffamierend oder die
                    Persönlichkeitsrechte Dritter verletzend;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Leugnung von Verbrechen gegen die Menschlichkeit und
                    anerkannten Völkermorden und Verherrlichung von Verbrechen ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Anstiftung zu strafbaren Handlungen, wie z. B. Anstiftung
                    zur Gewalt, zum Terrorismus, zum Verkauf von
                    Betäubungsmitteln usw. ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Äußerungen, die die Privatsphäre oder geistige
                    Eigentumsrechte anderer verletzen,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Aussagen, die gegen die Unschuldsvermutung oder das
                    Untersuchungsgeheimnis verstoßen, etc;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Worte, die die Menschenwürde verletzen ;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Äußerungen, die als Missbrauch des Rechts auf freie
                    Meinungsäußerung angesehen werden könnten.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Beziehung zu Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, Make.org alle Informationen zur
                  Verfügung zu stellen, die für die ordnungsgemäße Erbringung
                  der Dienstleistungen erforderlich sind. Im Allgemeinen stimmt
                  der Nutzer zu, aktiv mit Make.org bei der ordnungsgemäßen
                  Durchführung dieses Vertrages zu kooperieren.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, dafür zu sorgen, dass seine
                  Vorschläge in Übereinstimmung mit den Regeln der Indizierung,
                  Formatierung und Hervorhebung von Make.org, in seiner
                  Eigenschaft als Herausgeber des Dienstes, wiedergegeben
                  werden.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ANWENDERGARANTIEN
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Inhalt
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Der Nutzer ist allein verantwortlich für die Inhalte jeglicher
                  Art (redaktionelle, grafische, audiovisuelle oder andere,
                  einschließlich des Namens und/oder des Bildes, das der Nutzer
                  zu seiner Identifizierung auf der Website gewählt hat), die er
                  im Rahmen der Dienste verbreitet (im Folgenden: die
                  &rdquo;Inhalte&rdquo;).
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer garantiert Make.org, dass er über alle Rechte und
                  Berechtigungen verfügt, die für die Verbreitung dieser Inhalte
                  notwendig sind.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, sicherzustellen, dass solche
                  Inhalte rechtmäßig sind, nicht gegen die öffentliche Ordnung,
                  die öffentliche Moral oder die Rechte Dritter verstoßen, keine
                  gesetzlichen oder behördlichen Bestimmungen verletzen und,
                  ganz allgemein, keine zivil- oder strafrechtliche Haftung von
                  Make.org nach sich ziehen können.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Dem Nutzer ist es daher untersagt, insbesondere und ohne dass
                  diese Aufzählung abschließend ist, zu verbreiten:
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    pornografische, obszöne, unanständige, schockierende oder
                    für ein Familienpublikum ungeeignete, verleumderische,
                    beleidigende, gewalttätige, rassistische, fremdenfeindliche
                    oder revisionistische Inhalte,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Verletzende Inhalte,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Inhalte, die das Ansehen eines Dritten schädigen,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Inhalte, die falsch oder irreführend sind oder die illegale,
                    betrügerische oder täuschende Aktivitäten vorschlagen oder
                    fördern,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Inhalte, die für die Computersysteme Dritter schädlich sind
                    (wie z.B. Viren, Würmer, Trojanische Pferde, etc.),
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    und ganz allgemein Inhalte, die geeignet sind, die Rechte
                    Dritter zu verletzen oder Dritten zu schaden, in welcher
                    Form auch immer.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Beschränkungen der Nutzung der Dienste
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Der Nutzer erkennt an, dass die Dienste ihm eine zusätzliche,
                  aber keine alternative Lösung zu den Mitteln bieten, die er
                  bereits anderweitig zur Erreichung desselben Ziels einsetzt,
                  und dass diese Lösung diese anderen Mittel nicht ersetzen
                  kann.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Benutzer muss die notwendigen Maßnahmen ergreifen, um die
                  von ihm als notwendig erachteten Informationen über seinen
                  Persönlichen Bereich mit eigenen Mitteln zu speichern.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Benutzer ist darüber informiert und akzeptiert, dass die
                  Implementierung der Dienste eine Verbindung zum Internet
                  erfordert und dass die Qualität der Dienste direkt von dieser
                  Verbindung abhängt, für die er allein verantwortlich ist.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Ansprüche und Entschädigung
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Der Nutzer stellt Make.org von allen Ansprüchen, Beschwerden,
                  Klagen und Forderungen frei, die Make.org als Folge der
                  Verletzung von Verpflichtungen oder Garantien des Nutzers
                  gemäß diesen Bedingungen erleiden könnte.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Der Nutzer verpflichtet sich, Make.org für jeglichen Schaden
                  zu entschädigen und alle Kosten, Gebühren und/oder Urteile zu
                  zahlen, die ihm dadurch entstehen können.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              VERBOTENE VERHALTENSWEISE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Es ist strengstens untersagt, die Dienste für die folgenden Zwecke
              zu nutzen:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                die Beteiligung an illegalen oder betrügerischen Aktivitäten
                oder an Aktivitäten, die die Rechte oder die Sicherheit anderer
                verletzen,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                die Verletzung der öffentlichen Ordnung oder die Verletzung der
                geltenden Gesetze und Vorschriften,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Eindringen in das Computersystem eines Dritten oder jegliche
                Aktivitäten, die darauf abzielen, das Computersystem eines
                Dritten ganz oder teilweise zu schädigen, zu kontrollieren, zu
                stören oder abzufangen, seine Integrität oder Sicherheit zu
                verletzen,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Versenden von unaufgeforderten E-Mails und/oder kommerzieller
                Prospektion oder Anwerbung,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Manipulationen, die dazu dienen, die Referenzierung einer
                fremden Seite zu verbessern,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Beihilfe oder Anstiftung, in welcher Form auch immer, zu einer
                oder mehreren der oben beschriebenen Handlungen und Aktivitäten,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                und ganz allgemein jede Praxis, die die Dienste zu anderen
                Zwecken als denen, für die sie konzipiert wurden, umleitet.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Den Nutzern ist es strengstens untersagt, das Konzept, die
              Technologien oder jedes andere Element der Make.org-Website für
              eigene Zwecke oder die von Dritten zu kopieren und/oder zu
              missbrauchen.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Folgendes ist ebenfalls strengstens verboten: (i) jedes Verhalten,
              das geeignet ist, die Kontinuität der Dienste zu unterbrechen,
              auszusetzen, zu verlangsamen oder zu verhindern, (ii) jedes
              Eindringen oder versuchte Eindringen in die Systeme von
              Make.org-Systeme, (iii) jede Umleitung der Systemressourcen der
              Website, (iv) jede Handlung, die eine unverhältnismäßige Belastung
              der Infrastruktur der Website darstellen könnte, (v) jede
              Verletzung von Sicherheits- und Authentifizierungsmaßnahmen, (vi)
              jede Handlung, die die finanziellen, kommerziellen oder
              moralischen Rechte und Interessen von Make.org oder seinen
              Website-Nutzern verletzen könnte, und allgemeiner (vii) jede
              Verletzung dieser allgemeinen Bedingungen.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Es ist strengstens untersagt, den Zugang zu den Diensten oder der
              Website sowie die darin gehosteten und/oder geteilten
              Informationen ganz oder teilweise zu monetarisieren, zu verkaufen
              oder zu lizenzieren.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              EINSCHRÄNKUNGEN DER MAKE.ORG-GARANTIE
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Qualität der Dienstleistung
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org kann nicht garantieren, dass der Dienst nicht
                  unterbrochen wird. Make.org verpflichtet sich, den Service
                  sorgfältig und in Übereinstimmung mit den Regeln des Handels
                  bereitzustellen, wobei daran erinnert wird, dass dies nur eine
                  Verpflichtung der Mittel ist, die die Benutzer ausdrücklich
                  anerkennen und akzeptieren.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org verpflichtet sich, regelmäßige Kontrollen
                  durchzuführen, um den Betrieb und die Erreichbarkeit der Seite
                  zu überprüfen. In diesem Zusammenhang behält sich Make.org das
                  Recht vor, den Zugriff auf die Seite für Wartungszwecke
                  vorübergehend zu unterbrechen. Ebenso kann Make.org nicht für
                  Schwierigkeiten oder vorübergehende Unmöglichkeit des Zugriffs
                  auf die Website aufgrund von Umständen außerhalb seiner
                  Kontrolle, höherer Gewalt oder aufgrund von Störungen in den
                  Telekommunikationsnetzen verantwortlich gemacht werden.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org garantiert den Benutzern nicht, dass (i) die Dienste,
                  die ständiger Forschung zur Verbesserung der Leistung und des
                  Fortschritts unterliegen, völlig frei von Fehlern, Mängeln
                  oder Unzulänglichkeiten sind, (ii) die Dienste, die Standard
                  sind und nicht nur für die Nutzung eines bestimmten Benutzers
                  nach seinen eigenen persönlichen Einschränkungen angeboten
                  werden, speziell seinen Bedürfnissen und Erwartungen
                  entsprechen.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Inhalt
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Obwohl die Dienste moderiert werden, kann Make.org nicht für
                  Inhalte verantwortlich gemacht werden, deren Autoren Dritte
                  sind, und jegliche Ansprüche sollten in erster Instanz an den
                  Autor des fraglichen Inhalts gerichtet werden.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Inhalte, die für Dritte schädlich sind, können Make.org gemäß
                  den Bestimmungen des Artikels 6 I 5 des Gesetzes n° 2004-575
                  vom 21. Juni 2004 für das Vertrauen in die digitale Wirtschaft
                  gemeldet werden, wobei Make.org sich das Recht vorbehält, die
                  in Artikel 12 beschriebenen Maßnahmen zu ergreifen.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Verlust von Informationen
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Da der Dienst kostenlos zur Verfügung gestellt wird, lehnt
                  Make.org jede Verantwortung für den Verlust von Informationen
                  ab, die im Persönlichen Bereich des Benutzers zugänglich sind,
                  da der Benutzer eine Kopie speichern muss und keine
                  Entschädigung dafür verlangen kann.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Beschädigung
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  In jedem Fall ist die Haftung, die Make.org unter den
                  vorliegenden Bedingungen entstehen kann, ausdrücklich auf
                  nachgewiesene direkte Schäden des Nutzers beschränkt.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              GEISTIGES EIGENTUM
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Eigentum von Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org erhebt keinen Anspruch auf das Eigentum an den von
                  den Benutzern bereitgestellten Daten und Inhalten.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Die Systeme, Software, Strukturen, Infrastrukturen,
                  Datenbanken und Inhalte jeglicher Art (Texte, Bilder, Visuals,
                  Musik, Logos, Marken, Datenbanken, etc.), die von Make.org auf
                  der Website verwendet werden, sind durch alle geltenden Rechte
                  des geistigen Eigentums oder Rechte der Hersteller von
                  Datenbanken geschützt.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Jede unbefugte Vervielfältigung, Darstellung,
                  Veröffentlichung, Übertragung oder, allgemeiner, jede
                  unbefugte Nutzung des gesamten oder eines Teils des Dienstes
                  und der darin enthaltenen Informationen, ohne die
                  ausdrückliche Genehmigung von Make.org, wird die Verantwortung
                  des Benutzers zu engagieren.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Jegliche Disassemblierung, Dekompilierung, Entschlüsselung,
                  Extraktion, Wiederverwendung, Vervielfältigung und,
                  allgemeiner, jeder Akt der Vervielfältigung, Darstellung,
                  Verteilung und Verwendung eines dieser Elemente, ganz oder
                  teilweise, ohne die Genehmigung von Make.org ist strengstens
                  untersagt und kann Gegenstand rechtlicher Schritte sein.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Eigentümerschaft von Bürgervorschlägen
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Die Bürgervorschläge selbst sind Eigentum ihrer Autoren, die
                  Make.org eine nicht-exklusive, übertragbare und kostenlose
                  Lizenz zur Nutzung in Frankreich und weltweit, für jede
                  Online-Nutzung und für alle Verbreitungswege, für die Dauer
                  dieser GCUS und für alle hier genannten Nutzungen gewähren.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              LINKS UND WEBSITES VON DRITTEN
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org ist in keiner Weise verantwortlich für die technische
              Verfügbarkeit von Websites oder mobilen Anwendungen, die von
              Dritten (einschließlich seiner möglichen Partner) betrieben
              werden, auf die der Nutzer über die Website zugreifen kann.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org ist nicht verantwortlich für den Inhalt, die Werbung, die
              Produkte und/oder die Dienstleistungen, die auf solchen Websites
              und mobilen Anwendungen von Dritten verfügbar sind, die durch ihre
              eigenen Nutzungsbedingungen geregelt sind.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org ist nicht verantwortlich für Transaktionen zwischen dem
              Benutzer und einem Werbetreibenden, Fachmann oder Händler
              (einschließlich seiner Partner), an die der Benutzer über die
              Website weitergeleitet wird, und ist nicht Partei bei
              Streitigkeiten mit solchen Dritten in Bezug auf die Lieferung von
              Produkten und/oder Dienstleistungen, Garantien, Zusicherungen oder
              anderen Verpflichtungen jeglicher Art.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SANKTIONEN UND KÜNDIGUNG
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Im Falle eines Verstoßes gegen eine der Bestimmungen dieser
              Bedingungen oder, allgemeiner, eines Verstoßes gegen geltende
              Gesetze und Vorschriften durch einen Benutzer, Make.org behält
              sich das Recht vor, alle geeigneten Maßnahmen zu ergreifen und
              insbesondere zu :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                den Zugang zu den Diensten des Benutzers, der Urheber des
                Verstoßes oder der Verletzung ist oder daran teilgenommen hat,
                auszusetzen oder zu beenden,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                die auf der Website veröffentlichten Inhalte zu löschen,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                auf der Website alle Informationsmeldungen zu veröffentlichen,
                die Make.org für nützlich hält,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                benachrichtigen Sie jede zuständige Behörde,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                rechtliche Schritte einleiten.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Im Allgemeinen kann Make.org im Falle eines Verstoßes des Nutzers
              gegen seine Verpflichtungen hierunter und/oder im Falle eines
              Verstoßes gegen ein anwendbares Gesetz oder eine Verordnung diese
              Nutzungsbedingungen von Rechts wegen und ohne vorherige
              Ankündigung oder Formalitäten kündigen.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Die Kündigung dieser Allgemeinen Nutzungsbedingungen führt zur
              Beendigung des Zugangs zu den Diensten für den betreffenden Nutzer
              sowie zur Löschung seiner Daten und Inhalte. Der Nutzer wird über
              diese Kündigung per E-Mail an die von ihm bei der Registrierung
              angegebene Adresse informiert. Die Kündigung erfolgt unbeschadet
              etwaiger Schadensersatzansprüche, die Make.org als Entschädigung
              für einen durch die angeblichen Verstöße des Nutzers entstandenen
              Schaden geltend machen kann. Make.org kann dem Nutzer anschließend
              die Erstellung eines neuen Kontos auf dem Dienst verweigern.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Da die Dienste kostenlos sind, kann Make.org jederzeit und ohne
              Vorankündigung, ohne Angabe von Gründen, vorübergehend oder
              dauerhaft die Veröffentlichung eines Bürgervorschlags löschen.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Auch, weil die Dienste sind kostenlos, Make.org kann jederzeit und
              ohne vorherige Ankündigung, aus irgendeinem Grund, vorübergehend
              oder dauerhaft, ändern oder löschen Sie die Dienste in Teilen oder
              im Ganzen.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Auch, weil die Dienste sind kostenlos, Make.org kann jederzeit und
              ohne vorherige Ankündigung, aus irgendeinem Grund, vorübergehend
              oder dauerhaft, ändern oder löschen Sie die Dienste in Teilen oder
              im Ganzen.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DAUER DER DIENSTE, ABMELDUNG
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Die Dienste werden für einen unbestimmten Zeitraum abonniert.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Der registrierte Benutzer kann sich jederzeit von den Diensten
              abmelden, indem er eine entsprechende Anfrage an Make.org per
              E-Mail an{' '}
              <RedHTMLLinkElementStyle href={`mailto:${contactMailByCountry}`}>
                {`${contactMailByCountry}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Die Abmeldung ist sofort wirksam. Sie führt zur automatischen
              Löschung des Kontos des registrierten Benutzers sowie seiner
              Vorschläge.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>ÄNDERUNGEN</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org behält sich das Recht vor, diese Bestimmungen und
              Bedingungen jederzeit zu ändern.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Der Benutzer wird über diese Änderungen auf jede sinnvolle Weise
              informiert werden.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Der Nutzer, der die geänderten Bedingungen nicht akzeptiert, muss
              sich von den Diensten gemäß den in diesen allgemeinen
              Nutzungsbedingungen der Website festgelegten Bedingungen abmelden.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Jeder Benutzer, der die Dienste nach dem Inkrafttreten der
              geänderten allgemeinen Bedingungen nutzt, gilt als mit diesen
              Änderungen einverstanden.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>INTEGRITÄT</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Sollten eine oder mehrere der hierin enthaltenen Bestimmungen
              durch ein Gesetz oder eine Verordnung für ungültig erklärt werden
              oder durch eine rechtskräftige Entscheidung eines zuständigen
              Gerichts für ungültig erklärt werden, so gelten sie als
              ungeschrieben. Die übrigen Bestimmungen dieser Vereinbarung
              bleiben unter Beibehaltung ihrer ganzen Tragweite in Kraft, soweit
              dies möglich ist, und die Parteien verpflichten sich, soweit
              erforderlich, zusammenzukommen, um die unwirksame Klausel durch
              eine wirksame Klausel zu ersetzen, die dem Geist derjenigen, die
              sie ersetzen soll, möglichst nahe kommt.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              NICHT-WAIVER
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Das Versäumnis einer Partei, sich zu irgendeinem Zeitpunkt auf
              eine der Bestimmungen dieser Vereinbarung zu berufen, ist nicht
              als Verzicht auf ihre Rechte aus dieser Vereinbarung auszulegen
              oder zu betrachten, berührt in keiner Weise die Gültigkeit der
              gesamten Vereinbarung oder eines Teils davon und beeinträchtigt
              nicht die Rechte der betroffenen Partei, entsprechend zu handeln.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Es wird davon ausgegangen, dass keine Partei auf ein Recht aus dem
              Vertrag verzichtet hat, wenn sie nicht eine schriftliche
              Verzichtserklärung unterzeichnet hat.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              HÖHERE GEWALT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Jedes unvorhersehbare, unabwendbare Ereignis, das außerhalb der
              Parteien liegt, wie z.B. (aber nicht beschränkt auf)
              Kriegshandlungen oder Terrorismus, kriminelle Handlungen, Unruhen,
              Natur- oder Industriekatastrophen, Explosionen, gesetzliche
              Anforderungen und andere gesetzliche oder behördliche
              Bestimmungen, die die Ausübung der Tätigkeit von Make.org
              einschränken, Störungen elektronischer Kommunikationsnetze, die
              außerhalb der Kontrolle von Make.org liegen, usw., werden als
              höhere Gewalt betrachtet. Im Falle von höherer Gewalt kann
              Make.org den Dienst aussetzen müssen. Die Wirkungen des Vertrages
              werden dann ausgesetzt und können nach Beendigung des Ereignisses
              höherer Gewalt für den Rest der Vertragslaufzeit wieder
              aufgenommen werden. Sie können auch suspendiert bleiben.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>SPRACHE</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Im Falle einer Übersetzung dieser Allgemeinen Geschäftsbedingungen
              in eine oder mehrere Sprachen ist im Falle eines Widerspruchs oder
              eines Streits über die Bedeutung eines Begriffs oder einer
              Bestimmung die französische Sprache für die Auslegung maßgeblich.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ANWENDBARES RECHT UND GERICHTSBARKEIT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Die vorliegenden allgemeinen Bedingungen unterliegen dem
              französischen Recht.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Im Falle eines Rechtsstreits über die Gültigkeit, Auslegung
              und/oder Ausführung dieser allgemeinen Bedingungen vereinbaren die
              Parteien die ausschließliche Zuständigkeit der Gerichte in Paris,
              sofern nicht zwingende Verfahrensvorschriften entgegenstehen.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              INKRAFTTRETEN
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Diese Bedingungen sind am{' '}
              {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.P_FORMAT)} in
              Kraft getreten.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default TermsOfUseDE; // eslint-disable-line import/no-default-export
