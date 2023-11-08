const B2 = require('backblaze-b2');
const fsp = require('fs/promises');
require('dotenv').config();

const {
    APPLICATION_KEY,
    APPLICATION_KEY_ID,
    BUCKET_ID,
    BASE_URL_BACKBLAZE
} = process.env;

const b2 = new B2({
    applicationKeyId: APPLICATION_KEY_ID,
    applicationKey: APPLICATION_KEY
});

const unlinkAsync = fsp.unlink;

class FileController{
    async upload(req, res){
        const {filename, path} = req.file;

        try {
            
            const file = await fsp.readFile(`uploads/${filename}`, (err, data)=>{
                if(err){
                    throw err;
                }
                return data;
            });
            await b2.authorize();

            const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
                bucketId: BUCKET_ID,
            });

            const { data } = await b2.uploadFile({
                uploadUrl: uploadUrl,
                uploadAuthToken: authorizationToken,
                fileName: filename,
                data: file,
            });

            await unlinkAsync(path);

            return res.status(200).json({ url: `${BASE_URL_BACKBLAZE}${filename}` });
        } catch (error) {
            return res.status(400).send({ message: 'Failed to upload!' });
        }
        
       
    }
}

module.exports = new FileController();