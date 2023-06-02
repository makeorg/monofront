import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { QualificationApiService } from '@make.org/api/services/QualificationApiService';
import { QualificationType } from '@make.org/types';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const qualify = async (
  proposalId: string,
  proposalKey: string,
  voteKey: string,
  qualificationKey: string,
  proposalLanguage: string,
  unexpectedError: () => void = () => undefined
): Promise<QualificationType | null> => {
  try {
    const response = await QualificationApiService.qualify(
      proposalId,
      proposalKey,
      voteKey,
      qualificationKey,
      proposalLanguage
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    unexpectedError();

    return null;
  }
};

const unqualify = async (
  proposalId: string,
  proposalKey: string,
  voteKey: string,
  qualificationKey: string,
  proposalLanguage: string,
  unexpectedError: () => void = () => undefined
): Promise<QualificationType | null> => {
  try {
    const response = await QualificationApiService.unqualify(
      proposalId,
      proposalKey,
      voteKey,
      qualificationKey,
      proposalLanguage
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    unexpectedError();

    return null;
  }
};

export const QualificationService = {
  qualify,
  unqualify,
};
