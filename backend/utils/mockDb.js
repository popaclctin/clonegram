const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

module.exports.connect = connect;
module.exports.disconnect = disconnect;
module.exports.initializeCollections = initializeCollections;
module.exports.dropCollections = dropCollections;

let mongoServer;

async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  connection = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnect() {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
}

async function initializeCollections() {
  await User.insertMany(users);
  await Post.insertMany(posts);
  await Like.insertMany(likes);
  await Comment.insertMany(comments);
}

async function dropCollections() {
  if (mongoServer) {
    // const collections = await mongoose.connection.db.collections();
    // for (let collection of collections) {
    //   await collection.remove();
    // }
    await mongoose.connection.db.dropDatabase();
  }
}

//DATA

const users = [
  {
    _id: '6303689411cdee29266d8ce1',
    email: 'lica@gmail.com',
    username: 'lica12',
    name: {
      first: 'Lica',
      last: 'Samadau',
    },
    password: '$2b$10$8xC2vpr2o.GmwX74bT5okezs8kaZqHRAfRERGZo/1Cw.TMtVW6xGy',
    followers: ['6309ade702c38e10ef6d4cee'],
    following: ['6309ade702c38e10ef6d4cee', '6309b912fdcb57c4e6a504ed'],
  },
  {
    _id: '6309ade702c38e10ef6d4cee',
    email: 'misaescu@gmail.com',
    username: 'misa_putere',
    name: {
      first: 'Mihai',
      last: 'Eminescu',
    },
    password: '$2b$10$8xC2vpr2o.GmwX74bT5okezs8kaZqHRAfRERGZo/1Cw.TMtVW6xGy',
    followers: [],
    following: ['6309b912fdcb57c4e6a504ed'],
  },
  {
    _id: '6309b912fdcb57c4e6a504ed',
    email: 'corina@gmail.com',
    username: 'coco',
    name: {
      first: 'Corina',
      last: 'Clement',
    },
    password: '$2b$10$8xC2vpr2o.GmwX74bT5okezs8kaZqHRAfRERGZo/1Cw.TMtVW6xGy',
    followers: ['6303689411cdee29266d8ce1'],
    following: ['6309ade702c38e10ef6d4cee'],
  },
];

const posts = [
  {
    _id: '6309b03c04328343d274b093',
    user: '6303689411cdee29266d8ce1',
    caption: 'Vreau bani',
    image_path:
      'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg',
    likes: [],
    comments: [],
  },
  {
    _id: '6309b05404328343d274b095',
    user: '6303689411cdee29266d8ce1',
    caption: 'Te trage curentul',
    image_path:
      'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg',
    likes: [],
    comments: [],
  },
  {
    _id: '6309b07d04328343d274b097',
    user: '6309ade702c38e10ef6d4cee',
    caption: 'A fost o data...',
    image_path:
      'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg',
    likes: [],
    comments: [],
  },
  {
    _id: '6309b09204328343d274b099',
    user: '6309ade702c38e10ef6d4cee',
    caption: 'Vara nu dorm',
    image_path:
      'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg',
    likes: [],
    comments: [],
  },
  {
    _id: '6309b933fdcb57c4e6a504ef',
    user: '6309b912fdcb57c4e6a504ed',
    caption: 'O maimuta cu pistolul',
    image_path:
      'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg',
    likes: [],
    comments: [],
  },
  {
    _id: '6309b93afdcb57c4e6a504f1',
    user: '6309b912fdcb57c4e6a504ed',
    caption: 'Oaie cu cabina',
    image_path:
      'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg',
    likes: [],
    comments: [],
  },
];

const likes = [
  {
    user: '6303689411cdee29266d8ce1',
    post: '6309b03c04328343d274b093',
  },
  {
    user: '6303689411cdee29266d8ce1',
    post: '6309b93afdcb57c4e6a504f1',
  },
  {
    user: '6309ade702c38e10ef6d4cee',
    post: '6309b03c04328343d274b093',
  },
  {
    user: '6309b912fdcb57c4e6a504ed',
    post: '6309b05404328343d274b095',
  },
];

const comments = [
  {
    user: '6303689411cdee29266d8ce1',
    post: '6309b03c04328343d274b093',
    content: 'Imi place sa-mi comentez propria postare!',
  },
  {
    user: '6303689411cdee29266d8ce1',
    post: '6309b07d04328343d274b097',
    content: 'A fost o data poate la mine in sat',
  },
];
