import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import MuiListItem from "@material-ui/core/ListItem";
// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PetsIcon from '@material-ui/icons/Pets';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import InputIcon from '@material-ui/icons/Input';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ReceiptIcon from '@material-ui/icons/Receipt';
import theme from '../../themes/theme';
import { compareSync } from 'bcrypt';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 257,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
    },
    listItemText: {
        color: 'white',
    }
}));

interface Props {
    name: string;
    user: string;
}

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.common.white,
        },
        selected: {}
    },
})(MuiListItem);





const SideNavList: React.FC<Props> = ({ name, user }) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const textUser = [
        { key: 1, name: "Aopcja", icon: <PetsIcon color="primary" /> },
        { key: 2, name: "Wolontariusz", icon: <FavoriteIcon color="primary" /> },
        { key: 3, name: "Mój profil", icon: <PersonIcon color="primary" /> },
        { key: 4, name: "Wyloguj", icon: <InputIcon color="primary" /> },
    ];

    const textWorker = [
        { key: 1, name: "Zwierzęta", icon: <PetsIcon color="primary" /> },
        { key: 2, name: "Wnioski", icon: <ReceiptIcon color="primary" /> },
        { key: 3, name: "Wolontariusze", icon: <PeopleIcon color="primary" /> },
        { key: 4, name: "Kalendarz", icon: <CalendarTodayIcon color="primary" /> },
        { key: 5, name: "Mój Profil", icon: <PersonIcon color="primary" /> },
        { key: 6, name: "Wyloguj", icon: <InputIcon color="primary" /> },
    ];

    const textAdmin = [
        { key: 1, name: "Zwierzęta", icon: <PetsIcon color="primary" /> },
        { key: 2, name: "Wnioski", icon: <ReceiptIcon color="primary" /> },
        { key: 3, name: "Użytkownicy", icon: <PeopleIcon color="primary" /> },
        { key: 4, name: "Kalendarz", icon: <CalendarTodayIcon color="primary" /> },
        { key: 5, name: "Mój Profil", icon: <PersonIcon color="primary" /> },
        { key: 6, name: "Wyloguj", icon: <InputIcon color="primary" /> },
    ];


    return (
        <div className={classes.root}>
            <List subheader={<ListSubheader color="primary">Cześć {name}!</ListSubheader>} component="nav">
                {(user === "normalUser" ? textUser :
                    user === "workerUser" ? textWorker : textAdmin).map(t => (
                        <ListItem key={t.key}
                            button
                            selected={selectedIndex === t.key}
                            onClick={(event) => handleListItemClick(event, t.key)}>
                            <ListItemIcon>
                                {t.icon}
                            </ListItemIcon>
                            <ListItemText className={classes.listItemText} primary={t.name} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};

export default SideNavList;