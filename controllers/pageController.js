const request = require('request');
const session = require('express-session');

exports.getIndexPage = (req,res)=>{
try {
    let jsonData;
    console.log(userIN);
    request.get(apiUrl + '/books', (err,request,body)=>{
        if(!err){
            jsonData = JSON.parse(request.body)
            res.status(200).render('index', {
                pageName : "home",
                jsonData
            })
        }
        else{
            res.status(200).render('index',{
                pageName : "home",
                jsonData : "\0"
            })
        }
    })
  
} catch (error) {
    res.status(400).json({
        message : "fail",
        error
    })
}
}

exports.getSinglePage = (req,res) =>{
    try {
        console.log(req.params.id)
        request.get(apiUrl + '/books/'+req.params.id, (err,request,body)=>{
            jsonData = JSON.parse(request.body)
            console.log(jsonData)
          
            if(!err){
                res.status(200).render('books', {
                    pageName : "books",
                    jsonData
                })
            }
            else
                throw "fail"
        })
    } catch (error) {
        res.status(400).json({
            message : "fail",
            error
        })
    }
}

exports.registerPage = (req,res)=>{
    try {

    console.log(req.path);

        res.status(200).render("register", {
            pageName : "register"
        })
    } catch (error) {
        res.status(400).json({
            message : "fail",
            error
        })
    }
}

exports.loginPage = (req,res)=>{
    try {
        res.status(200).render("login", {
            pageName : "login"
        })
    } catch (error) {
        res.status(400).json({
            message : "fail",
            error
        })
    }
}

exports.deleteBook = (req,res)=>{
    try {
        console.log(req.params._id)
        console.log(global.coin)

        request.delete({
            url : apiUrl + "/books/"+ req.params._id,
            headers: {
                'Authorization': 'Bearer ' + coin.token
              }
            },function(error,response,body){
                if(!error)
                {
                    res.status(200).redirect('/users/dashboard');
                }
                else
                    throw response.body.message;
            });
    } catch (error) {
        res.status(400).json({
            message : "fail",
            error
        })
    }
}

exports.updateBook = (req,res) => {
    try {
        console.log(req.bod);
        console.log(req.params._id);
        request.put({
            url : apiUrl + "/books/"+ req.params._id,
            json : {title : req.body.title, description : req.body.description, author : req.body.author, year : req.body.year, cover : req.body.cover},
            headers: {
                'Authorization': 'Bearer ' + coin.token
              }
            },function(error,response,body){
                if(!error && response.statusCode == 201)
                {
                    req.flash("updateSuccessful", "Update Successful");
                    res.redirect('/users/dashboard',200,{
                    
                    });
                }
                else{
                req.flash("updateFailed", response.body.message);
                res.redirect('/users/dashboard',400,{
                    
                 })
                }
            });
    } catch (error) {
        res.status(400).json({
            message : "fail",
            error
        })
        console.log(error)
    }
}
exports.createBook = async(req,res)=>{
    try {
        request.post({
            url: apiUrl + '/books', 
            json : {title : req.body.title, description : req.body.description, author : req.body.author, year : req.body.year, cover : req.body.cover},
            headers: {
              'Authorization': 'Bearer ' + coin.token
            }
          }, function(error, response, body) {
            if(!error && response.statusCode == 201)
            {   
                req.flash("createSuccessful", "Created Successful");
                res.status(200).redirect('/users/dashboard');
            }
            else{
                req.flash("createFailed", "Created Fail");
                res.status(400).redirect('/users/dashboard');
               
            }
          });
    } catch (error) {
        res.redirect('/users/dashboard', 400, {
            message : "fail",
            error
        });
        
    }
}