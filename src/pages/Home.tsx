import { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWalletContext } from "../hooks/useWalletContext";
import { useInvestmentContext } from "../hooks/useInvestmentContext";
import TransactionRow from "../components/TransactionRow";
import InvestmentCard from "../components/InvestmentCard";
import DashboardLayout from "../layouts/DashboardLayout";

const StatCard = ({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) => (
  <Paper
    elevation={1}
    sx={{ p: 2.5, border: "0px solid #e8e8e8", borderRadius: 3 }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
      <Box sx={{ color, display: "flex" }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
    <Typography variant="h6" fontWeight={800}>
      {value}
    </Typography>
    {sub && (
      <Typography variant="caption" color="text.secondary">
        {sub}
      </Typography>
    )}
  </Paper>
);

const Home = () => {
  const { user } = useAuthContext();
  const { wallet, dispatch: walletDispatch } = useWalletContext();
  const { investments, dispatch: investDispatch } = useInvestmentContext();

  useEffect(() => {
    if (!user) return;

    const fetchWallet = async () => {
      const res = await fetch("https://patuvest.azurewebsites.net/api/wallet", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok)
        walletDispatch({ type: "SET_WALLET", payload: await res.json() });
    };

    const fetchInvestments = async () => {
      const res = await fetch(
        "https://patuvest.azurewebsites.net/api/investment/my-investments",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      if (res.ok)
        investDispatch({ type: "SET_INVESTMENTS", payload: await res.json() });
    };

    fetchWallet();
    fetchInvestments();
  }, [user, walletDispatch, investDispatch]);

  const activeCount =
    investments?.filter((i) => i.status === "Active").length ?? 0;
  const totalInvested =
    investments?.reduce((s, i) => s + i.amountInvested, 0) ?? 0;
  const expectedTotal =
    investments?.reduce((s, i) => s + i.expectedReturn, 0) ?? 0;

  return (
    <DashboardLayout>
      {/* <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}> */}
      {/* Welcome */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          Welcome back, {user?.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here's an overview of your portfolio.
        </Typography>
      </Box>

      {/* Stat cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<AccountBalanceWalletIcon />}
            label="Wallet Balance"
            // value={`$${wallet ? wallet.balance.toFixed(2) : (user?.walletBalance.toFixed(2) ?? "—")}`}
            value={
              wallet
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(wallet.balance)
                : "0"
            }
            sub="Available to invest"
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<TrendingUpIcon />}
            label="Active Investments"
            value={String(activeCount)}
            sub="Currently running"
            color="secondary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<ShowChartIcon />}
            label="Total Invested"
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalInvested)}
            sub="Across all plans"
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<TrendingUpIcon />}
            label="Expected Returns"
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(expectedTotal)}
            sub="On maturity"
            color="info.main"
          />
        </Grid>
      </Grid>

      {/* Two-column layout */}
      <Grid container spacing={3}>
        {/* Recent transactions */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={1}
            sx={{  p: { xs: 1, md: 4 }, border: "0px solid #e8e8e8", borderRadius: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                Recent Transactions
              </Typography>
              <Button
                component={Link}
                to="/wallet"
                size="small"
                sx={{ color: "primary.main", textTransform: "none" }}
              >
                View all
              </Button>
            </Box>
            <Divider sx={{ mb: 1 }} />
            {!wallet && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={24} sx={{ color: "primary.main" }} />
              </Box>
            )}
            {wallet && wallet.recentTransactions.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No transactions yet.
              </Typography>
            )}
            {wallet &&
              wallet.recentTransactions
                .slice(0, 5)
                .map((tx) => <TransactionRow key={tx.id} tx={tx} />)}
          </Paper>
        </Grid>

        {/* Active investments */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={1}
            sx={{  p: { xs: 1, md: 4 }, border: "0px solid #e8e8e8", borderRadius: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                Active Investments
              </Typography>
              <Button
                component={Link}
                to="/investments"
                size="small"
                sx={{ color: "primary.main", textTransform: "none" }}
              >
                Invest more
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {!investments && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={24} sx={{ color: "primary.main" }} />
              </Box>
            )}
            {investments &&
              investments.filter((i) => i.status === "Active").length === 0 && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    No active investments.
                  </Typography>
                  <Button
                    component={Link}
                    to="/investments"
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      textTransform: "none",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    Browse Plans
                  </Button>
                </Box>
              )}
            {investments &&
              investments
                .filter((i) => i.status === "Active")
                .slice(0, 3)
                .map((inv) => (
                  <Box key={inv.id} sx={{ mb: 2 }}>
                    <InvestmentCard investment={inv} />
                  </Box>
                ))}
          </Paper>
        </Grid>
      </Grid>
      {/* </Box> */}
    </DashboardLayout>
  );
};

export default Home;
