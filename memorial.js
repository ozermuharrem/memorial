const express = require('express');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const pageRoutes = require('./routes/pageRoute');
const usersRoutes = require('./routes/usersRoute');
const app = express();

// Mongodb connect 
mongoose.connect('mongodb+srv://mozer:XjO2Wo3ACuVFzsMb@cluster0.0xfbdzw.mongodb.net/memorial-db?retryWrites=true&w=majority')
.then(() => {
    console.log("DB Connected Successfully")
})
.catch((err) => {
    console.log(err)
})

app.use(
    session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: 'mongodb+srv://mozer:XjO2Wo3ACuVFzsMb@cluster0.0xfbdzw.mongodb.net/memorial-db?retryWrites=true&w=majority'})
    })
);

//Global Variable

global.apiUrl = "https://api.bookstore.ozermuharrem.com";
global.coin;
global.userIN = null;

// * midllwear 
app.use('*', (req, res, next) =>{
    userIN = req.session.userID;
    next();
})

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(flash());
app.use((req,res,next)=>{
    res.locals.flashMesaj = req.flash();
    next();
})

app.use('/',pageRoutes);
app.use('/users',usersRoutes);

const port = 4242;
app.listen(port, ()=>{
    console.log(`listen on ${port}`);
})
