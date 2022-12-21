import { SEQUENCE } from '@make.org/types/enums';

export const getWidgetLocation = (sequenceKind?: string): string => {
  if (sequenceKind === SEQUENCE.KIND_CONTROVERSY) {
    return 'widget-controversial';
  }
  if (sequenceKind === SEQUENCE.KIND_CONSENSUS) {
    return 'widget-popular';
  }
  return 'widget';
};
