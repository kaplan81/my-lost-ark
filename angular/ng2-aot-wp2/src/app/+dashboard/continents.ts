export interface Continent {
    denomination: string;
    population: number;
    realPopulation: number;
    countries: number;
}
export const continents: Continent[] = [
    { denomination: 'asia', population: 60, realPopulation: 4164252000, countries: 48 },
    { denomination: 'northAmerica', population: 5, realPopulation: 	565265000 , countries: 3 },
    { denomination: 'southAmerica', population: 9, realPopulation: 	410013492, countries: 12 },
    { denomination: 'oceania', population: 1, realPopulation: 36659000, countries: 14 },
    { denomination: 'africa', population: 15, realPopulation: 1000000000, countries: 54 },
    { denomination: 'europe', population: 12, realPopulation: 742452000, countries: 50}
];