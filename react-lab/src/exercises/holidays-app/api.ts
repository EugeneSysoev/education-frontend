import type { Country, PublicHoliday } from "./types";

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(
    "https://openholidaysapi.org/Countries?languageIsoCode=en",
  );

  if (!response.ok) {
    throw new Error(`Failed to get countries: ${response.status}`);
  }
  const countries: Country[] = await response.json();
  return countries;
}

export async function getPublicHolidays(
  countryIsoCode: string,
  year: number,
): Promise<PublicHoliday[]> {
  const validFrom = `${year}-01-01`;
  const validTo = `${year}-12-31`;

  const params = new URLSearchParams({
    countryIsoCode,
    validFrom,
    validTo,
    languageIsoCode: "en",
  });

  const url = `https://openholidaysapi.org/PublicHolidays?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to get holidays: ${response.status}`);
  }
  const holidays: PublicHoliday[] = await response.json();
  return holidays;
}
