import { Card, CardMedia, Fab, makeStyles, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

interface Photos {
    fromDb: File[];
    fromUser: File[];
}

interface PhotosBase {
    items: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardPhoto: {
        width: 100,
        height: 100,
    },
    photo: {
        height: '100%',
        minHeight: 'fill-available',
    },
}));

const AddPhotoInput = () => {
    const [photos, setPhotos] = useState<Photos>({ fromDb: [], fromUser: [] });
    const [base64Photos, setBase64Photos] = useState<PhotosBase>({ items: [] });
    const inputRef = React.useRef<HTMLInputElement>(null!);
    const styles = useStyles();

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
                items: [...base64Images],
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

    const showAddedPhotos = () => {
        return base64Photos.items.map((img, index) => (
            <Card className={styles.cardPhoto}>
                <CardMedia key={index} className={styles.photo} component="img" src={`data:image/png;base64, ${img}`} />
            </Card>
        ));
    };

    return (
        <div className={styles.wrapper}>
            <Fab color="secondary" component="label">
                <Add />
                <input multiple hidden type="file" accept="image/*" onChange={handleCapture} ref={inputRef} />
            </Fab>
            {base64Photos.items.length > 0 && showAddedPhotos()}
        </div>
    );
};

export default AddPhotoInput;
