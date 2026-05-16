import { useAuthContext } from "./useAuthContext";
import { useWalletContext } from "./useWalletContext";
import { useInvestmentContext } from "./useInvestmentContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWallet } = useWalletContext();
  const { dispatch: dispatchInvestment } = useInvestmentContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchWallet({ type: "CLEAR_WALLET" });
    dispatchInvestment({ type: "CLEAR_INVESTMENTS" });
  };

  return { logout };
};
