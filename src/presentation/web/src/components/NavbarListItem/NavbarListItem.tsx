import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import theme from '../../themes/theme';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    text: string;
    path: string;
}

const NavbarListItem: React.FC<Props> = ({ text, path }) => {
    return (
        <li>
            <Link variant="button" color="primary" component={RouterLink} to={path}>
                {text}
            </Link>
        </li>
    );
};

export default NavbarListItem;
