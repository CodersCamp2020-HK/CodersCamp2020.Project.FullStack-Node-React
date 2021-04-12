import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

interface Photos {
    fromDb: File[];
    fromUser: File[];
}

interface PhotosBase {
    basephotos: string[];
}

const AddPhotoInput = () => {
    const [photos, setPhotos] = useState<Photos>({ fromDb: [], fromUser: [] });
    const [photosbase, setPhotosbase] = useState<PhotosBase>({ basephotos: [] });
    const inputRef = React.useRef<HTMLInputElement>(null!);

    useEffect(() => {
        const getData = async () => {
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
            const base64img = await getData();
            setPhotosbase((prev) => ({
                basephotos: [...base64img],
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

    return (
        <div>
            <Fab color="secondary" component="label">
                <Add />
                <input multiple hidden type="file" accept="image/*" onChange={handleCapture} ref={inputRef} />
            </Fab>
            {photosbase.basephotos.length > 0 &&
                photosbase.basephotos.map((img, index) => <img key={index} alt="img" src={`data:image/png;base64, ${img}`} />)}
        </div>
    );
};

export default AddPhotoInput;
