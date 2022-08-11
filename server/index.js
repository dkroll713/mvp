const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const cf = require('../config.js')
const db = require('./db.js')
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${cf.mongo}/movies`)

const port = 3005;

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.options('*', cors());

const { Schema } = mongoose;
// movie id schema
const movieSchema = new Schema({
  adult: Boolean,
  id: Number,
  original_title: String,
  popularity: Number,
  video: Boolean
})

const Movie = mongoose.model('movies', movieSchema);

app.get('/randomMovie', (req, res) => {
  // console.log(req);

  // get random movie from db
  // let random = db.getRandom();

  let filter = {popularity: {$gt: 5}}

// working
  // Movie.count().exec((err, count) => {
  //   // console.log(count)
  //   let random = Math.floor(Math.random() * count);
  //   Movie.findOne().skip(random).exec((err, doc) => {
  //     console.log(doc)
  //     res.send(doc)
  //   })
  // })

  // Movie.find().where('popularity').gt(50).select('id').exec((err, doc) => {
  //   // console.log(doc);
  //     let random = doc[Math.floor(Math.random() * doc.length)].id;
  //     console.log(random);
  //     Movie.find().where('id').equals(random).exec((err, doc) => {
  //       console.log(doc[0]);
  //       res.send(doc[0]);
  //     })
  // })

  Movie.find().select('id').exec((err, doc) => {
    let random = doc[Math.floor(Math.random() * doc.length)].id;
    Movie.find().where('id').equals(random).exec((err, doc) => {
      console.log(doc[0]);
      res.send(doc[0])
    })
  })
})

const actorSchema = new Schema ({
  adult: Boolean,
  id: Number,
  name: String,
  popularity: Number
})

const Actor = mongoose.model('actors', actorSchema)

app.get('/randomActor', (req, res) => {

  // Actor.find().where('popularity').gt(25).select('id').exec((err, doc) => {
  //   let random = doc[Math.floor(Math.random() * doc.length)].id
  //   console.log(random)
  //   Actor.find().where('id').equals(random).exec((err, doc) => {
  //     console.log(doc[0]);
  //     res.send(doc[0]);
  //   })
  // })

  Actor.find().select('id').exec((err, doc) => {
    let random = doc[Math.floor(Math.random() * doc.length)].id
    console.log(random);
    Actor.find().where('id').equals(random).exec((err, doc) => {
      console.log(doc[0]);
      res.send(doc[0]);
    })
  })

})

app.get('/scores', (req, res) => {
  db.getTop25().exec((err, docs) => {
    res.send(docs);
  })
})

app.post('/score', (req, res) => {
  console.log(req.body)
  db.save(req.body)
  res.send('score saved');
})

app.listen(port, () => {
  console.log(`movie game server listening on port ${port}`)
})