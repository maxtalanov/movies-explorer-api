const mongoose = require('mongoose');
const { regUrl } = require('../utils/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  director: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Неправильный формат URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Неправильный формат URL',
    }, // переместить в ф-ию и в коде ниже
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Неправильный формат URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Неправильный формат URL',
    },
  },
  owner: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
