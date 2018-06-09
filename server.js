var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUsername = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;

var mongoDB = null;

var app = express();
var port = process.env.PORT || 3008;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/subs/:sub', function (req, res, next) {
  var sub = req.params.sub.toLowerCase();
  var subCollection = mongoDB.collection('subs');
  subCollection.find({subName: sub}).toArray(function (err, people) {
    if (err) res.status(500).send("Error fetching sub");
    else if (people.length > 0) res.status(200).render('sub', people[0]);
    else next();
  });
});

app.post('/subs/:sub/addPic', function (req, ers, next) {
  var person = req.params.person.toLowerCase();
  if (req.body && req.body.link && req.body.title) {
    var pic = {
      link: req.body.link,
      title: req.body.title,
      tags: []
    };
    var subCollection = mongoDB.collection('subs');
    subCollection.updateOne(
      { subName: sub },
      { $push: {pics: pic} },
      function (err, result) {
        if (err) res.status(500).send("Error inserting photo");
        else {
          console.log("== mongo insert result: ", result);
          if (result.matchedCount > 0) res.status(200).end();
          else next();
        }
      });
  }
  else res.status(400).send("Request needs JSON body with link and title");
});

app.use(express.static('public'));

app.get('*', function(req, res) {
  res.status(404).render('404');
});

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) throw err;
  mongoDB = client.db(mongoDBName);
  app.listen(port, function() {
    console.log("== Server is listening on port ", port);
  });
});

