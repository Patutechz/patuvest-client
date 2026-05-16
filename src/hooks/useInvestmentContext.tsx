import { useContext } from "react";
import { InvestmentContext } from "../context/InvestmentContext";

export const useInvestmentContext = () => {
  const context = useContext(InvestmentContext);
  if (!context)
    throw new Error(
      "useInvestmentContext must be used inside InvestmentContextProvider",
    );
  return context;
};
