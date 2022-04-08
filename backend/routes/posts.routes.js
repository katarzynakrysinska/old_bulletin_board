const express = require('express');
const router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  }
})

const upload = multer({ storage })

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts',  upload.single('photo'), async (req, res) => {

  try {
    const { 
      title, 
      text, 
      author, 
      created, 
      updated, 
      status, 
      price, 
      phone, 
      location,
      email
    } = req.body;

    const photo = req.file ? req.file.originalname : '';
    
    if(title && text && email) {

      const textPattern = /^[A-Z|a-z|0-9|_|-| ]{1,}$/;
      const correctTitle = title.match(textPattern).join('');
      const correctText = text.match(textPattern).join('');

      const emailPattern = /^[A-Z|a-z|0-9]+@[A-Z|a-z|0-9]+\.[a-zA-Z]{2,4}$/;
      const correctEmail = email.match(emailPattern).join('');

      if(title === correctTitle && text === correctText && email === correctEmail) {

        const newPost = new Post({ 
        title: title, 
        text: text, 
        author: author,
        created: created, 
        updated: updated, 
        status: status, 
        photo: photo, 
        price: price, 
        phone: phone, 
        email: email,
        location: location });

        await newPost.save();
        res.json({ message: 'New Post Added' });

      } else {
        throw new Error('Wrong input!');
      }
    } else {
      throw new Error('Wrong input!');
    } 
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: err });
  }
});

router.delete('/posts/:id', async (req, res) => {

  try {
    const result = await Post.findById(req.params.id);
    if(result) {
      await Post.deleteOne({ _id: req.params.id });
      res.json( result );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;