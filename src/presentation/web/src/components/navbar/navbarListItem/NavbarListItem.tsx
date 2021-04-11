import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type View = 'mobile' | 'desktop';

interface Props {
    text: string;
    path: string;
    view?: View;
}

const useStyles = makeStyles({
    mobile: {
        padding: '20px',
    },
    desktop: {
        marginRight: '16px',
    },
    link: {
        padding: '10px',
    },
});

const NavbarListItem: React.FC<Props> = ({ text, path, view }) => {
    const classes = useStyles();
    return (
        <li className={view === 'mobile' ? classes.mobile : classes.desktop}>
            <Link className={classes.link} variant="button" color="primary" component={RouterLink} to={path}>
                {text}
            </Link>
        </li>
    );
};

export default NavbarListItem;
