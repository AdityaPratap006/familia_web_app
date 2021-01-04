export const convertToBase64 = (file: File | undefined): Promise<string> => new Promise((resolve, reject) => {
    if (!file) {
        resolve('');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = err => reject(err);
});