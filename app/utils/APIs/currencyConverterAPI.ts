import { useAxiosBaseURL } from "./baseUrl";

export const useGetCurrencyCodesAPI = async (): Promise<
  CurrencyCodesResponseI | undefined
> => {
  try {
    const response = await useAxiosBaseURL.get(`/codes`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useGetCurrencyPricesAPI = async ({
  currencyCode,
}: CurrencyPricesI): Promise<CurrencyConversionResponseI | undefined> => {
  try {
    const response = await useAxiosBaseURL.get(`/latest/${currencyCode}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
