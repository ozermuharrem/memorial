module.exports = (req,res,next)=>{
    if(req.path !== '/register') return res.redirect('/');

    next();

}