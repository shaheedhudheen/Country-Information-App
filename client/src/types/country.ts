export interface Country {
  name: {
    common: string;
    official: string;
    // nativeName?: { [key: string]: { official: string; common: string } };
  };
  cca2: string;
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
  };
  currencies?: { [key: string]: { name: string; symbol?: string } };
  languages?: { [key: string]: string };
  timezones?: string[];
}
