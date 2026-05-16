import { Box, Typography, Chip, LinearProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { InvestmentDto } from "../types";
// import { format } from 'date-fns'
import dayjs from "dayjs";

interface Props {
  investment: InvestmentDto;
}

const statusColor: Record<string, { bg: string; color: string }> = {
  Active: { bg: "#e8f5e9", color: "primary.main" },
  Matured: { bg: "#e3f2fd", color: "primary.main" },
  Cancelled: { bg: "#ffebee", color: "error.main" },
};

const InvestmentCard = ({ investment }: Props) => {
  const cfg = statusColor[investment.status] ?? statusColor.Active;
  const totalDays = Math.round(
    (new Date(investment.maturityDate).getTime() -
      new Date(investment.createdAt).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const elapsed = totalDays - investment.daysRemaining;
  const progress =
    totalDays > 0 ? Math.min(100, (elapsed / totalDays) * 100) : 100;

  return (
    <Box
      sx={{
        // bgcolor: '#fff',
        borderRadius: 2,
        p: 2.5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* accent bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: "100%",
          bgcolor: "primary.main",
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TrendingUpIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700}>
            {investment.planName}
          </Typography>
        </Box>
        <Chip
          label={investment.status}
          size="small"
          sx={{ bgcolor: cfg.bg, color: cfg.color, fontWeight: 600 }}
        />
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 2 }}
      >
        {investment.planDescription}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            Invested
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(investment.amountInvested)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Expected Return
          </Typography>
          <Typography variant="body1" fontWeight={700} color="primary.main">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(investment.expectedReturn)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Return Rate
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {(investment.returnRate * 100).toFixed(1)}%
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Maturity Date
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {/* {format(new Date(investment.maturityDate), 'MMM d, yyyy')} */}
            {dayjs(investment.maturityDate).format("YYYY-MM-DD")}
          </Typography>
        </Box>
      </Box>

      {investment.status === "Active" && (
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {investment.daysRemaining} day
              {investment.daysRemaining !== 1 ? "s" : ""} left
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              borderRadius: 4,
              height: 6,
              bgcolor: "#e8f5e9",
              "& .MuiLinearProgress-bar": { bgcolor: "primary.main" },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default InvestmentCard;
