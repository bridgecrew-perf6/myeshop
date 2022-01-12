var express = require('express');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var ObjectId= require('mongodb').ObjectId;
const bodyParser = require('body-parser');
// var upload = require('./multerConfig');
var path = require('path');
var upload = require('./multerConfig');

var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')))


// app.use(express.static(path.join(__dirname,"uploads")));

// const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://myecom:myecom@cluster0.jxghw.mongodb.net/myecom?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var connection;
client.connect((err, db) => {
    if (!err) {
        connection = db;
        console.log("Success");
    } else {
        console.log("db error");
    }
});
app.post('/check-login-google', bodyParser.json() ,(req, res) => {
    var usercollection = connection.db('myecom').collection('register');
    usercollection.find({email:req.body.email,user:req.body.usermain}).toArray((err, result) => {
        if (!err && result.length>0) {
            console.log('succe');
            console.log(req.body);
            res.send({ status: 'ok', data: result[0] });
        } else {
            console.log('fail');
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/check-email', bodyParser.json() ,(req, res) => {
    var usercollection = connection.db('myecom').collection('register');
    usercollection.find({email:req.body.email}).toArray((err, result) => {
        if (!err && result.length>0) {
            console.log('succe');
            console.log(req.body);
            res.send({ status: 'ok', data: result[0] });
        } else {
            console.log('fail');
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/check-login', bodyParser.json() ,(req, res) => {
    var usercollection = connection.db('myecom').collection('register');
    usercollection.find({email:req.body.loginemail, password:req.body.loginpassword,usermain:req.body.usermain}).toArray((err, result) => {
        console.log(req.body);
        if (!err && result.length>0) {
            console.log('succe');
            console.log(req.body);
            res.send({ status: 'ok', data: result[0] });
        } else {
            console.log('fail');
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/check-cart', bodyParser.json() ,(req, res) => {
    var usercollection = connection.db('myecom').collection('Cart');
    usercollection.find({useremail:req.body.useremail,productid:req.body.productid}).toArray((err, result) => {
        if (!err && result.length>0) {
            console.log('success cart recieved');
            console.log(req.body);
            res.send({ status: 'ok', data: result[0] });
        } else {
            console.log('fail cart');
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/product-details', bodyParser.json() ,(req, res) => {
    var productcollectiondetail = connection.db('myecom').collection('Product');
    console.log(req.body);
    productcollectiondetail.find({_id:ObjectId(req.body.id2)}).toArray((err, result) => {
        if (!err && result.length>0) {
            res.send({ status: 'ok', data: result});
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})



app.post('/delete-cart', bodyParser.json() ,(req, res) => {
    var cartproductdelete = connection.db('myecom').collection('Cart');
    console.log(req.body);
    cartproductdelete.remove({_id:ObjectId(req.body.clickid)}),(err, result) => {
        if (!err && result.length>0) {
            res.send({ status: 'ok', data: result});
        } else {
            res.send({ status: 'error', data: err })
        }
    }

})

app.post('/remove-cart', bodyParser.json() ,(req, res) => {
    var cartproductdelete = connection.db('myecom').collection('Cart');
    console.log(req.body);
    cartproductdelete.remove({useremail:req.body.useremail}),(err, result) => {
        if (!err && result.length>0) {
            res.send({ status: 'ok', data: result});
        } else {
            res.send({ status: 'error', data: err })
        }
    }

})

app.post('/delete-product', bodyParser.json() ,(req, res) => {
    var cartproductdelete = connection.db('myecom').collection('Product');
    console.log(req.body);
    cartproductdelete.remove({_id:ObjectId(req.body.clickid)}),(err, result) => {
        if (!err && result.length>0) {
            res.send({ status: 'ok', data: result});
        } else {
            res.send({ status: 'error', data: err })
        }
    }

})

app.post('/Cart', bodyParser.json(), (req, res) => {
    var usercollection = connection.db('myecom').collection('Cart');
    usercollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: 'ok', data: "Added successfully" });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
});

app.post('/update-list', bodyParser.json() ,(req, res) => {
    var Cartcollectionlist = connection.db('myecom').collection('Product');
    Cartcollectionlist.find({_id:ObjectId(req.body.id2)}).toArray((err, result) => {
        // console.log(req.body);
        if (!err) {
            // console.log("in index.js 101 cart-list no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/Cart-list', bodyParser.json() ,(req, res) => {
    var Cartcollectionlist = connection.db('myecom').collection('Cart');
    Cartcollectionlist.find({useremail:req.body.useremail}).toArray((err, result) => {
        // console.log(req.body);
        if (!err) {
            // console.log("in index.js 101 cart-list no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/orders-list', bodyParser.json() ,(req, res) => {
    var Cartcollectionlist = connection.db('myecom').collection('orders');
    Cartcollectionlist.find({useremail:req.body.useremail}).toArray((err, result) => {
        console.log(req.body);
        if (!err) {
            // console.log("in index.js 101 cart-list no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/orders-list-vendor', bodyParser.json() ,(req, res) => {
    var Cartcollectionlist = connection.db('myecom').collection('orders');
    Cartcollectionlist.find({companyemail:req.body.useremail}).toArray((err, result) => {
        console.log(req.body);
        if (!err) {
            // console.log("in index.js 101 cart-list no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/update-user', bodyParser.json(), (req, res) => {
    var up1collection = connection.db('myecom').collection('register');
    // console.log(req.body);
    // up1collection.update({productid:req.body.productid},{$set:{productqnty:req.body.up}},(err, result) => {
        up1collection.updateMany(
            {_id:ObjectId(req.body.id)},{$set:{name:req.body.name,phone_number:req.body.phone_number,email:req.body.email}},
            (err, result) => {
    console.log(result);
        console.log(req.body);
        if (!err) {
            // console.log("updated in index ");
            res.send({ status: 'ok', data: result});
        } else {
            res.send({ status: 'error', data: err })
        }
    })
});

app.post('/update-status', bodyParser.json(), (req, res) => {
    var up1collection = connection.db('myecom').collection('orders');
    // console.log(req.body);
    // up1collection.update({productid:req.body.productid},{$set:{productqnty:req.body.up}},(err, result) => {
        up1collection.update(
            {_id:ObjectId(req.body.clickid)},{$set:{status:req.body.checkedstatus}},
            
            (err, result) => {
    console.log(result);
    console.log(req.body);
        if (!err) {
            // console.log("updated in index ");
            res.send({ status: 'ok', data: result});
        } else {
            res.send({ status: 'error', data: err })
        }
    })
});

app.post('/Cartupdate1', bodyParser.json(), (req, res) => {
    var up1collection = connection.db('myecom').collection('Cart');
    // console.log(req.body);
    // up1collection.update({productid:req.body.productid},{$set:{productqnty:req.body.up}},(err, result) => {
        up1collection.updateMany({productid:req.body._id},{$set:{productqnty:req.body.setqty,totalprice:req.body.pp}},(err, result) => {
    console.log(result);
        console.log(req.body);
        if (!err) {
            // console.log("updated in index ");
            res.send({ status: 'ok', data: result});
        } else {
         
            res.send({ status: 'error', data: err })
        }
    })
});

app.post('/Updateproduct', bodyParser.json(), (req, res) => {
    var up1collection = connection.db('myecom').collection('Product');
    console.log(req.body);
    // up1collection.update({productid:req.body.productid},{$set:{productqnty:req.body.up}},(err, result) => {
        up1collection.updateMany({_id:ObjectId(req.body.id2)},
            {$set:{
                productname:req.body.pproductname,
                productprice:req.body.pproductprice,
                content:req.body.pcontent,
                // selected:sizeArray,
                // category:req.body.category,
                // subcat:req.body.subcat,
                productstock:req.body.pproductstock,
                productdiscount:req.body.pproductdiscount,
                productfinalprice:req.body.pproductfinalprice,
                productcontent:req.body.pproductcontent,
                email:req.body.pemail,
                // companyname:req.body.companyname,
                // companyaddress:req.body.companyaddress,
                // Companyphonenumber:req.body.Companyphonenumber,
                        }},(err, result) => {
    console.log(result);
        console.log(req.body);
        if (!err) {
            // console.log("updated in index ");
            res.send({ status: 'ok', data: result});
        } else {
         
            res.send({ status: 'error', data: err })
        }
    })
});




app.post('/Wear-list', bodyParser.json() ,(req, res) => {
    var wcollectionlist = connection.db('myecom').collection('Product');
    wcollectionlist.find({category:req.body.category}).toArray((err, result) => {
        console.log(req.body);
        if (!err) {
            console.log("in index.js 117 nwlist no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/review-list', bodyParser.json() ,(req, res) => {
    var wcollectionlist = connection.db('myecom').collection('Reviews');
    wcollectionlist.find().toArray((err, result) => {
        console.log(req.body);
        if (!err) {
            console.log("in index.js 117 nwlist no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})


app.post('/productlist',bodyParser.json(),(req, res) => {
    var productcollectionlist = connection.db('myecom').collection('Product');
    productcollectionlist.find({email:req.body.vendoremail}).toArray((err, result) => {
        if (!err) {
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})

app.post('/add-order', bodyParser.json(), (req, res) => {
    var ordercollection = connection.db('myecom').collection('orders');
    ordercollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: 'ok', data: "order added successfully" });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})

app.post('/add-review', bodyParser.json(), (req, res) => {
    var reviewcollection = connection.db('myecom').collection('Reviews');
    reviewcollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: 'ok', data: "Review added successfully" });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})
app.post('/Register', bodyParser.json(), (req, res) => {
    var usercollection = connection.db('myecom').collection('register');
    usercollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: 'ok', data: "registered successfully" });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})

app.post('/collection', bodyParser.json() ,(req, res) => {
    var w1collectionlist = connection.db('myecom').collection('Product');
    w1collectionlist.find({subcat:req.body.id1}).toArray((err, result) => {
        console.log(req.body);
        if (!err) {
            console.log("in index.js no error");
            res.send({ status: 'ok', data: result });
        } else {
            res.send({ status: 'error', data: err })
        }
    })

})

app.post('/Addproduct',(req, res)=> {
    console.log("line 71----");
upload(req,res,(error)=>{
    if (error) {
        console.log("error uploading image");
        console.log(error);
        res.send({ status: 'error',data: error });
    }else{
        console.log("line 78 in index.js");
     var productcollection = connection.db('myecom').collection('Product');
     console.log("fileimage",req.files);
     console.log(req.body);
     var sizeArray= req.body.Fruit;
     console.log(JSON.parse(req.body.Fruit));
      productcollection.insert({
        productimage:req.files.productimage[0].filename,
        
        productname:req.body.productname,
        productprice:req.body.productprice,
        content:req.body.content,
        selected:sizeArray,
        category:req.body.category,
        subcat:req.body.subcat,
        productstock:req.body.productstock,
        productdiscount:req.body.productdiscount,
        productfinalprice:req.body.productfinalprice,
        productcontent:req.body.productcontent,
        email:req.body.email,
        companyname:req.body.companyname,
        companyaddress:req.body.companyaddress,
        Companyphonenumber:req.body.Companyphonenumber,
    },(err, result) => {
          if (!err) {
              res.send({status:"success",data:result});
              
          }else{
              res.send({status:"error",data:err});
          }
      })
    }
})
});

app.listen(4000, () => { console.log("on port 4000"); })