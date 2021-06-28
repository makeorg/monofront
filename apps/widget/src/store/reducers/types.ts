import { AuthState } from './auth_reducer';
import { ProposalState } from './proposals_reducer';

export type Question = {
  proposals: [
    {
      id: string;
      userId: string;
      content: string;
      slug: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      votes: [
        {
          voteKey: string;
          count: number;
          qualifications: [
            {
              qualificationKey: string;
              count: number;
              hasQualified: boolean;
            }
          ];
          hasVoted: boolean;
        }
      ];
      context: {
        operation: string;
        source: string;
        location: string;
        question: string;
        country: {
          value: string;
        };
        language: {
          value: string;
        };
        getParameters: [
          {
            key: string;
            value: string;
          }
        ];
      };
      trending: string;
      labels: [string];
      author: {
        firstName: string;
        displayName: string;
        organisationName: string;
        organisationSlug: string;
        postalCode: string;
        age: number;
        avatarUrl: string;
        userType: string;
      };
      organisations: [
        {
          organisationId: string;
          organisationName: string;
          organisationSlug: string;
        }
      ];
      tags: [
        {
          tagId: string;
          label: string;
          display: boolean;
        }
      ];
      selectedStakeTag: {
        tagId: string;
        label: string;
        display: boolean;
      };
      myProposal: boolean;
      idea: string;
      question: {
        questionId: string;
        slug: string;
        wording: {
          title: string;
          question: string;
        };
        countries: string;
        language: string;
        startDate: Date;
        endDate: Date;
      };
      operationId: string;
      proposalKey: string;
      keywords: [
        {
          key: {
            value: string;
          };
          label: string;
        }
      ];
    }
  ];
};

export type Reducer<State = any, Action = any> = (
  state: State,
  action: Action
) => State;

export type GlobalState = {
  authentification: AuthState;
  proposals: ProposalState;
};
interface ReducerData {
  [index: string]: string;
}
export type ReducerAction = {
  type: string;
  data?: ReducerData;
};
