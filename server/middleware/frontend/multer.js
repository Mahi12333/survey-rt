import multer from "multer";


const storage=multer.diskStorage({
    destination: function(req,file,cb){
        console.log(file);
        cb(null,"./public/user/photo");
    },
    filename: function (req,file, cb){
       // console.log(file);
        const extension = file.originalname.split('.').pop();
        // const uniqueFileName = `${Math.floor(Math.random() * 10)}.${extension}`;
        const randomString = Math.random().toString(36).substring(7);
        const uniqueFileName = `${randomString}_${Math.floor(Math.random() * 10)}.${extension}`;
        console.log(uniqueFileName)
        cb(null, uniqueFileName);
    }
});

const uplodeds=multer({
    storage
    });

export default uplodeds;