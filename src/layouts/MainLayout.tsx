import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOpenOutlined,
  MenuOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeMode } from "../ThemeContext";
type LayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: LayoutProps) => {
  const { mode, toggleTheme } = useThemeMode();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <AppBar
        elevation={0}
        enableColorOnDark
        position="static"
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <TrendingUpOutlined
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "primary.main",
                fontSize: 28,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/login"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Patu
              <Typography color="primary" variant="inherit">
                Vest
              </Typography>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                sx={{ p: 0 }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                {open ? <MenuOpenOutlined /> : <MenuOutlined />}
              </IconButton>
            </Box>
            <TrendingUpOutlined
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: "primary.main",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/login"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Patu{" "}
              <Typography color="primary" variant="inherit">
                Vest
              </Typography>
            </Typography>
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                size="small"
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                Home
              </Button>
              <Button
                size="small"
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                About
              </Button>
              <Button
                size="small"
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                Contact
              </Button>
            </Box> */}
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <IconButton
                onClick={toggleTheme}
                sx={{ color: "text.secondary" }}
              >
                {mode === "light" ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "text.secondary" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  bgcolor: "primary.main",
                  //   textTransform: "none",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      
        {children}
    

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            bgcolor: "background.default",
            color: "text.primary",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {/* <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained" component={Link} to="/signup">
                Register
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MainLayout;
