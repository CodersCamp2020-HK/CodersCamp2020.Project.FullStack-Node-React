import React from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import NavbarList from '../navbarList1/NavbarList';
import NavbarLoginBtn from '../navbarLoginBtn1/NavbarLoginBtn';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

const Navbar = () => {
    return (
        <nav>
            <AppBar color="default" position="static">
                <Toolbar>
                    <Link component={RouterLink} to="/">
                        LOGO
                    </Link>
                    <NavbarList />
                    <NavbarLoginBtn />
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Navbar;
