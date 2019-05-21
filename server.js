var express = require('express');
var bodyParser = require('body-parser');
var quote = require('./models/quote.js');
var mongoose = require('mongoose');
var app = express();

mongoose.connect("mongodb+srv://dinesh:dinesh@cluster0-lmevm.mongodb.net/test?retryWrites=true");

//Change the  database username and password, which you created in mlab

app.set("view engine", "pug");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/viewquotes',function(req,res){
  res.render('landing');
});

app.get('/',function(req,res){
  res.render('viewquotes');
});

app.get('/get/quotes',function(req,res){
  quote.find({},function(err,data){
    res.send(data);
  })
});

app.post('/view/quote/tag/:title',function(req,res){
  quote.find({title: req.params.title} , function(err, searchitems){
    res.render('tags', {quotes: searchitems});
  })
});

app.post('/update/:id/quote',function(req,res){
quote.findOneAndUpdate({_id: req.params.id}, {$set:{body:req.body.body, author:req.body.author}}, {new: true}, (err, doc) => {
    res.render('viewquotes')
});
});

app.post('/delete/:id/quote',function(req,res){
  quote.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.redirect('/viewquotes')
  });
});

app.post('/post',function(req,res){
  var newQuote = new quote();
  newQuote.title = req.body.title;
  newQuote.body = req.body.body;
  newQuote.author = req.body.author;
  newQuote.save(function(err,savedObject){
      if(savedObject)
      {
        res.render('viewquotes')
      }
      else {
        res.send(err);
      }
});
});

app.listen(4000,function(){
  console.log("server is listening on port 4000...");
})
