export type LocalizedText = {
  language: string;
  text: string;
};

export type Country = {
  isoCode: string;
  name: LocalizedText[];
};

export type PublicHoliday = {
  id: string;
  startDate: string;
  name: LocalizedText[];
};
