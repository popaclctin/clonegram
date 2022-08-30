const ObjectId = require('mongoose').Types.ObjectId;

function sanitizeId(value) {
  return new ObjectId(value);
}

module.exports.sanitizeId = sanitizeId;
