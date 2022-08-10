const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const db = require('./db.js')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies')

const port = 3005;


app.use(bodyParser.json());
app.use(cors());

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

app.get('/random', (req, res) => {
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

  Movie.find().where('popularity').gt(25).select('id').exec((err, doc) => {
    // console.log(doc);
    Movie.count().exec((err, count) => {
      let random = doc[Math.floor(Math.random() * doc.length)].id;
      console.log(random);
      Movie.find().where('id').equals(random).exec((err, doc) => {
        console.log(doc[0]);
        res.send(doc[0]);
      })
    })
  })

  // Movie.count().exec((err, count) => {
  //   let random = Math.floor(Math.random() * count);
  //   Movie.find().where('id').equals(random)
  //   .where('popularity').gt(5).exec((err, doc) => {
  //     console.log(doc[0]);
  //     res.send(doc[0])
  //   })
  // })

// // experimenting
//   Movie.count().exec((err, count) => {
//     // console.log(count)
//     let random = Math.floor(Math.random() * count);
//     Movie.findOne().where('popularity').gt(10).skip(random).exec((err, doc) => {
//       console.log(doc)
//       res.send(doc)
//     })
//   })

  // console.log('random:', random);

  // res.send('');
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