var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require('fs');
/*var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUsername = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;

var mongoDB = null;*/

var app = express();
var port = process.env.PORT || 3008;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var subs = require('./subData');

app.use(bodyParser.json());

/*app.get('/', function(req, res, next) {
  var subCollection = mongoDB.collection('subs');
  subCollection.find().toArray(funciton (err, subs) {
    if (err) res.status(500).send("Error fetching subs list");
    else if (subs.length > 0) res.status(200).render('homePage', {subList: subs});
    else next();
  });
});*/
app.get('/', function (req, res, next) {
  res.status(200).render('homePage', {subList: subs});
});


/*app.get('/subs/:sub', function (req, res, next) {
  var sub = req.params.sub.toLowerCase();
  var subCollection = mongoDB.collection('subs');
  subCollection.find({subName: sub}).toArray(function (err, subs) {
    if (err) res.status(500).send("Error fetching sub");
    else if (subs.length > 0) res.status(200).render('sub', subs[0]);
    else next();
  });
});*/
app.get('/subs/:sub', function (req, res, next) {
  var sub = req.params.sub.toLowerCase();
  if (subs[sub]) res.status(200).render('sub', subs[sub]);
  else next();
});


/*app.post('/subs/:sub/addPic', function (req, ers, next) {
  var sub = req.params.sub.toLowerCase();
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
        if (err) res.status(500).send("Error inserting Pic");
        else {
          console.log("== mongo insert result: ", result);
          if (result.matchedCount > 0) res.status(200).end();
          else next();
        }
      });
  }
  else res.status(400).send("Request needs JSON body with link and title");
});*/
app.post('/subs/:sub/addPic', function (req, res, next) {
  var sub = req.params.sub.toLowerCase();
  if (subs[sub]) {
    if (req.body && req.body.link && req.body.title) {
      var pic = {
        link: req.body.link,
        title: req.body.title,
        tags: []
      };
      subs[sub].pics.push(pic);
      fs.writeFile('./subData.json', JSON.stringify(subs, null, 2), 'utf8', function (err) {
        if (err) res.status(500).send("Error writing new post to JSON file");
        else res.status(200).end();
      });
    }
    else res.status(400).send("Request needs a JSON body with link and title");
  }
  else next();
});

app.delete('/subs/:sub/deletePic', function(req, res, next) {
  console.log("== attempting a delete");
  var sub = req.params.sub.toLowerCase();
  if (subs[sub]) {
    if (req.body && (req.body.pos <= subs[sub].pics.length)) {
      subs[sub].pics.splice(req.body.pos, 1);
      fs.writeFile('./subData.json', JSON.stringify(subs, null, 2), 'utf8', function (err) {
        if (err) res.status(500).send("Error writing with deleted post to JSON file");
        else res.status(200).end();
      });
    }
    else res.status(400).send("Request needs a JSON body with pos less than length of pics array");
  }
});

app.post('/addSub', function (req, res, next) {
  if (req.body && req.body.subName) {
    if (subs[req.body.subName.replace(/\s/g, '').toLowerCase()]) res.status(400).send("That sub already exists");
    else {
      var sub = {
        subName: req.body.subName,
        pics: []
      };
      subs[req.body.subName.replace(/\s/g, '').toLowerCase()] = sub;
      fs.writeFile('./subData.json', JSON.stringify(subs, null, 2), 'utf8', function (err) {
        if (err) res.status(500).send("Error writing with new sub to JSON file");
        else res.status(200).end();
      });
    }
  }
  else res.status(400).send("Request needs JSON body with subName");
});

app.use(express.static('public'));

app.get('*', function(req, res) {
  res.status(404).render('404');
});


/*MongoClient.connect(mongoUrl, function (err, client) {
  if (err) throw err;
  mongoDB = client.db(mongoDBName);
  app.listen(port, function() {
    console.log("== Server is listening on port ", port);
  });
});*/
app.listen(port, function() {
  console.log("== Server is listening on port ", port);
});
