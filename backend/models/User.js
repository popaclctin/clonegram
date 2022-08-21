const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    createdAt: {
      type: Date,
      default: Date.now,
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
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
