require('dotenv').config()
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
require("./db/conn");
const Customeryog = require('./models/Customer');
const authenticate = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


// hbs engine templates
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const PartialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(PartialsPath);





app.get('/login', (req, res) => {
    res.render('login.hbs');
  });
  
  app.get('/register', (req, res) => {
      res.render('register.hbs');
    });



//  login details
    app.post('/login', async(req, res) => {

      try{

      const mail = req.body.Email;
      const LogPassword = req.body.Password;

      const logmail = await Customeryog.findOne({Email: mail});

      const isMatch = await bcrypt.compare(LogPassword, logmail.Password);

      const token =  await logmail.generateToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true
      });


      
      if(isMatch){
        res.status(201).render('tracks.hbs');
      }else{
        res.send("Invalid Credentials!");
      }


      }catch(error){
        res.status(400).send(error);
      }
    });


// Register part
app.post('/register', async(req, res) => {
    try{

      const password = req.body.Password;
      const confpassword = req.body.Confirmassword;

      if(password === confpassword){

        const addData = new Customeryog({
          Name: req.body.Name,
          Email : req.body.Email,
          Phone : req.body.Phone,
          DOB : req.body.DOB,
          gender : req.body.gender,
          Address : req.body.Address,
          Country : req.body.Country,
          city : req.body.city,
          region : req.body.region,
          postcode : req.body.postcode,
          Password : password,
          Confirmassword : confpassword
        })


        // Create Token
        const token =  await addData.generateToken();

        const myData = await addData.save();
        res.status(201).render('login.hbs');

      }else{
        res.send("Password is Incorrect!");
      }


    }catch(error){
      res.status(400).send(error);
    }
  });
  












app.get('/', (req, res) => {
    res.render('index.hbs');
  });

app.get('/tracks',(req, res) => {
    res.render('tracks.hbs');
  });
app.get('/classess', authenticate, (req, res) => {
  // console.log(`Cookies ---> ${req.cookies.jwt}`);
    res.render('classess.hbs');
  });

    //level 1
app.get('/cat_pose', (req, res) => {
    res.render('cat_pose.hbs');
  });

app.get('/bird_dog_pose', (req, res) => {
    res.render('bird_dog_pose.hbs');
  });

app.get('/sphinx_pose', (req, res) => {
    res.render('sphinx_pose.hbs');
  });

app.get('/tree_pose', (req, res) => {
    res.render('tree_pose.hbs');
  });

app.get('/child_pose', (req, res) => {
    res.render('child_pose.hbs');
  });

app.get('/corpse_pose', (req, res) => {
    res.render('corpse_pose.hbs');
  });

  //level 2

app.get('/knee_chest_pose', (req, res) => {
    res.render('knee_chest_pose.hbs');
  });

app.get('/goddess_pose', (req, res) => {
    res.render('goddess_pose.hbs');
  });

app.get('/forwar_bent_pose', (req, res) => {
    res.render('forwar_bent_pose.hbs');
  });

app.get('/cobra_pose', (req, res) => {
    res.render('cobra_pose.hbs');
  });

app.get('/walk_dog_pose', (req, res) => {
    res.render('walk_dog_pose.hbs');
  });

app.get('/corpse_pose2', (req, res) => {
    res.render('corpse_pose2.hbs');
  });

  //level 3

app.get('/adva_tree_pose', (req, res) => {
    res.render('adva_tree_pose.hbs');
  });

app.get('/advan_for_bent_pose', (req, res) => {
    res.render('advan_for_bent_pose.hbs');
  });

app.get('/revolved_bend_pose', (req, res) => {
    res.render('revolved_bend_pose.hbs');
  });

app.get('/butterfly_pose', (req, res) => {
    res.render('butterfly_pose.hbs');
  });

app.get('/garland_pose', (req, res) => {
    res.render('garland_pose.hbs');
  });

app.get('/advan_corpse_pose', (req, res) => {
    res.render('advan_corpse_pose.hbs');
  });

  // Logout:-
app.get("/logout",authenticate, async(req, res) =>{
  try {
    //Mtd-1    clear the cookie 
    console.log(req.user.Name);

    // also logout the token from database ---> logout only in one device

    // req.user.tokens = req.user.tokens.filter((currUser) =>{
    //   return currUser.token !=req.token;
    // });


    // also logout the token from database ---> logout only in ALL device
    req.user.tokens = [];


    res.clearCookie("jwt");
    const userlog = await req.user.save();
    res.status(201).render('login.hbs');

    console.log("Logout Sccessfully!");
  
  } catch (error) {
    res.status(400).send(error);
  }
  });





app.get('*', (req, res) => {
    res.render('Errorpage.hbs');
  });

app.listen(port, ()=>{
    console.log(`Servering on port no  ${port}`)
});