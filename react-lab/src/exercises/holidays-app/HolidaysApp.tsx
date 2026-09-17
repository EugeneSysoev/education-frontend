import { useQuery } from "@tanstack/react-query";
import { getCountries, getPublicHolidays } from "./api";
import { useState } from "react";

export function HolidaysApp() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("NL");

  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const currentYear = new Date().getFullYear();

  const holidaysQuery = useQuery({
    queryKey: ["public-holidays", selectedCountryCode, currentYear],
    queryFn: () => getPublicHolidays(selectedCountryCode, currentYear),
  });

  if (countriesQuery.status === "pending") {
    return <p>Loading countries...</p>;
  }

  if (countriesQuery.status === "error") {
    return <p>{countriesQuery.error.message}</p>;
  }

  return (
    <>
      <label>
        Country:
        <select
          value={selectedCountryCode}
          onChange={(event) => {
            setSelectedCountryCode(event.target.value);
          }}
        >
          {countriesQuery.data.map((country) => (
            <option value={country.isoCode} key={country.isoCode}>
              {country.name[0]?.text ?? country.isoCode}
            </option>
          ))}
        </select>
      </label>
      <p>Selected country: {selectedCountryCode}</p>

      {holidaysQuery.isPending && <p>Loading holidays...</p>}

      {holidaysQuery.isError && (
        <p>Failed to load holidays: {holidaysQuery.error.message}</p>
      )}

      {holidaysQuery.isSuccess && holidaysQuery.data.length === 0 && (
        <p>No holidays found.</p>
      )}

      {holidaysQuery.isSuccess && holidaysQuery.data.length > 0 && (
        <section>
          <p>Loaded: {holidaysQuery.data.length} holidays</p>
          <ul>
            {holidaysQuery.data.map((holiday) => (
              <li key={holiday.id}>
                {holiday.name[0]?.text ?? "Unnamed holiday"}
                {" — "}
                {holiday.startDate}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
