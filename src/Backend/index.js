require('./db/moongose')

const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
var cookieParser = require('cookie-parser')
const FrontuserModel = require("./Models/login");
const Addtotask = require("./Models/task");

var jwt = require("jsonwebtoken");

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:201,
    methods: ["GET", "POST","DELETE"]
  }
  app.use(cors(corsOptions));
app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

  

app.get('/', (req, res) => res.send('Hello World!'))

app.post("/createaccount", async (req, res) => {
    try {
 const taskuser = await FrontuserModel.findcredit(req.body, FrontuserModel);

if(taskuser){
    
    const token = jwt.sign({ email: taskuser.email }, "admin");
    var expiryDate = new Date(Number(new Date()) + 864000000);
    console.log('i m already task')
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        expires: expiryDate,
       });
}else{
    
    const frontuser = new FrontuserModel(req.body);
    await frontuser.save()
    const token = jwt.sign({ email: frontuser.email }, "admin");
    var expiryDate = new Date(Number(new Date()) + 864000000);
    console.log('i m already nottask')

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        expires: expiryDate,
       });
}


        

    

     

        res.status(201).send('succesful');

    } catch (error) {
      res.status(400).send(error);
    }
  });

app.get('/verifydata',async (req,res) => {

    try {
        var token = req.cookies.token;
        var tokensverify = jwt.verify(token, "admin");
        console.log(tokensverify)

        const taskuser = await FrontuserModel.findOne({email:tokensverify.email});
if(!taskuser){
    throw new Error("msg");

}
        res.status(201).send(taskuser);
      } catch (e) {
        res.status(400).send("Please Log In");
      }



})


app.post("/createtask", async (req, res) => {
  try {

    var token = req.cookies.token;
    var tokensverify = jwt.verify(token, "admin");
    var usercurrentlogin = await FrontuserModel.findOne({email:tokensverify.email});

    const taskadd = new Addtotask({
         task:req.body.task,
         orderidofproduct: usercurrentlogin._id,   
      });

      await taskadd.save();


    await usercurrentlogin.populate("tasks");


    res.status(201).send(usercurrentlogin.tasks);


  } catch (e) {


    res.status(400).send([]);
  }
});



app.get("/fetchtask", async (req, res) => {
    try {
  
      var token = req.cookies.token;
      var tokensverify = jwt.verify(token, "admin");
      var usercurrentlogin = await FrontuserModel.findOne({email:tokensverify.email});
  
      await usercurrentlogin.populate("tasks");
  
  
      res.status(201).send(usercurrentlogin.tasks);
  
  
    } catch (e) {
  
  
      res.status(400).send([]);
    }
  });
  


  app.post("/updatetask", async (req, res) => {
    try {
  
      var token = req.cookies.token;
      var tokensverify = jwt.verify(token, "admin");
      console.log(req.body)
      var usercurrentlogin = await FrontuserModel.findOne({email:tokensverify.email});
      var taskupdate = await Addtotask.findByIdAndUpdate({ _id: req.body.id },{
        task: req.body.task ,
      });

console.log(taskupdate)
      await usercurrentlogin.populate("tasks");
  
  
      res.status(201).send(usercurrentlogin.tasks);
  
  
    } catch (e) {
  
  
      res.status(400).send([]);
    }
  });


  app.delete("/deletetask", async (req, res) => {
    try {
      console.log(req.query.id)
      var token = req.cookies.token;
      var tokensverify = jwt.verify(token, "admin");
     
      var usercurrentlogin = await FrontuserModel.findOne({email:tokensverify.email});
      var taskupdate = await Addtotask.findByIdAndDelete({ _id: req.query.id });


      await usercurrentlogin.populate("tasks");
  
  
      res.status(201).send(usercurrentlogin.tasks);
  
  
    } catch (e) {
  
  
      res.status(400).send([]);
    }
  });




  app.post("/destoryerifyusertoken", async (req, res) => {
    try {
      res.clearCookie("token");
  
      res.status(201).send("Please Log In");
    } catch (e) {   
      res.status(400).send("Please Log In");
    }
  });



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

