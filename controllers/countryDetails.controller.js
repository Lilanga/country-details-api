const winstonLogger = require('../config/winston.config');
const {
  createCountryDetail, findCountryByName, getAllContryDetails, removeCountryByName,
} = require('../services/countryDetails.service');

// Create country detail using given payload
exports.createContryDetail = (req, resp) => {
  const { name, gmtOffset } = req.body;
  if (!name || !gmtOffset) {
    winstonLogger.error('missing parameter: name and gmtOffset cannot be empty.');
    resp.status(400).send({
      message: 'missing parameter: name and gmtOffset cannot be empty.',
    });
    return;
  }

  createCountryDetail(name, gmtOffset).then((data) => { resp.status(201).send({ message: `CountryDetails of ${data.name} created successfully.` }); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

// find a country details by given country name
exports.findCountryDetailsByName = (req, resp) => {
  const { name } = req.params;

  if (!name) {
    winstonLogger.error('Missing parameter: name cannot be empty');
    resp.status(400).send({
      message: 'name cannot be empty!',
    });
    return;
  }

  findCountryByName(name).then((country) => {
    if (country) {
      resp.send(country);
    } else {
      resp.status(404).send({ message: `requested country: ${name} is not found` });
    }
  }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

// retrive all countries in the data store
exports.getAllCountryDetails = (req, resp) => {
  getAllContryDetails().then((countries) => { resp.send(countries); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

// remove country by given name
exports.removeCountryDetailByName = (req, resp) => {
  const { name } = req.query;

  if (!name) {
    winstonLogger.error('Missing parameter: name cannot be empty');
    resp.status(400).send({
      message: 'name cannot be empty!',
    });
    return;
  }

  removeCountryByName(name).then((status) => { resp.send(status); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};
