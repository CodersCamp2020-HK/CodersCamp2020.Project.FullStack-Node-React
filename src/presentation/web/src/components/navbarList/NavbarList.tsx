import { makeStyles } from '@material-ui/styles';
import React from 'react';
import NavbarListItem from '../NavbarListItem/NavbarListItem';

type View = 'mobile' | 'desktop';

interface Props {
    view: View;
}

const useStyles = makeStyles({
    mobile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
    },
    desktop: {
        display: 'flex',
        marginLeft: 'auto',
    },
});

const NavbarList: React.FC<Props> = ({ view }) => {
    const classes = useStyles();
    return (
        <ul className={view === 'mobile' ? classes.mobile : classes.desktop}>
            <NavbarListItem text="O nas" path={'/about'} view={view} />
            <NavbarListItem text="Adoptuj" path={'/adoption'} view={view} />
            <NavbarListItem text="Wesprzyj nas" path={'/donation'} view={view} />
            <NavbarListItem text="Kontakt" path={'/contact'} view={view} />
        </ul>
    );
};

export default NavbarList;
