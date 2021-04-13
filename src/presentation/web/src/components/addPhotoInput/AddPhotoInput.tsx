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
    photosFromDb?: AnimalPhoto[];
    getPhotos?: (photos: Photos, deletedPhotosFromDb?: AnimalPhoto[]) => any;
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

const AddPhotoInput = ({ photosFromDb, getPhotos }: PhotoInputProps) => {
    const [photos, setPhotos] = useState<Photos>({ fromDb: photosFromDb ? photosFromDb : [], fromUser: [] });
    const [base64Photos, setBase64Photos] = useState<PhotosBase>({ fromDb: [], fromUser: [] });
    const inputRef = React.useRef<HTMLInputElement>(null!);
    const styles = useStyles();

    useEffect(() => {
        let base64Photos: string[] = [];
        if (photosFromDb) {
            base64Photos = photosFromDb.map((photo) => Buffer.from(photo.buffer).toString('base64'));
        }
        setBase64Photos((prev) => ({
            ...prev,
            fromDb: base64Photos,
        }));
    }, [photosFromDb]);

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

        if (getPhotos) {
            if (photosFromDb) {
                const deletedPhotos = photosFromDb.filter((photo) => {
                    return !photos.fromDb.includes(photo);
                });
                getPhotos(photos, deletedPhotos);
            } else {
                getPhotos(photos);
            }
        }

        saveAsState();
    }, [photos, getPhotos, photosFromDb]);

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

    const showAddedPhotos = (property: keyof typeof base64Photos) => {
        return base64Photos[property].map((img, index) => (
            <Card key={index} className={styles.cardPhoto}>
                <CardMedia className={styles.photo} component="img" src={`data:image/png;base64, ${img}`} />
                <Fab
                    size="small"
                    className={styles.trash}
                    color="secondary"
                    onClick={() => deletePhoto(index, property, property)}
                >
                    <Delete />
                </Fab>
            </Card>
        ));
    };

    const deletePhoto = (
        id: number,
        sourcePhotos: keyof typeof photos,
        sourceBase64Photos: keyof typeof base64Photos,
    ) => {
        setPhotos((prev) => ({
            ...prev,
            // @ts-ignore
            [sourcePhotos]: prev[sourcePhotos].filter((photo, index: number) => index !== id),
        }));

        setBase64Photos((prev) => ({
            ...prev,
            [sourceBase64Photos]: prev[sourceBase64Photos].filter((photo, index) => index !== id),
        }));
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
            {base64Photos.fromUser.length > 0 && showAddedPhotos('fromUser')}
            {base64Photos.fromDb.length > 0 && showAddedPhotos('fromDb')}
        </div>
    );
};

export default AddPhotoInput;
