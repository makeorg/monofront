import {
  OrganisationType,
  OrganisationVoteType,
  ProposalType,
} from '@make.org/types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppContext } from '@make.org/store';
import { OrganisationService } from '../services/Organisation';

export const useOrganisation = (
  loadProposals?: boolean,
  loadVotes?: boolean
): {
  organisation: OrganisationType | null;
  proposals: ProposalType[];
  votes: OrganisationVoteType[];
  isLoading: boolean;
  votesTotal: number;
  proposalsTotal: number;
  pageId: number;
  seed: number | undefined;
} => {
  const { state } = useAppContext();
  const { language } = state.appConfig;
  const params: { organisationSlug: string; pageId: string } = useParams();
  const { organisationSlug, pageId } = params;
  const [organisation, setOrganisation] = useState<OrganisationType | null>(
    null
  );
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);
  const [votes, setVotes] = useState<OrganisationVoteType[]>([]);
  const [votesTotal, setVotesTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [seed, setSeed] = useState<number | undefined>(undefined);

  const fetchOrganisation = async () => {
    const response = await OrganisationService.getOrganisationBySlug(
      organisationSlug
    );

    setOrganisation(response);
  };

  const fetchOrganisationProposals = async () => {
    if (!organisation) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const proposalsResponse = await OrganisationService.getProposals(
      organisation.organisationId,
      JSON.parse(pageId) - 1,
      language
    );

    if (!proposalsResponse) {
      setIsLoading(false);
      return;
    }

    const { results, total, seed: apiSeed } = proposalsResponse;
    setProposals(results);
    setProposalsTotal(total);
    setSeed(apiSeed);
    setIsLoading(false);
  };

  const fetchVotedProposals = async () => {
    if (!organisation) {
      return;
    }

    setIsLoading(true);
    const response = await OrganisationService.getVotes(
      organisation.organisationId,
      seed,
      JSON.parse(pageId) - 1
    );

    if (!response) {
      setIsLoading(false);
      return;
    }

    const { results, total, seed: apiSeed } = response;
    setVotes(results);
    setVotesTotal(total);
    setSeed(apiSeed);
    setIsLoading(false);
  };

  useEffect(() => {
    if (loadProposals) {
      fetchOrganisationProposals();
    }
    if (loadVotes) {
      fetchVotedProposals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisation, pageId]);

  useEffect(() => {
    fetchOrganisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisationSlug]);

  useEffect(() => {
    if (loadProposals) {
      fetchOrganisationProposals();
    }
    if (loadVotes) {
      fetchVotedProposals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return {
    organisation,
    proposals,
    votes,
    isLoading,
    proposalsTotal,
    votesTotal,
    seed,
    pageId: Number(pageId),
  };
};
