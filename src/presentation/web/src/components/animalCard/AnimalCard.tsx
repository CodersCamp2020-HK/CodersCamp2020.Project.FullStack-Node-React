import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import formatDate from '../../utils/formatText/formatDate';

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
    content1: {
        height: 195,
    },
    content2: {},
    media: {
        height: 300,
    },
}));

type GalleryType = 1 | 2 | 3;

interface Props {
    id: number;
    name: string;
    description: string;
    photoURL: string;
    galleryType: GalleryType;
    admissionToShelter: string;
}

const AnimalCard: React.FC<Props> = ({ id, name, description, photoURL, galleryType, admissionToShelter }) => {
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
                    {galleryType === 1 ? (
                        <CardContent className={classes.content1}>
                            <Typography color="textPrimary" gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    ) : galleryType === 2 ? (
                        <CardContent className={classes.content2}>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                {`Numer Ewidencyjny: ${id}`}
                            </Typography>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                {`Data przyjęcia: ${formatDate(admissionToShelter)}`}
                            </Typography>
                        </CardContent>
                    ) : (
                        galleryType === 3 && <div></div>
                    )}
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default AnimalCard;
