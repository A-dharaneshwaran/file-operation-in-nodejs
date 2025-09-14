const express=require('express')
const app=express()
const Tesseract = require('tesseract.js');
// const bodyParser=require('body-parser') 
const path=require('path')
const multer=require('multer')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
let storage=multer.diskStorage(
        {
            destination:function(rqst,file,cb){
                cb(null, 'uploads/')
            },filename:function(rqst,file,cb){
                cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));

                //storage la fila name um athoda location um store panikaalam
            }
        }
)
const size=5*1000*1000
let upload=multer({storage:storage,
    limits:{fileSize:size},
    fileFilter:function(rqst,file,cb){
       let filetypes=/jpeg|jpg|pdf|png/
       let mimetype=filetypes.test(file.mimetype.toLowerCase())
       let extname=filetypes.test(path.extname(file.originalname).toLowerCase())
       if(mimetype && extname){
           return cb(null,true) 
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes)
    }
}).single('myimage')
app.get('/',(rqsr,rsp)=>{
rsp.render('page')
})
app.listen(9000,()=>{
    console.log('Server started on port 9000')
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload',(rqst,rsp)=>{
    upload(rqst,rsp,(err)=>{
        if(err){
            rsp.send(err)
        }else{
            if(rqst.file==undefined){
                rsp.send('Error: No File Selected')
            }else if(rqst.file.mimetype=='application/pdf'){
               
           

                    rsp.send('File Uploaded Successfully! <br><a href="/uploads/'+rqst.file.filename+'" target="_blank">View File</a>')
                }
                else{
                    
                   
    

                rsp.send('File Uploaded Successfully! <br><img src="/uploads/'+rqst.file.filename+'" width="100%" height="100%">')
            }
        }
    })
})