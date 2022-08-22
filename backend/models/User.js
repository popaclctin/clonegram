const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Email is required'],
    },
    name: {
      first: String,
      last: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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

// Compare the password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
