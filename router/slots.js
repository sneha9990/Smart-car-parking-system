const express = require('express')
const path =require('path')
const router = express.Router() ;

router.get('/' , (req,res)=> {
    res.render('signup')
})
router.get('/home' , (req,res)=> {
    res.render('home')
})
router.get('/signin' , (req,res)=> {
    res.render('signin')
})
router.get('/booking' , (req,res)=> {
    res.render('booking')
})



router.get('/slots' , (req,res)=> {
    res.render('slot' ) ;
})


router.get('/contact' , (req,res)=> {
    res.render('contact' ) ;
})
router.get('/about' , (req,res)=> {
    res.render('about' ) ;
})
router.get('/feedback' , (req,res)=> {
    res.render('feedback' ) ;
})
router.post('/contact' , (req,res)=>{
    // var myData = new contact(req.body) ;
    // myData.save().then(()=>{
    //    res.send("submission has been saved to database")
    // }).catch(()=>{
    //    res.status(404).send("Failed to save the submission to database")
    // }) ;
    res.send("Your submission has been recorded")
})


module.exports = router ;