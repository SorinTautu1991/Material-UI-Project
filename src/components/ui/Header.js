import React, { useState, useEffect, useMemo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import logo from "../../assets/logo.svg";

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: { marginBottom: "2em" },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: { backgroundColor: theme.palette.common.blue },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": { opacity: 1 },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const menuOptions = useMemo(
    () => [
      { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: "Mobile App Development",
        link: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 2,
      },
      {
        name: "Website development",
        link: "/websites",
        activeIndex: 1,
        selectedIndex: 3,
      },
    ],
    []
  );

  const routes = useMemo(
    () => [
      { name: "Home", link: "/", activeIndex: 0 },
      {
        name: "Services",
        link: "/services",
        activeIndex: 1,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        mouseOver: (e) => handleClick(e),
      },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "About us", link: "/about", activeIndex: 3 },
      { name: "Contact us", link: "/contact", activeIndex: 4 },
    ],
    [anchorEl]
  );

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.activeIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  const handleChange = (e, index) => {
    setValue(index);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const tabs = (
    <>
      <Tabs
        onChange={handleChange}
        value={value}
        className={classes.tabContainer}
        indicatorColor="secondary"
      >
        {routes.map((route, index) => {
          return (
            <Tab
              key={`${route.name}-${index}`}
              className={classes.tab}
              component={Link}
              to={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
            />
          );
        })}
      </Tabs>

      <Button variant="contained" color="secondary" className={classes.button}>
        Free estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => {
          return (
            <MenuItem
              component={Link}
              to={option.link}
              classes={{ root: classes.menuItem }}
              key={`${option.link}-${i}`}
              onClick={(event) => {
                handleMenuItemClick(event, i);
                setValue(1);
                handleClose();
              }}
              selected={i === selectedIndex && value === 1}
            >
              {option.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, index) => {
            return (
              <ListItem
                key={`${route.name}-${index}`}
                divider
                button
                component={Link}
                to={route.link}
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            );
          })}

          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            selected={value === 5}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img className={classes.logo} src={logo} alt="logo" />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
