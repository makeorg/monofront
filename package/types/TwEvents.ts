type twClId = {
  twclid: string;
};

type hashedEmail = {
  hashed_email: string;
};

export type TwConversionType = {
  conversionTime: Date;
  event_id: string;
  identifiers: Array<twClId | hashedEmail>;
  conversion_id?: string;
};

export type TwEventType = { conversions: TwConversionType[] };
