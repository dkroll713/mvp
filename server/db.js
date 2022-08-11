const mongoose = require('mongoose');
const cf = require('../config.js')

mongoose.connect(`mongodb://${cf.mongo}/movies`)
.then(() => {
  console.log('connected to mongo: movies')
})

const { Schema } = mongoose;

//high schore schema
const highScoreSchema = new Schema({
  name: String,
  score: Number
})

const HighScore = mongoose.model('highScores', highScoreSchema);

save = (entry) => {
  let current = new HighScore();
  current.name = entry.name;
  current.score = entry.score;
  current.save(current, err => {
    console.log(current);
    if (err) {
      console.log('error entering score');
    } else {
      console.log('score saved');
    }
  })
}

const getTop25 = () => {
  return HighScore.find().sort({score: -1}).limit(25)
}

// // movie id schema
// const movieSchema = new Schema({
//   adult: Boolean,
//   id: Number,
//   original_title: String,
//   popularity: Number,
//   video: Boolean
// })

// const Movie = mongoose.model('movies', movieSchema);

// // get random id
// const getRandom = () => {
//   let rng = null;
//   Movie.count().exec((err, count) => {
//     console.log(count)
//     let random = Math.floor(Math.random() * count);
//     Movie.findOne().skip(random).exec((err, doc) => {
//       return doc
//     })
//   })
// }

module.exports.save = save;
module.exports.getTop25 = getTop25
// module.exports.Movie = Movie;