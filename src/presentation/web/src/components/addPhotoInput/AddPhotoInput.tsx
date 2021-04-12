import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

interface Photos {
    fromDb: File[];
    fromUser: File[];
}

const AddPhotoInput = () => {
    const [photos, setPhotos] = useState<Photos>({ fromDb: [], fromUser: [] });

    useEffect(() => {
        console.log(photos);
    }, [photos]);

    const handleCapture = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = currentTarget.files as FileList;
        const filesToSave: File[] = [];
        for (let i = 0; i < uploadedFiles.length; i++) {
            filesToSave.push(uploadedFiles.item(i) as File);
        }
        setPhotos((prev) => ({
            ...prev,
            fromUser: [...prev.fromUser, ...filesToSave],
        }));
    };

    return (
        <div>
            <Fab color="secondary" component="label">
                <Add />
                <input multiple hidden type="file" accept="image/*" onChange={handleCapture} />
            </Fab>
        </div>
    );
};

export default AddPhotoInput;
