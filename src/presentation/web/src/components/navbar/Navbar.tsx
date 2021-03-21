import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarList from '../NavbarList/NavbarList';
import NavbarLoginBtn from '../navbarLoginButton/NavbarLoginBtn';

const Navbar = () => {
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
            <AppBar color="default" position="static">
                <Toolbar>
                    <Link component={RouterLink} to="/">
                        LOGO
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
                    <NavbarLoginBtn />
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Navbar;
