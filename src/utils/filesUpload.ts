import ImageResizer from 'react-image-file-resizer';

export const convertToBase64 = (file: File | undefined): Promise<string> => new Promise((resolve, reject) => {
    if (!file) {
        reject('File Not Found');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = err => reject(err);
});


interface ResizeImageInput {
    file: File | undefined;
    maxHeight?: number;
    maxWidth?: number;
    quality?: number;
    rotation?: number;
    minHeight?: number;
    minWidth?: number;
}

export const resizeImageFile = (resizeImageInput: ResizeImageInput): Promise<string> => new Promise((resolve, reject) => {
    const {
        file,
        maxHeight,
        maxWidth,
        quality,
        rotation,
        minWidth,
        minHeight,
    } = resizeImageInput;

    if (!file) {
        resolve('');
        return;
    }

    ImageResizer.imageFileResizer(
        file,
        maxWidth || 300,
        maxHeight || 300,
        'JPEG',
        quality || 100,
        rotation || 0,
        uri => {
            resolve(uri as string);
        },
        'base64',
        minWidth || 200,
        minHeight || 200
    );
});