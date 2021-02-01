/*
    @author: 付伟琪
    @function：
    @date 2021-02-01 10:10
*/

module.exports = (req,res,next)=>{
    if(!req.session.logined || !req.session.loginUser){
        return res.redirect('/login');
    }
    next();
}
