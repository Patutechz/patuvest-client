import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import type { RegisterDto } from "../types";
import MainLayout from "../layouts/MainLayout";

const Signup = () => {
  const [form, setForm] = useState<RegisterDto>({
    firstname: "",
    lastname: "",
    address: "",
    country: "",
    phone: "",
    username: "",
    email: "",
    password: "",
  });
  const { signup, isLoading, error } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(form);
  };

  const field = (
    name: keyof RegisterDto,
    label: string,
    type = "text",
    half = false,
  ) => (
    <Grid size={{ xs: 12, sm: half ? 6 : 12 }}>
      <TextField
        label={label}
        name={name}
        type={type}
        fullWidth
        size="small"
        value={form[name]}
        onChange={handleChange}
        required
      />
    </Grid>
  );

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 520,
            p: 4,
            // border: "1px solid #e8e8e8",
            // borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <TrendingUpIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h5" fontWeight={700}>
              Create Account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {field("firstname", "First Name", "text", true)}
              {field("lastname", "Last Name", "text", true)}
              {field("username", "Username")}
              {field("email", "Email Address", "email")}
              {field("phone", "Phone Number", "tel")}
              {field("address", "Address")}
              {field("country", "Country")}
              {field("password", "Password", "password")}
              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    bgcolor: "primary.main",
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, textAlign: "center" }}
          >
            Already have an account?{" "}
            <Box
              component={Link}
              to="/login"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Log in
            </Box>
          </Typography>
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default Signup;
