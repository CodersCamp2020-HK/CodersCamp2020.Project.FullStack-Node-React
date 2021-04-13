import { Card, CardMedia, Fab, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { AnimalPhoto } from '../../client';

interface Photos {
    fromDb: AnimalPhoto[];
    fromUser: File[];
}

interface PhotosBase {
    fromDb: string[];
    fromUser: string[];
}

interface PhotoInputProps {
    photosFromDb?: AnimalPhoto[]
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardPhoto: {
        position: 'relative',
        width: 150,
        height: 150,
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    photo: {
        height: '100%',
        minHeight: 'fill-available',
    },
    addCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing(2),
        width: 150,
        height: 150,
    },
    label: {
        cursor: 'pointer',
    },
    trash: {
        position: 'absolute',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
    },
}));

const AddPhotoInput = ({photosFromDb}: PhotoInputProps) => {
    const [photos, setPhotos] = useState<Photos>({ fromDb: photosFromDb ? photosFromDb : [], fromUser: [] });
    const [base64Photos, setBase64Photos] = useState<PhotosBase>({ fromDb: [], fromUser: [] });
    const inputRef = React.useRef<HTMLInputElement>(null!);
    const styles = useStyles();

    useEffect(() => {
        let base64Photos: string[] = [];
        if(photosFromDb) {
            base64Photos = photosFromDb.map((photo) => (Buffer.from(photo.buffer).toString('base64')))
        }
        console.log(photosFromDb);
        setBase64Photos((prev) => ({
            ...prev,
            fromDb: base64Photos,
        }));
    }, [photosFromDb])

    useEffect(() => {
        const convertPhotosToBase64 = async () => {
            let photosBase64 = [];
            photosBase64 = await Promise.all(
                photos.fromUser.map(async (file) => {
                    const fileBase = await file.arrayBuffer();
                    const buffer = Buffer.from(fileBase);
                    return buffer.toString('base64');
                }),
            );
            return photosBase64;
        };

        const saveAsState = async () => {
            const base64Images = await convertPhotosToBase64();
            setBase64Photos((prev) => ({
                ...prev,
                fromUser: [...base64Images],
            }));
        };

        saveAsState();
    }, [photos]);

    const handleCapture = ({ currentTarget, target }: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = currentTarget.files as FileList;
        const filesToSave: File[] = [];
        for (let i = 0; i < uploadedFiles.length; i++) {
            filesToSave.push(uploadedFiles.item(i) as File);
        }
        setPhotos((prev) => ({
            ...prev,
            fromUser: [...prev.fromUser, ...filesToSave],
        }));
        inputRef.current.value = '';
    };

    const deletePhoto = (id: number) => {
        setPhotos((prev) => ({
            ...prev,
            fromUser: prev.fromUser.filter((photo, index) => (index !== id))
        }))
        setBase64Photos((prev) => ({
            ...prev,
            fromUser: prev.fromUser.filter((photo, index) => (index !== id))
        }))
    }

    const showAddedPhotos = () => {
        return base64Photos.fromUser.map((img, index) => (
            <Card key={index} className={styles.cardPhoto}>
                <CardMedia className={styles.photo} component="img" src={`data:image/png;base64, ${img}`} />
                <Fab className={styles.trash} color="secondary" onClick={() => deletePhoto(index)}>
                    <Delete />
                </Fab>
            </Card>
        ));
    };

    const deleteDbPhoto = (id: number) => {
        setPhotos((prev) => ({
            ...prev,
            fromDb: prev.fromDb.filter((photo, index) => (index !== id))
        }))
        setBase64Photos((prev) => ({
            ...prev,
            fromDb: prev.fromDb.filter((photo, index) => (index !== id))
        }))
    }

    const showPhotosFromDb = () => {
        return base64Photos.fromDb.map((img, index) => (
            <Card key={index} className={styles.cardPhoto}>
                <CardMedia className={styles.photo} component="img" src={`data:image/png;base64, ${img}`} />
                <Fab className={styles.trash} color="secondary" onClick={() => deleteDbPhoto(index)}>
                    <Delete />
                </Fab>
            </Card>
        ));
    };

    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor="inputFile">
                <Paper className={styles.addCard}>
                    <Fab color="secondary" component="label">
                        <Add />
                        <input
                            id="inputFile"
                            multiple
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={handleCapture}
                            ref={inputRef}
                        />
                    </Fab>
                    <Typography>Dodaj zdjęcie</Typography>
                </Paper>
            </label>
            {base64Photos.fromUser.length > 0 && showAddedPhotos()}
            {base64Photos.fromDb.length > 0 && showPhotosFromDb()}
        </div>
    );
};

export default AddPhotoInput;
