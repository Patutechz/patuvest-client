import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { useInvestmentContext } from "../hooks/useInvestmentContext";
import { useWalletContext } from "../hooks/useWalletContext";
import type { InvestmentPlanDto } from "../types";
import InvestmentCard from "../components/InvestmentCard";
import DashboardLayout from "../layouts/DashboardLayout";

const Investments = () => {
  const { user, dispatch: authDispatch } = useAuthContext();
  const { investments, dispatch } = useInvestmentContext();
  const { dispatch: walletDispatch } = useWalletContext();

  const [plans, setPlans] = useState<InvestmentPlanDto[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [myLoading, setMyLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Dialog state
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlanDto | null>(
    null,
  );
  const [amount, setAmount] = useState("");
  const [investing, setInvesting] = useState(false);
  const [investError, setInvestError] = useState<string | null>(null);

  // Load plans (public endpoint)
  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch("https://patuvest.azurewebsites.net/api/investment/plans");
      const json = await res.json();
      setPlansLoading(false);
      if (res.ok) setPlans(json);
      else setError("Failed to load investment plans");
    };
    fetchPlans();
  }, []);

  // Load my investments
  useEffect(() => {
    const fetchMine = async () => {
      if (!user) return;
      const res = await fetch(
        "https://patuvest.azurewebsites.net/api/investment/my-investments",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      const json = await res.json();
      setMyLoading(false);
      if (res.ok) dispatch({ type: "SET_INVESTMENTS", payload: json });
    };
    fetchMine();
  }, [user, dispatch]);

  const handleInvest = async () => {
    if (!user || !selectedPlan) return;
    setInvesting(true);
    setInvestError(null);
    const res = await fetch("https://patuvest.azurewebsites.net/api/investment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        planId: selectedPlan.id,
        amount: parseFloat(amount),
      }),
    });
    const json = await res.json();
    setInvesting(false);
    if (!res.ok) {
      setInvestError(
        typeof json === "string" ? json : (json.title ?? "Investment failed"),
      );
    } else {
      dispatch({ type: "ADD_INVESTMENT", payload: json });
      // Deduct from wallet context & auth balance
      const newBalance = user.walletBalance - parseFloat(amount);
      authDispatch({ type: "UPDATE_BALANCE", payload: newBalance });
      const stored = JSON.parse(localStorage.getItem("user") ?? "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, walletBalance: newBalance }),
      );
      // Re-fetch wallet to get updated transactions
      const walletRes = await fetch("https://patuvest.azurewebsites.net/api/wallet", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (walletRes.ok) {
        const walletJson = await walletRes.json();
        walletDispatch({ type: "SET_WALLET", payload: walletJson });
      }
      setSuccess(
        `Invested $${parseFloat(amount).toFixed(2)} in ${selectedPlan.name}!`,
      );
      setSelectedPlan(null);
      setAmount("");
    }
  };

  return (
    <DashboardLayout>
      {/* <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}> */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <TrendingUpIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>
          Investments
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      {/* Investment Plans */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
        Available Plans
      </Typography>
      {plansLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "primary.main" }} />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={plan.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2.5,
                  border: "0px solid #e8e8e8",
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    {plan.name}
                  </Typography>
                  <Chip
                    label={`${(plan.returnRate * 100).toFixed(1)}% ROI`}
                    size="small"
                    sx={{
                      bgcolor: "#e8f5e9",
                      color: "primary.light",
                      fontWeight: 700,
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {plan.description}
                </Typography>
                <Divider sx={{ my: 0.5 }} />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1,
                    flexGrow: 1,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Min
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(plan.minimumAmount)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Max
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(plan.maximumAmount)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {plan.durationDays} days
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={plan.isActive ? "primary.main" : "secondary.main"}
                    >
                      {plan.isActive ? "Active" : "Inactive"}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!plan.isActive || !user}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setInvestError(null);
                    setAmount("");
                  }}
                  sx={{
                    mt: 1,
                    bgcolor: "primary.main",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  {user ? "Invest Now" : "Login to Invest"}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* My Investments */}
      {user && (
        <>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            My Investments
          </Typography>
          {myLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress sx={{ color: "primary.main" }} />
            </Box>
          ) : investments && investments.length > 0 ? (
            <Grid container spacing={2}>
              {investments.map((inv) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={inv.id}>
                  <InvestmentCard investment={inv} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper
              elevation={2}
              sx={{
                p: 4,
                border: "0px solid #e8e8e8",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography color="text.secondary">
                You have no investments yet. Pick a plan above!
              </Typography>
            </Paper>
          )}
        </>
      )}

      {/* Invest Dialog */}
      <Dialog
        open={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Invest in {selectedPlan?.name}
        </DialogTitle>
        <DialogContent>
          {investError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {investError}
            </Alert>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Min: ${selectedPlan?.minimumAmount.toFixed(0)} · Max: $
            {selectedPlan?.maximumAmount.toFixed(0)} · ROI:{" "}
            {((selectedPlan?.returnRate ?? 0) * 100).toFixed(1)}%
          </Typography>
          <TextField
            label="Amount ($)"
            type="number"
            fullWidth
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputProps={{
              min: selectedPlan?.minimumAmount,
              max: selectedPlan?.maximumAmount,
              step: "0.01",
            }}
            helperText={`Your wallet balance: $${user?.walletBalance.toFixed(2)}`}
          />
          {amount && selectedPlan && (
            <Box sx={{ mt: 2, p: 1.5, bgcolor: "#f9f9f9", borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Expected return:{" "}
                <strong style={{ color: "text.secondary" }}>
                  $
                  {(
                    parseFloat(amount) +
                    parseFloat(amount) * selectedPlan.returnRate
                  ).toFixed(2)}
                </strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Matures in {selectedPlan.durationDays} days
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setSelectedPlan(null)}
            sx={{ color: "#666", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={investing || !amount}
            onClick={handleInvest}
            sx={{
              bgcolor: "primary.main",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {investing ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Confirm Investment"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {/* </Box> */}
    </DashboardLayout>
  );
};

export default Investments;
