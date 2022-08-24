function sanitizeId(value) {
  return ObjectId(value);
}

module.exports.sanitizeId = sanitizeId;
