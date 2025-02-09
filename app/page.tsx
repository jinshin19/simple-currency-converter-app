"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useGetCurrencyCodesAPI,
  useGetCurrencyPricesAPI,
} from "./utils/APIs/currencyConverterAPI";

export default function page() {
  const [currencyDataStates, SetCurrencyDataStates] =
    useState<CurrencyDataStatesI>({
      currencies: [],
      currency_code_left: "AED",
      currency_code_right: "AED",
      price: 1,
      value: "1",
    });

  const currencyCodeOnchangeHandler = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "currency_codes_left") {
    }
    SetCurrencyDataStates((prev) => ({
      ...prev,
      ...(name === "currency_codes_left" && { currency_code_left: value }),
      ...(name === "currency_codes_right" && { currency_code_right: value }),
      ...(name === "input_value" && { value: value }),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await useGetCurrencyCodesAPI();
      if (data?.supported_codes === undefined || data === undefined) {
        throw new Error("Failed to fetch the currency codes");
      }
      SetCurrencyDataStates((prev) => ({
        ...prev,
        currencies: data.supported_codes,
      }));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currencyDataStates.value !== "") {
      const fetchData = async () => {
        const data = await useGetCurrencyPricesAPI({
          currencyCode: currencyDataStates.currency_code_left,
        });
        if (data?.result === "success") {
          const getRate =
            data?.conversion_rates[currencyDataStates.currency_code_right];
          SetCurrencyDataStates((prev) => ({
            ...prev,
            price: parseInt(currencyDataStates.value) * getRate,
          }));
        }
      };
      fetchData();
    }
  }, [
    currencyDataStates.value,
    currencyDataStates.currency_code_left,
    currencyDataStates.currency_code_right,
  ]);

  return (
    <div className="w-full px-3">
      <h1 className="block p-10 text-center font-bold text-xl">
        Simple Currency Converter App
      </h1>
      <div>
        <div className="flex justify-center gap-2 sm:flex-nowrap xs:flex-wrap">
          <select
            name="currency_codes_left"
            id="currency_codes_left"
            className="border p-2 rounded-sm xs:w-full"
            onChange={currencyCodeOnchangeHandler}
          >
            {currencyDataStates.currencies.map(([code, name]) => {
              return (
                <option key={code} value={code}>{`${name} (${code})`}</option>
              );
            })}
          </select>
          <select
            name="currency_codes_right"
            id="currency_codes_right"
            className="border p-2 rounded-sm xs:w-full"
            onChange={currencyCodeOnchangeHandler}
          >
            {currencyDataStates.currencies.map(([code, name]) => {
              return (
                <option key={code} value={code}>{`${name} (${code})`}</option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-center flex-wrap mt-5">
          <input
            type="text"
            name="input_value"
            className="p-2 border w-1/2 px-3 rounded-sm focus:outline-none"
            placeholder="Put amount here"
            onChange={currencyCodeOnchangeHandler}
          />
        </div>
        <div className="text-center p-3 font-bold text-lg">
          {`${currencyDataStates.value} ${
            currencyDataStates.currency_code_left
          } is equal of ${currencyDataStates.price.toFixed(2)} ${
            currencyDataStates.currency_code_right
          }`}
        </div>
      </div>
    </div>
  );
}
