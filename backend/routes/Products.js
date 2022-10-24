let express = require('express');
let app = express.Router();

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let fs = require('fs');

let multer = require('multer');
let path = require('path');


let s3 = require('aws-sdk/clients/s3');

let s3Instance = new s3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY
})



const { url } = require('inspector');
const { access } = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb)=>{
        //console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage
});

function uploadToS3(file){
    const fileStream = fs.createReadStream(file.path);
    
    const uploadParams= {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename
    }

    return s3Instance.upload(uploadParams).promise();
}

function getFromS3(filekey){
    const downloadParams = {
        Key: filekey,
        Bucket: process.env.AWS_BUCKET_NAME
    }

    return s3Instance.getObject(downloadParams).createReadStream();
}

function deleteFromS3(filekey){
    const deleteParams = {
        Key: filekey,
        Bucket: process.env.AWS_BUCKET_NAME
    }

    return s3Instance.deleteObject(deleteParams).promise();
}


let Product = require('../models/ProductsModel');

app.get('/products', function(req, res){
    Product.find({}, function(err, data){
        res.json(data)
    })
})

app.get('/products/:id', urlEncoded, function(req, res){
    Product.findById(req.params.id, function(err, data){
        res.json(data)
    })
});

app.get('/products/similar/:id', urlEncoded, function(req, res){
    Product.find({categ: req.params.id}, function(err, data){
        res.json(data)
    })
});

app.get('/images/:key', function(req, res){
    const key = req.params.key;
    
    const readStream = getFromS3(key);

    readStream.pipe(res);
})

app.post('/add_product', urlEncoded, upload.fields([{name: 'file1',maxCount: 1}, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 }, { name: 'file4', maxCount: 1 }]),async function(req, res){

    let preview1 = req.files.file1[0].filename;
    let preview2 = req.files.file2[0].filename;
    let preview3 = req.files.file3[0].filename;
    let preview4 = req.files.file4[0].filename;


    await uploadToS3(req.files.file1[0]);
    await uploadToS3(req.files.file2[0]);
    await uploadToS3(req.files.file3[0]);
    await uploadToS3(req.files.file4[0]);

    let data = JSON.parse(req.body.datas)

    let previews = { "preview1": preview1,"preview2": preview2, "preview3": preview3,"preview4": preview4}

    let oldData = { ...data, ...previews};

    Product(oldData).save(function(err, data){
        res.json(data);
    })

})


app.put('/edit_product/:id', urlEncoded, function(req, res){
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, data){
        res.json(data)
    })
})

app.delete('/del_products/:id', urlEncoded, function(req, res){
    Product.findById(req.params.id, async function(err, item){
        fs.unlink(`src/uploads/${item.preview1}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        await deleteFromS3(item.preview1);

        fs.unlink(`src/uploads/${item.preview2}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        await deleteFromS3(item.preview2);

        fs.unlink(`src/uploads/${item.preview3}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        await deleteFromS3(item.preview3);

        fs.unlink(`src/uploads/${item.preview4}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        await deleteFromS3(item.preview4);

    })
    Product.findByIdAndRemove(req.params.id, function(err, data){
        res.json(data)
    })
});

app.put('/edit_pic1/:id', upload.single('file1'), function(req, res){

    let preview1 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview1}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview1":preview1} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})
app.put('/edit_pic2/:id', upload.single('file2'), function(req, res){

    let preview2 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview2}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview2":preview2} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})
app.put('/edit_pic3/:id', upload.single('file3'), function(req, res){

    let preview3 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview3}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview3":preview3} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})
app.put('/edit_pic4/:id', upload.single('file4'), function(req, res){

    let preview4 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview4}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview4":preview4} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})

module.exports = app;