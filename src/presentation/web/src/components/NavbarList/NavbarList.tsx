import React from 'react';
import NavbarListItem from '../NavbarListItem/NavbarListItem';
import styles from './NavbarList.module.css';

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
