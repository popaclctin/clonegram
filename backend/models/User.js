const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { saltRounds } = require('../configuration/config');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      first: String,
      last: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        },
      },
    },
    timestamps: true,
  }
);

//Adds virtuals to the JSON object of a User document
userSchema.set('toJSON', { virtuals: true });

// Compare the password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// Hash the password before saving the document
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
