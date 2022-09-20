const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
module.exports.getPostById = getPostById;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;

async function getPosts(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  try {
    // const posts = await Post.find({ user: userId })
    //   .sort({ createdAt: -1 })
    //   .limit(limit)
    //   .skip((page - 1) * limit)
    //   .exec();

    const posts = await Post.aggregate([
      {
        $match: {
          user: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'post',
          as: 'likes',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post',
          as: 'comments',
        },
      },
      {
        $addFields: {
          commentsCount: {
            $size: '$comments',
          },
          likesCount: {
            $size: '$likes',
          },
        },
      },
      {
        $unset: ['comments', 'likes'],
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    const postsCount = await Post.countDocuments({ user: userId }).exec();

    res.status(200).json({
      posts: posts,
      totalCount: postsCount,
      totalPages: Math.ceil(postsCount / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function getPostById(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('user').exec();

    if (!post) {
      return next(createHttpError(404, 'Post does not exist'));
    }

    res.status(200).json(post);
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function createPost(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { caption } = req.body;
  try {
    await Post.create({
      user: req.user._id,
      caption,
      image: {
        name: req.file.filename,
        path: req.file.path,
      },
    });
    return res.status(201).json({
      message: 'Post created',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function updatePost(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { postId } = req.params;
  const { caption } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption },
      { new: true }
    ).exec();
    res.status(200).json(updatedPost);
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function deletePost(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { postId } = req.params;

  try {
    await Post.deleteOne({ _id: postId });
    await Like.deleteMany({ post: postId });
    await Comment.deleteMany({ post: postId });

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
