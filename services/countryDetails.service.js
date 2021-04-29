const db = require('../models');

const { countryDetails } = db;

// create new country detail entry using given information
exports.createCountryDetail = (name, gmtOffset) => new Promise((resolve, reject) => {
  if (!name || !gmtOffset) {
    reject(new Error('missing parameter: name and gmt offset cannot be empty.'));
  }

  const countryDetail = {
    name,
    gmtOffset,
  };

  countryDetails.create(countryDetail).then((data) => resolve(data))
    .catch((err) => { reject(err); });
});

// find country using given name
exports.findCountryByName = (name) => new Promise((resolve, reject) => {
  if (!name) {
    reject(new Error('Missing parameter: name cannot be empty'));
  }

  countryDetails.findByPk(name)
    .then((data) => resolve(data))
    .catch((err) => {
      reject(err);
    });
});

// retrive all countries
exports.getAllContryDetails = () => new Promise((resolve, reject) => {
  countryDetails.findAll()
    .then((data) => resolve(data))
    .catch((err) => {
      reject(err);
    });
});

// remove country from the data store
exports.removeCountryByName = (name) => new Promise((resolve, reject) => {
  if (!name) {
    reject(new Error('Missing parameter: name cannot be empty'));
  }

  countryDetails.destroy({
    where: { name },
  }).then((num) => {
    if (num === 1) {
      resolve({ message: 'Country was deleted successfully!' });
    }
    reject(new Error(`Cannot delete country with name=${name}.`));
  })
    .catch((err) => {
      reject(err);
    });
});
