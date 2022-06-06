const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql');
app.use(cors());
app.options('*', cors());  // enable pre-flight
app.use(bodyParser.json());

const UPLOAD_LOCATION = "../frontend/public";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_LOCATION);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, filename + fileExt);
    }
})

let upload = multer({
    storage:storage,
},
)

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dmarket'
});
  

app.get("/", (req, res) => {
    res.send("OK");
});

app.get("/getProducts/", (req, res) => {
    connection.query('SELECT * from product', function (error, results) {
        if (error) console.log(error);
        res.json(results);
    });
});

app.get("/getCount", (req, res) => {
    connection.query(`SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1;`, (err, result) => {
        res.json(result);
    })
})

app.get("/getProducts/:id", (req, res) => {
    connection.query(`SELECT * FROM product WHERE id=${req.params.id}`, (error,results) => {
        if (error) console.log(error);
        res.json(results);
    })
});

app.get("/getUserProducts/:owner", async (req, res) => {
    console.log(req.params.owner);
    connection.query(`SELECT * FROM product WHERE owner='${req.params.owner}'`, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
    }
);

app.post("/productUpload", upload.single("photo"), async (req, res) => {
    console.log(req.file.filename);
    console.log(req.body);
    let owner = req.body.account;
    let p_name = req.body.name;
    let img_name = req.file.filename;
    console.log(img_name);
    let details = req.body.list;
    console.log(details);
    let price = req.body.price;
    connection.query(`INSERT INTO product(owner,p_name,img_name,details,price) VALUES('${owner}','${p_name}','${img_name}','${details}',${price})`, (err, result) => {
        if (err) console.log(err);
        res.send("Uploaded");
    })
});

app.post("/placeOrder", async (req, res) => {
    connection.query(`INSERT INTO orders(product_id,seller_addr,buyer_addr,price) VALUES(${req.body.id},'${req.body.owner}','${req.body.buyer}',${req.body.price})`, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.json(result);
    });
})


app.listen(8080, () => {
    console.log("Server Running At 8080");
    connection.connect(() => {
        console.log("Connected to DB");
    });
})