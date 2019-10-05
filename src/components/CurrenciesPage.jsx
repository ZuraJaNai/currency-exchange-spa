import React from "react";
import BaseCurrency from "./BaseCurrency";
import CurrenciesList from "./CurrenciesList";

const CurrenciesPage = () => {
  return (
    <div>
      <BaseCurrency />
      <CurrenciesList />
    </div>
  );
};

export default CurrenciesPage;
