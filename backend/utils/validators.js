const mongoose = require('mongoose');

function isIdValid(value) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Id is not of type ObjectID');
  }
  return true;
}

module.exports.isIdValid = isIdValid;
