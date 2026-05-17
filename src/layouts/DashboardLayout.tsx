import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useThemeMode } from "../ThemeContext";
import { useLogout } from "../hooks/useLogout";
import ProfilePic from "../assets/img/avatar.png";
import {
  DarkModeOutlined,
  DashboardOutlined,
  LightModeOutlined,
  Logout,
  MenuOpenOutlined,
  MenuOutlined,
  MonetizationOnOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  // Typography,
} from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
  const { mode, toggleTheme } = useThemeMode();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          elevation={0}
          position="static"
          sx={{ bgcolor: "background.default", color: "text.secondary" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 0, display: { xs: "none", md: "flex" } }}
              onClick={toggleDrawer(true)}
            >
              {open ? <MenuOpenOutlined /> : <MenuOutlined />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
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
            <Box component="div" sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === "light" ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar alt="Profile Pict" src={ProfilePic} />
              </IconButton>
            </Box>
          </Toolbar>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* <MenuItem onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: "center" }}>Profile</Typography>
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </AppBar>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4, pb: 7 }}>
        {children}
      </Container>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: "block", md: "none" },
        }}
      >
        {/* <p>{value}</p> */}
        <BottomNavigation
          value={location.pathname}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction
            value="/"
            label="Dashboard"
            icon={<DashboardOutlined />}
          />
          <BottomNavigationAction
            value="/wallet"
            label="Wallet"
            icon={<WalletOutlined />}
          />
          <BottomNavigationAction
            value="/investments"
            label="Investment"
            icon={<MonetizationOnOutlined />}
          />
        </BottomNavigation>
      </Box>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/wallet">
                <ListItemIcon>
                  <WalletOutlined />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/investments">
                <ListItemIcon>
                  <MonetizationOnOutlined />
                </ListItemIcon>
                <ListItemText primary="Investments" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DashboardLayout;
