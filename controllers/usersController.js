const request = require('request');
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const TokenClass = require('../class/tokenClass');
// let coin;

exports.registerUser = async (req,res) => {
    try {


        await User.create(req.body);

        request.post({
            url : apiUrl + "/user/register",
            json : {email : req.body.email, password : req.body.password}
        },
            function (err,request,body) {
                if(!err){
                    console.log(`created user id ${request.body.user._id}`);
                    req.flash("basarili", "Kayıt Başarılı...");
                    res.status(201).redirect('/login');
                }
                else{
                    throw "fail";

                }
        });
    } catch (error) {
        res.status(400).json({
            message : "fail",
            error
        })
    }
}

exports.loginUser = async (req,res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
            if(user) {
                bcrypt.compare(password, user.password , (err , same) => {
                    if(same)
                    // user session
                        req.session.userID = user._id;
                })
            }
       
          request.post({
            url : apiUrl + "/user/login",
            form : {email : req.body.email, password : req.body.password}
          },
          (err,response,body)=>{
            if(!err){
                global.coin = JSON.parse(body);
                res.redirect('/users/dashboard',200,{
                    pageName : "dashboard",
                })
            }else{
                throw "response.body.message";
            }
          })
        //   console.log(token)
    } catch (error) {
        res.status(400).json({
            message : "login error",
            error
        })
        console.log(error)
    }
}

exports.logOutUser = (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    })
}

exports.getDashboardPage = async (req,res) => {
    try {
        //const books = [{_id : 1, title : "sdasdsasda", description : "dsasdasdas", author : "dsasdasda", year : 2000, cover : "1"}];

        let jsonData;
        request.get(apiUrl + '/books', (err,request,body)=>{
            if(!err){
                jsonData = JSON.parse(request.body)
                res.status(200).render('dashboard', {
                    pageName : "dashboard",
                    jsonData,
                    message : '\0'
                })
            }
            else{
                res.status(200).render('dashboard',{
                    pageName : "home",
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            message : "fail",
        })
    }
}