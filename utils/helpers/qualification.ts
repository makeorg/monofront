export const getQualificationIndex = (
  qualificationKey: string,
  proposalId: string
): string | null => {
  if (proposalId === null) {
    return null;
  }

  return `${qualificationKey}_${proposalId}`;
};
