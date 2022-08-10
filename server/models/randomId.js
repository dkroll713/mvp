const db == require('../db.js');

const getRandom = () => {
  db.aggregate([{ $sample: { size: 1} }])
}

module.exports.getRandom = getRandom;