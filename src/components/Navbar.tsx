import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useThemeMode } from "../ThemeContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        bgcolor: "background.default",
        color: "text.secondary",
        // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ maxWidth: 1400, width: "100%", mx: "auto", px: 3 }}>
        {/* Brand */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
          }}
        >
          <TrendingUpIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
            PatuVest
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>

        {/* Auth nav */}
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={<AccountBalanceWalletIcon sx={{ fontSize: 16 }} />}
              label={new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(user.walletBalance)}
              size="small"
              sx={{
                bgcolor: "#e8f5e9",
                color: "primary.dark",
                fontWeight: 600,
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user.email}
            </Typography>
            <Button
              component={Link}
              to="/wallet"
              variant="outlined"
              size="small"
              sx={{
                borderColor: "primary.main",
                color: "text.secondary",
                textTransform: "none",
                "&:hover": { bgcolor: "primary.dark", color: "#fff" },
              }}
            >
              Wallet
            </Button>
            <Button
              component={Link}
              to="/investments"
              variant="outlined"
              size="small"
              sx={{
                borderColor: "primary.main",
                color: "text.secondary",
                textTransform: "none",
                "&:hover": { bgcolor: "primary.dark", color: "#fff" },
              }}
            >
              Investments
            </Button>
            <Button
              onClick={handleLogout}
              variant="outlined"
              size="small"
              sx={{
                borderColor: "secondary.main",
                color: "secondary.main",
                textTransform: "none",
                "&:hover": { bgcolor: "secondary.dark", color: "#fff" },
              }}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              sx={{ color: "primary.main", textTransform: "none" }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                textTransform: "none",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
