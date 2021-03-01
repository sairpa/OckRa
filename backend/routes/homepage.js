const router = require('express').Router();
let feedback = require('../models/feedback.model');


router.route('/').post((req, res) => {
    var a='username';
    var fuser_name;
    var mail;
    var comments;
    if(req.body.hasOwnProperty(a)){
        const username = req.body.username;
    }
    else{
        fuser_name=req.body.name;
        mail=req.body.mail;
        comments=req.body.comments;
    }
    
    comment_user=new feedback({
        fuser_name,
        mail,
        comments
    })
  
  
    newUser.save()
      .then(() => res.json('comments added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports=router;