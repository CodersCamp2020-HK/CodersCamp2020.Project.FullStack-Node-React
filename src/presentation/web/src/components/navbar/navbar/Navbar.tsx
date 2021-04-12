import React, { useEffect, useState, useContext } from 'react';
import { Theme, useTheme } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarLoginBtn from '../navbarLoginButton/NavbarLoginBtn';
import NavbarList from '../navbarList/NavbarList';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../logo/Logo';
import { AppCtx } from '../../../App';
import MyAccBtn from '../../myAccBtn/MyAccBtn';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
}));

const Navbar = () => {
    const appContext = useContext(AppCtx);

    const theme = useTheme();
    const classes = useStyles();
    const [mobileView, setMobileView] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const checkView = () => {
        window.innerWidth < 900 ? setMobileView(true) : setMobileView(false);
    };

    const show = () => {
        setShowDrawer(true);
    };
    const hide = () => {
        setShowDrawer(false);
    };

    useEffect(() => {
        checkView();
        window.addEventListener('resize', checkView);
    }, []);

    return (
        <nav>
            <AppBar className={classes.root} position="fixed">
                <Toolbar>
                    <Link component={RouterLink} to="/">
                        <Logo
                            width={140}
                            height={70}
                            color1={theme.palette.primary.light}
                            color2={theme.palette.primary.dark}
                        />
                    </Link>
                    {mobileView ? (
                        <IconButton onClick={show} color="primary" style={{ marginLeft: 'auto' }}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <NavbarList view="desktop" />
                    )}
                    <Drawer anchor="left" open={showDrawer} onClose={hide}>
                        <NavbarList view="mobile" />
                    </Drawer>
                    {appContext.appState.userId === null ? (
                        <Link component={RouterLink} to="/auth">
                            <NavbarLoginBtn />
                        </Link>
                    ) : (
                        <Link component={RouterLink} to="/account">
                            <MyAccBtn />
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Navbar;
