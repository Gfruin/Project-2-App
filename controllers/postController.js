// require express, router, and models
const express = require('express');
const router = express.Router();
const Post = require('../models/post'); //may need to change the variable name and multiples
const User = require('../models/user');

//index route
router.get('/', async (req, res) => {
    try {
        const foundPosts = await Post.find({})
        res.render('posts/index.ejs', {
            posts:foundPosts
        })
    } catch(err) {
        res.send(err)
    }

}) //end index route

//new route
// router.get('/new', (req, res, next) => {
//     User.find({}, (err, allUsers) => {
//         if (err) {
//             next(err);
//         } else {
//             res.render('posts/new.ejs') //may need to alter route "post" to "posts"
//             users: allUsers
//         }
//     })
// }) //end of new route
router.get('/new', async (req, res, next) => {
    try {
        const allUsers = await User.find({})
        res.render('posts/new.ejs')
        users: allUsers

    } catch(err) {
        next(err)
    }
})


//create route
router.post('/', async (req, res, next) => {
    console.log('this is the post create route');
    try {
        const createdPost = await Post.create(req.body)
        const foundUser = await User.findById(req.session.userDBId)
        foundUser.posts.push(createdPost);
        const savedUser = await foundUser.save()
        console.log(savedUser, "The user was saved!");
        res.redirect('/posts')

    } catch(err) {
        next(err)
    }


}) //end of create route


// show route
router.get('/:id', async (req, res, next) => {
    try {
        const foundPost = await Post
        .findById(req.params.id)
        .exec()
        res.render('posts/show.ejs', {
            post: foundPost
        })

    } catch(err){
        next(err)
    }
}) //end of show route


// destroy route
router.delete('/:id', async (req, res, next) => {
    try{
        const foundUser = await User.findById(req.session.userDBId).populate('posts')
        const deletedPost = await Post.findByIdAndRemove(req.params.id)
        const removeUserPost = await foundUser.posts.remove(req.params.id);
        const updatedUser = await foundUser.save()
                    console.log(updatedUser);


        res.redirect('/posts');
    } catch(e) {
        next(e)
    }

}) //end of destroy route


//edit route
router.get('/:id/edit', (req, res) => {
    User.find({}, (err, allUsers) => {
        User.findOne({
                'post': req.params.id
            })
            .populate({
                path: 'post',
                match: {
                    _id: req.params.id
                }
            })
            .exec((err, foundPostUser) => {
                console.log(foundPostUser, "<----foundPostUser");
                if (err) {
                    res.send(err)
                } else {
                    res.render('posts/edit.ejs', { //may need to alter route "post" to "posts"
                        posts: foundPostUser.posts[0],
                        users: allUsers,
                        postUser: foundPostUser
                    })
                }
            })
    })
}) //end of edit route

router.get('/:id/edit', async (req, res, next) => {
    try {
        const allUsers = await User.find({})
        User.findOne({
                'post': req.params.id
            })
            .populate({
                path: 'post',
                match: {
                    _id: req.params.id
                }
            })

    } catch(err) {
        next(err)
    }

// //update route
//if the user is changed
//1. then the post goes into a different user's array
//2.  and is removed from the original user's array of articles
// need to find a post and update that post
//then need to find the user and see who changed the post
//need to remove the post from the user 
 //need to redirect
router.put('/:id', (req,res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
        User.findOne({'post': req.params.id}, (err, foundUser) => {
            if(foundUser._id.toString() !== req.body.userId) {
                foundUser.save((err, savedFoundUser) => {
                    User.findById(req.body.userId, (err, newUser) => {
                        newUser.post.push(updatedPost);
                        newUser.save((err, savedNewUser) => {
                            res.redirect('/posts' + req.params.id)
                        })
                   
                    })
                })
            } else {
                res.redirect('/posts/' + req.params.id)
            }
        })
    })
}) //end of update route

//export module

module.exports = router;