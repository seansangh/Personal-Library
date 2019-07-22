# Personal-Library

*Keeps track of books*

This is an app that allows you to get and post information about books (titles, comments, etc.)


...

**Home Page**

<img src="/PersonalLibrary.PNG" title="home page" alt="home page" width="500px">



---


## Table of Contents 

> Sections
- [Sample Code](#Sample_Code)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)


---

## Sample Code

```javascript
// code

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
```

---

## Installation


### Setup


>  install npm package

```shell
$ npm install
```

- For all of the packages used, refer to the package.json file [here](/package.json).

---

## Features
## Usage (Optional)
## Documentation (Optional)
## Tests (Optional)
## Contributing
## Team

> Contributors/People

| [**seansangh**](https://github.com/seansangh) |
| :---: |
| [![seansangh](https://avatars0.githubusercontent.com/u/45724640?v=3&s=200)](https://github.com/seansangh)    |
| [`github.com/seansangh`](https://github.com/seansangh) | 

-  GitHub user profile

---

## FAQ

- **Have any *specific* questions?**
    - Use the information provided under *Support* for answers

---

## Support

Reach out to me at one of the following places!

- Twitter at [`@wwinvestingllc`](https://twitter.com/wwinvestingllc?lang=en)
- Github at [`seansangh`](https://github.com/seansangh)

---

## Donations (Optional)

- If you appreciate the code provided herein, feel free to donate to the author via [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4VED5H2K8Z4TU&source=url).

[<img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppppcmcvdam.png" alt="Pay with PayPal, PayPal Credit or any major credit card" />](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4VED5H2K8Z4TU&source=url)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a>S.S.</a>
