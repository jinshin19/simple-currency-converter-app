interface CurrencyDataStatesI {
  currencies: [string, string][];
  currency_code_left: string;
  currency_code_right: string;
  price: number;
  value: string;
}

interface CurrencyCodesResponseI {
  documentation: string;
  result: string;
  supported_codes: [string, string][];
  terms_of_use: string;
}

interface CurrencyPricesI {
  currencyCode: string;
}

interface CurrencyConversionResponseI {
  base_code: string;
  conversion_rates: { [key: string]: number };
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
}
