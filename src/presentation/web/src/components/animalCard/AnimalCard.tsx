import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 15,
        border: `1px solid ${theme.palette.grey[200]}`,
        transition: 'all 0.15s ease-in-out',
        backgroundColor: theme.palette.common.white,
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.1)',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.1)',
        },
    },
    content: {
        height: 200,
    },
    media: {
        height: 300,
    },
}));

interface Props {
    id: number;
    name: string;
    description: string;
    photoURL: string;
}

const AnimalCard: React.FC<Props> = ({ id, name, description, photoURL }) => {
    const classes = useStyles();
    return (
        <Link component={RouterLink} to={`animals/${id}`}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`data:image/png;base64,${photoURL}`}
                        title="Adoptuj mnie"
                    />
                    <CardContent className={classes.content}>
                        <Typography color="textPrimary" gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default AnimalCard;
