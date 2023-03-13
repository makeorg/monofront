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
  loadMore?: number,
  loadProposals?: boolean,
  loadVotes?: boolean
): {
  organisation: OrganisationType | null;
  proposals: ProposalType[];
  votes: OrganisationVoteType[];
  isLoading: boolean;
  hasMore: boolean;
  seed: number | undefined;
  page: number;
} => {
  const params: { organisationSlug: string } = useParams();
  const { organisationSlug } = params;
  const [organisation, setOrganisation] = useState<OrganisationType | null>(
    null
  );
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [votes, setVotes] = useState<OrganisationVoteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const { state } = useAppContext();

  const { language } = state.appConfig;

  const fetchOrganisation = async () => {
    const response = await OrganisationService.getOrganisationBySlug(
      organisationSlug
    );

    setOrganisation(response);
  };

  const fetchProposals = async (
    pageId: number,
    proposalsList: ProposalType[]
  ) => {
    if (!organisation) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const proposalsResponse = await OrganisationService.getProposals(
      organisation.organisationId,
      pageId,
      language
    );
    if (proposalsResponse) {
      const { results, total, seed: apiSeed } = proposalsResponse;
      const newProposals = [...proposalsList, ...results];
      setProposals(newProposals);
      setHasMore(newProposals.length < total);
      setSeed(apiSeed);
      setPage(pageId + 1);
    }
    setIsLoading(false);
  };

  const fetchVotes = async (
    pageId: number,
    votesList: OrganisationVoteType[]
  ) => {
    if (!organisation) {
      return;
    }
    setIsLoading(true);
    const response = await OrganisationService.getVotes(
      organisation.organisationId,
      seed,
      pageId
    );
    if (response) {
      const { results, total, seed: apiSeed } = response;
      const newVotesList = [...votesList, ...results];
      setVotes(newVotesList);
      setHasMore(newVotesList.length < total);
      setSeed(apiSeed);
      setPage(pageId + 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loadProposals) {
      fetchProposals(page, proposals);
    }
    if (loadVotes) {
      fetchVotes(page, votes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisation, loadMore]);

  useEffect(() => {
    fetchOrganisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisationSlug]);

  useEffect(() => {
    if (loadProposals) {
      fetchProposals(0, []);
    }
    if (loadVotes) {
      fetchVotes(0, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return {
    organisation,
    proposals,
    votes,
    isLoading,
    hasMore,
    seed,
    page,
  };
};
