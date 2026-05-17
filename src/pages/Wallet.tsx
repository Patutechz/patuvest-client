import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWalletContext } from "../hooks/useWalletContext";
import TransactionRow from "../components/TransactionRow";
import DashboardLayout from "../layouts/DashboardLayout";

const Wallet = () => {
  const { user, dispatch: authDispatch } = useAuthContext();
  const { wallet, dispatch } = useWalletContext();

  const [fundAmount, setFundAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [fundError, setFundError] = useState<string | null>(null);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [fundSuccess, setFundSuccess] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch wallet on mount
  useEffect(() => {
    const fetchWallet = async () => {
      if (!user) return;
      const response = await fetch(
        // "http://localhost:5145/api/wallet",
        "https://patuvest.azurewebsites.net/api/wallet",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WALLET", payload: json });
      } else {
        setFetchError(
          typeof json === "string" ? json : "Failed to load wallet",
        );
      }
    };
    fetchWallet();
  }, [user, dispatch]);

  const handleFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFundError(null);
    setFundSuccess(null);
    setLoading(true);
    const response = await fetch(
      // "http://localhost:5145/api/wallet/fund",
      "https://patuvest.azurewebsites.net/api/wallet/fund",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount: parseFloat(fundAmount) }),
      },
    );
    const json = await response.json();
    setLoading(false);
    if (!response.ok) {
      setFundError(
        typeof json === "string"
          ? json
          : (json.title ?? "Failed to fund wallet"),
      );
    } else {
      dispatch({ type: "SET_WALLET", payload: json });
      authDispatch({ type: "UPDATE_BALANCE", payload: json.balance });
      // sync localStorage
      const stored = JSON.parse(localStorage.getItem("user") ?? "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, walletBalance: json.balance }),
      );
      setFundSuccess(
        `Successfully deposited $${parseFloat(fundAmount).toFixed(2)}`,
      );
      setFundAmount("");
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setWithdrawError(null);
    setWithdrawSuccess(null);
    setLoading(true);
    const response = await fetch(
      // "http://localhost:5145/api/wallet/withdraw",
      "https://patuvest.azurewebsites.net/api/wallet/withdraw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount: parseFloat(withdrawAmount) }),
      },
    );
    const json = await response.json();
    setLoading(false);
    if (!response.ok) {
      setWithdrawError(
        typeof json === "string" ? json : (json.title ?? "Failed to withdraw"),
      );
    } else {
      dispatch({ type: "SET_WALLET", payload: json });
      authDispatch({ type: "UPDATE_BALANCE", payload: json.balance });
      const stored = JSON.parse(localStorage.getItem("user") ?? "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, walletBalance: json.balance }),
      );
      setWithdrawSuccess(
        `Successfully withdrew $${parseFloat(withdrawAmount).toFixed(2)}`,
      );
      setWithdrawAmount("");
    }
  };

  return (
    <DashboardLayout>
      {/* <Box sx={{ maxWidth: 960, mx: "auto", p: 3 }}> */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <AccountBalanceWalletIcon
          sx={{ color: "primary.main", fontSize: 28 }}
        />
        <Typography variant="h5" fontWeight={700}>
          My Wallet
        </Typography>
      </Box>

      {fetchError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {fetchError}
        </Alert>
      )}

      {/* Balance card */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 3,
          bgcolor: "primary.main",
          color: "#fff",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.85, mb: 0.5 }}>
          Available Balance
        </Typography>
        <Typography variant="h4" fontWeight={500}>
          {/* $
          {wallet
            ? wallet.balance.toFixed(2)
            : (user?.walletBalance.toFixed(2) ?? "—")} */}
          {wallet
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(wallet.balance)
            : "0"}
        </Typography>
      </Paper>

      {/* Fund & Withdraw */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            elevation={2}
            sx={{ p: 3, border: "0px solid #e8e8e8", borderRadius: 3 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <AddIcon sx={{ color: "primary.main" }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Fund Wallet
              </Typography>
            </Box>
            {fundError && (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                {fundError}
              </Alert>
            )}
            {fundSuccess && (
              <Alert severity="success" sx={{ mb: 1.5 }}>
                {fundSuccess}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleFund}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Amount ($)"
                type="number"
                size="small"
                inputProps={{ min: 1, step: "0.01" }}
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "primary.main",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                {loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  "Deposit"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            elevation={2}
            sx={{ p: 3, border: "0px solid #e8e8e8", borderRadius: 3 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <RemoveIcon sx={{ color: "secondary.main" }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Withdraw
              </Typography>
            </Box>
            {withdrawError && (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                {withdrawError}
              </Alert>
            )}
            {withdrawSuccess && (
              <Alert severity="success" sx={{ mb: 1.5 }}>
                {withdrawSuccess}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleWithdraw}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Amount ($)"
                type="number"
                size="small"
                inputProps={{ min: 1, step: "0.01" }}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "secondary.main",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "secondary.dark" },
                }}
              >
                {loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  "Withdraw"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Transaction history */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, md: 4 },
          border: "0px solid #e8e8e8",
          borderRadius: 3,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          Transaction History
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {!wallet && (
          <Typography color="text.secondary" variant="body2">
            Loading transactions…
          </Typography>
        )}
        {wallet && wallet.recentTransactions.length === 0 && (
          <Typography color="text.secondary" variant="body2">
            No transactions yet.
          </Typography>
        )}
        {wallet &&
          wallet.recentTransactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
      </Paper>
      {/* </Box> */}
    </DashboardLayout>
  );
};

export default Wallet;
