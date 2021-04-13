import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InputIcon from '@material-ui/icons/Input';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PetsIcon from '@material-ui/icons/Pets';
import ReceiptIcon from '@material-ui/icons/Receipt';
import React from 'react';
import theme from '../../../themes/theme';
import { UserType } from '../../../client/index';
import { Link as RouterLink } from 'react-router-dom';
import { Hidden, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
    },
    list: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            paddingTop: 8,
        },
    },
    listItemIcon: {
        [theme.breakpoints.down('xs')]: {
            minWidth: 'inherit',
        },
    },
}));

interface Props {
    name: string;
    role: UserType;
}

const ListItem = withStyles({
    root: {
        '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.common.white,
        },
        '&.Mui-selected svg': {
            fill: theme.palette.common.white,
        },
        // width: 300,
        // backgroundColor: 'blue',
    },
})(MuiListItem);

const SideNavList: React.FC<Props> = ({ name, role }) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    const textUser = [
        { key: 1, path: '/account/adoption', name: 'Adopcja', icon: <PetsIcon color="primary" /> },
        { key: 2, path: '/account/volunteer', name: 'Wolontariusz', icon: <FavoriteIcon color="primary" /> },
        { key: 3, path: '/account/profile', name: 'Mój profil', icon: <PersonIcon color="primary" /> },
        { key: 4, path: '/auth/logout', name: 'Wyloguj', icon: <InputIcon color="primary" /> },
    ];

    const textWorker = [
        { key: 1, path: '/account/animals', name: 'Zwierzęta', icon: <PetsIcon color="primary" /> },
        { key: 2, path: '/account/applications', name: 'Wnioski', icon: <ReceiptIcon color="primary" /> },
        { key: 3, path: '/account/volunteers', name: 'Wolontariusze', icon: <PeopleIcon color="primary" /> },
        { key: 4, path: '/account/calendar', name: 'Kalendarz', icon: <CalendarTodayIcon color="primary" /> },
        { key: 5, path: '/account/profile', name: 'Mój Profil', icon: <PersonIcon color="primary" /> },
        { key: 6, path: '/auth/logout', name: 'Wyloguj', icon: <InputIcon color="primary" /> },
    ];

    const textAdmin = Array.from(textWorker);
    textAdmin[2] = { key: 3, path: '/account/users', name: 'Użytkownicy', icon: <PeopleIcon color="primary" /> };

    const userRole =
        role === 'normal' ? textUser : role === 'employee' ? textWorker : role === 'volunteer' ? textUser : textAdmin;

    return (
        <Paper className={classes.root} variant="outlined" square={false}>
            <List
                className={classes.list}
                subheader={
                    <Hidden xsDown>
                        <ListSubheader color="primary">
                            <h3>Cześć {name}!</h3>
                        </ListSubheader>
                    </Hidden>
                }
                component="nav"
            >
                {userRole.map((t) => (
                    <Link component={RouterLink} to={t.path} key={t.key}>
                        <ListItem
                            button
                            selected={selectedIndex === t.key}
                            onClick={(event) => handleListItemClick(event, t.key)}
                        >
                            <ListItemIcon className={classes.listItemIcon}>{t.icon}</ListItemIcon>
                            <Hidden xsDown>
                                <ListItemText primary={t.name} />
                            </Hidden>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Paper>
    );
};

export default SideNavList;
