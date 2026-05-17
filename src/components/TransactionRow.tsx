import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { WalletTransactionDto } from "../types";
// import { formatDistanceToNow } from 'date-fns'
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

interface Props {
  tx: WalletTransactionDto;
}

const typeConfig = {
  Deposit: {
    color: "success.main",
    bg: "#e8f5e9",
    icon: <ArrowUpwardIcon sx={{ fontSize: 14 }} />,
    label: "Deposit",
  },
  Withdrawal: {
    color: "error.main",
    bg: "#ffebee",
    icon: <ArrowDownwardIcon sx={{ fontSize: 14 }} />,
    label: "Withdrawal",
  },
  InvestmentDebit: {
    color: "warning.main",
    bg: "#fff3e0",
    icon: <TrendingUpIcon sx={{ fontSize: 14 }} />,
    label: "Invested",
  },
  InvestmentReturn: {
    color: "primary.main",
    bg: "#e3f2fd",
    icon: <TrendingUpIcon sx={{ fontSize: 14 }} />,
    label: "Return",
  },
};

const TransactionRow = ({ tx }: Props) => {
  const cfg = typeConfig[tx.type] ?? typeConfig.Deposit;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.5,
        borderBottom: "1px solid background.default",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            bgcolor: cfg.bg,
            color: cfg.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cfg.icon}
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {tx.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {/* {formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })} */}
            {/* {dayjs(tx.createdAt).fromNow(true)} */}
             {new Date(tx.createdAt).toDateString()} 
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="body2" fontWeight={700} color={cfg.color}>
          {tx.type === "Withdrawal" || tx.type === "InvestmentDebit"
            ? "-"
            : "+"}
          {/* ${tx.amount.toFixed(2)} */}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(tx.amount)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Bal:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(tx.balanceAfter)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TransactionRow;
