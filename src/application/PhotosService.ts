/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request as ExRequest } from 'express';
import multer from 'multer';

export class PhotosService {
    public async photosUpload(request: ExRequest): Promise<void> {
        const multerMulti = multer().array('photos');
        return new Promise((resolve, reject) => {
            multerMulti(request, undefined!, async (error: any) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }

    public async thumbnailUpload(request: ExRequest): Promise<void> {
        const multerSingle = multer().single('thumbnail');
        return new Promise((resolve, reject) => {
            multerSingle(request, undefined!, async (error: any) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
}
