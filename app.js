const express = require('express')
const app = express()
const port = 3001
const bcrypt= require('bcrypt')
const multer=require('multer')
const storage=multer.diskStorage({
destination:(req,file,cb)=>{
  cb(null,'uploads/');
},filename:(req,file,cb)=>{
  cb(null,file.originalname);
}
})
const upload= multer({storage});
const jwt = require('jsonwebtoken')
const {createToken}=require('./JWT')
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const UserModel =require('./models/User');
const Author =require('./models/Author');
const Categorie =require('./models/Categorie');
const cors = require('cors');
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://hanenezribi2022:myproject@cluster0.bqmtscn.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log('MongoDB connected'))
    .catch(err => console.log(err));

    // ***************************************************************************
app.post('/login', function(req, res) {
  UserModel.findOne({
      email : req.body.email
  }).then(user => {
  

      
      if (!user){
          res.status(404).send('Email Invalid !');
      }

      const accessToken = createToken(user);

      res.cookie("access-token", accessToken, {maxAge: 60*60*24*30*12, httpOnly:true})

     
      if(!bcrypt.compareSync(req.body.password, user.password)){
          res.status(404).send('Password Invalid !');
      }
   
      res.json("home");
  }).catch(err => {console.log(err)});
});

app.post('/register',(req,res)=>{
           console.log(req.body)
            const userData = new UserModel({
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               pseudo:req.body.pseudo,
               password: bcrypt.hashSync(req.body.password,10),
               email:req.body.email,
              
             
               city:req.body.city
               ,role:"visitor"
              });
       userData.save().then(()=>{
               console.log("File and Data uploaded sucessfully!");
                res.send('message')
       })

      })
  
    // ***************************************************************************
app.post("/createAuthor", 
upload.fields({name:'image',maxCount:1}),
function (req, res) {
        const Data = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
             phone:req.body.phone,
             imgName:req.body.imgName
        })
    //     Data.save().then((aze) => {
    //       // res.json(aze)
    //         console.log("author ajouté !");
        
    //     }).catch(err => {res.json(err)});
    
    //  })
    Date.save().then(()=>{
      console.log("File and uploaded sucessfully!");
      res.redirect('http://localhost:3000/authors')
    })
    .cath(err=>console.log(err));})
app.get('/authors', function (req, res) {

      Author.find()
.then(authors=>res.json(authors))
.catch(err=>res.json(err))
      })
app.get('/authors/:id',(req,res)=>{
     
     Author.findOne({_id: req.params.id})
      .then(data=>res.json(data))
      .catch(err=>{console.log(err)})
    });
    app.put('/authors/edit/:id',upload.fields(
      {name: 'image', maxCount: 1}),function (req, res){
      console.log(req.body);

      const Data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
         phone:req.body.phone,
         imgName:req.body.imgName
    };
    Author.updateOne({_id:req.params.id},{$set:Data})
    .then((data) =>{
      console.log(data);
      res.json('ok');
  })
  .catch(err=> {console.log(err)});
});
app.delete('/authors/delete/:id', function(req, res) {
  Author.findOneAndDelete({
      _id: req.params.id  
  }).then(()=> {
      console.log("Data deleted successfully");
      res.redirect('/authors');
  }).catch(err => {console.log(err)});
})
    // ***************************************************************************
app.post("/createCategorie", function (req, res) {
      const Data = new  Categorie({
          title: req.body.title,
          imgcategorie: req.body.imgcategorie,
     })
      Data.save().then((aze) => {
        res.json(aze)
          console.log("categorie ajouté !");
      
      }).catch(err => {res.json(err)});
  
   })

   app.get('/categories', function (req, res) {

    Categorie.find()
.then(categorie=>res.json(categorie))
.catch(err=>res.json(err))
    })

    // ************************************************
    app.post("/createDomaine",upload.single(imgdomaine),function(req,res) =>{
      console.log(req.imgdomaine);
    });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

