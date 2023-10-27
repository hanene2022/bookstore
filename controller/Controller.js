 var controller = {};
 const bcrypt =require("bcrypt")
 const ModelUser= require('../models/Users')
//  const  Books= require('../models/Books')
// /const multer =require('multer')

// const storage=multer.diskStorage({
// destination:(req,file,cb)=>{
//     cb(null,'uploads/');
// },filename:(req,file,cb)=>{
//     cb(null,file.originalname);
// }
// })
// const upload= multer({storage})

// controller.register=(req,res)=>{
//         console.log(req.body)
//          const userData = new Users({
//             nom:req.body.nom,
//             prenom:req.body.prenom,
//             pseudo:req.body.pseudo,
//             email:req.body.email,
//             password:  bcrypt.hashSync(req.body.password,10),
//             age:req.body.age,
//             ville:req.body.ville,
//            });
//     userData.save().then(()=>{
//             console.log("File and Data uploaded sucessfully!");
//              res.send('message')
//     })
//     .catch(error=>{
//         res.send(error)
//     }); }

//     controller.addbook =(req,res)=>{ upload.fields([
//         {name: 'image', maxCount: 1},{name: 'pdf', maxCount: 1},
//     ])
//         console.log(req.body);
//         const BookData = new Books({
//             title:req.body.title,
//             categorie:req.body.categorie,
//             numbpages:req.body.numbpages,
//             resume:req.body.resume,
//             domaine:req.body.domaine,
            
//             annee:req.body.annee,
//             imageName:req.body.imageName,
//             pdfName:req.body.pdfName});
//     BookData.save().then(()=>{
//             console.log("File and Data uploaded sucessfully!");
//              res.redirect('http://localhost:3000/allbook')
//     })
//             .catch(err=>console.log(err));
//         }


     controller.getuser=(req,res)=>{
        ModelUser.findOne({_id:req.params.id})
       .then((data)=>{
            console.log("File and Data uploaded sucessfully!");     
                     res.send(data)
     }).catch(error=>{
         res.send(error)
     })

    }
 module.exports=controller;