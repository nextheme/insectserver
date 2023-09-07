import multer from 'multer';
const storage = multer.memoryStorage()
const upload = multer({ storage:storage});
const myUploadMiddleware = upload.single('photo');
const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export  {runMiddleware,myUploadMiddleware}