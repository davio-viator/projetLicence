const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jsSHA = require('jssha');


const sendGrid = require('@sendgrid/mail');


const app = express();
app.use(bodyParser({limit: '50mb'}));


const path = require('path');


const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'projet'
});

connection.connect(function(error){
    //callback
    !!error?console.log('Error',error):console.log('Connected');
});


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.use(bodyParser.json());

app.use(cors());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Header','Content-Type, Authorization');
    next();
});

app.post('/getFirst10',(req,res)=>{
    connection.query('select * from produits limit 10',function (errors,rows,fields){
        if(!!errors){
            console.log('error in query')
        }else{
            console.log(rows)
            res.send(rows)
        }
    })
})

app.post('/submit',(req,res)=>{
    console.log(req.body)
    connection.query(`select * from produits where nom like '%${req.body.nom}%' 
    or categorie like '%${req.body.nom}%'`,function (errors,rows,fields){
        if(!!errors){
            console.log('error in query')
        }else{
            console.log(rows)
            res.send(rows)
        }
    })
})

app.post('/getCategories',(req,res) => {
    connection.query('select categorie from produits group by categorie',
    function(errors,rows,fields){
        if(!!errors){
            console.log("error in query")
        }
        else{
            console.log(rows)
            res.send(rows)
        }
    })
})

app.post('/addUser',(req,res)=>{
    let shaObj = new jsSHA("SHA-512","TEXT",{encoding:"UTF8"});
    shaObj.update(`${req.body[2].password}`);
    let psw = shaObj.getHash("HEX");
    connection.query(`insert into users (nom,telephone,email,password,is_company,company_name,company_website,pro_email) values ('${req.body[0].name}','${req.body[1].phone}','${req.body[2].email}','${psw}',${req.body[4].isCompany},'${req.body[5].companyName}','${req.body[6].companySite}','${req.body[7].proMail}')`,
    function(errors,rows,fields){
        if(!!errors){
            console.log("error in query",errors)
        }
        else{
            console.log(rows)
            res.send(rows)
        }
    })
});

app.post('/activeSuiviClient',(req,res)=>{
    console.log(req.body.email)
    connection.query("update users set suivis_active = 1 where email='"+req.body.email+"'",
    function(errors,rows,fielss){
        if(!!errors){
            console.log("error in query",errors)
        }
        else{
        }
    })
})

app.post('/testAchat',(req,res)=>{
    console.log(req.body)
    let ide = -1;
    

            connection.query(`select getIdFromName('${req.body.name}') `,
            function(errors,rows,fields){
                if(!!errors){
                    console.log(errors)
                }
                else{
                    console.log("test",rows)
                    connection.query(`select verificationSuivi(${rows}) `,
                        function(errorsn,rows,fields){
                            if(!!errors){
                                console.log(2)
                            }
                            else{
                                console.log(rows)
                                connection.query(`insert into panier (idClient,refProduit,quantiteProduit,userId) values (${req.body.id},'${req.body.id}',1,${req.body.id})`,
                                function(errors,rows,fields){
                                    if(errors) {
                                        console.log(errors)
                                    }
                                    else{
                                        console.log("object")
                                    }
                                })
                            }
                        })
                }
            })
        
})


app.listen(3030,'0.0.0.0')