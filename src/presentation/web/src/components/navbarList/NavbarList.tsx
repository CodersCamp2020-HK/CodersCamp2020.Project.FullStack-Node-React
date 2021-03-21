import React from 'react';
import { Grid } from '@material-ui/core';
import styles from './NavbarList.module.css';
import NavbarListItem from '../NavbarListItem/NavbarListItem';

const NavbarList = () => {
    return (
        <ul className={styles.navbarList}>
            <NavbarListItem text="O nas" path={'/about'} />
            <NavbarListItem text="Adoptuj" path={'/adoption'} />
            <NavbarListItem text="Wesprzyj nas" path={'/donation'} />
            <NavbarListItem text="Kontakt" path={'/contact'} />
        </ul>
    );
};

export default NavbarList;
