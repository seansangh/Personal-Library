/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
    
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error'); }//res.send('no book exists')}
        db.collection('books').findOne({_id:ObjectId(bookid)}, function(erra,docs){
          //res.json({_id: docs._id,title: docs.title,comments:[]});
         if(docs==undefined||docs==""||docs==null){res.send('no book exists')}

         if(docs){
          res.json({_id: docs["_id"], title: docs.title, comments: docs.comment});
            console.log('yes')
          }
        })
     })
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    });
  
  
  app.route('/')
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      var comment2; 
    if(req.body.comment==""){
       res.send('Invalid Comment')
       }
    else{
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
       db.collection('books').find({_id:ObjectId(req.body.id)}).toArray(function(err,docs){
         if(docs.length>0){
           
        if(err){console.log('error')}     
        db.collection('books').findOneAndUpdate({_id:ObjectId(req.body.id)},{$push:{comment:comment}},{new:true},function(err,docs){
          //res.json({_id: docs._id,title: docs.title,comments:[]});
          //res.json({_id: docs["_id"], title: docs.title, comments: docs.comment});
        });
        db.collection('books').findOne({_id:ObjectId(req.body.id)},function(err,docs){
          res.json({_id: docs["_id"], title: docs.title, comments: docs.comment});
        });       

         
         }
         else{
         res.send('Invalid id')
         }
       db.close();
         
       })
     })
  }
      //json res format same as .get
    });

    app.route('/api/books/:id')
    .delete(function(req, res){
      var bookid = req.params.id;
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('books').find({_id: ObjectId(bookid)}).toArray(function(err,docs){
        if(docs.length>0){
      db.collection('books').deleteOne({_id: ObjectId(bookid)},function(err,docs){
      if(err){res.send('delete unsuccessful');}
      else{
       res.send('delete successful');
      }
      })
        }
        else{
         res.send('delete unsuccessful');
        }
      })
      
      })
    });
  
  
  
  
  
 app.route('/api/books')
    .get(function (req, res){
    //res.send('yes')
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('books').find({}).toArray(function(err,docs){
      res.send(docs)
              
      })
      db.close();
    }) 
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
     var title = req.body.title;
     var cc= {title: req.body.title, commentcount: 0, comment: []}; 
    if(title=="" || title == null){
      //res.send('missing title');
      res.send('no books exist');

    }
    else{
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('books').insert(cc, function(err,docs){
        if(err){
          return err;
        }

        db.close();
      })
     });
    
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        db.collection('books').findOne(cc, function(err,docs){
          res.json({title:title, _id: docs._id});
          //console.log(docs[0]['title']);
        })
     })
    }
      //response will contain new book object including atleast _id and title
    })

    .delete(function(req, res){
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('books').deleteMany({}, function(err,docs){
      if(err){res.send('complete delete unsuccessful')}
      else{
        res.send('complete delete successful');
      }
      })
      
      })
    
      //if successful response will be 'complete delete successful'
    }); 
  
  
  
  
};
