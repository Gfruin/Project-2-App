// require express, router, and models
const express = require('express');
const router = express.Router();
const Post = require('../models/post'); //may need to change the variable name and multiples
const User = require('../models/user');
const Comment = require('../models/comment')
//index route
router.get('/', (req, res) => {
    console.log('<-------------Hit the index route');
    //need to display the posts that have been created
    Post.find({}, (err, foundPosts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('posts/index.ejs', {
                posts: foundPosts
            })

        }
    })
}) //end of index route
//new route
router.get('/new', (req, res, next) => {
    User.find({}, (err, allUsers) => {
        if (err) {
            next(err);
        } else {
            res.render('posts/new.ejs') //may need to alter route "post" to "posts"
            users: allUsers
        }
    })
}) //end of new route
//create route
router.post('/', (req, res) => {
    console.log('this is the post create route');


    const newPost = {
        title: req.body.title, 
        description: req.body.description,
        tags: [],
    } 
        console.log(newPost);
    if(req.body.buy === 'on'){
        newPost.tags.push("buy")
            console.log(newPost);
    }

    if(req.body.sell === 'on'){
        newPost.tags.push("sell")
    }

    if(req.body.free === 'on'){
        newPost.tags.push("free")
    }
    Post.create(newPost, (err, createdPost) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body)
            /// find the correct user and push into their array
            console.log(req.session);
            User.findById(req.session.userDBId, (err, foundUser) => {
                console.log(foundUser, 'here is the user ');
                foundUser.posts.push(createdPost);
                foundUser.save((err, savedUser) => {
                    console.log(savedUser, "saved a user");
                    res.redirect('/posts')

                })
            })
            //
        }
    })
}) //end of create route

// show route

router.get('/:id', (req, res, next) => {
    Post
        .findById(req.params.id)
        .populate({
            // THANK YOU: https://stackoverflow.com/a/33669169
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec((err, foundPost) => {
            if (err) next(err);
            else {
                console.log("----------");
                console.log(foundPost);
                res.render('posts/show.ejs', { // render show template -- we render templates
                    post: foundPost // this contains the ID
               })
            }
        })

})
//end of show route

// destroy route
router.delete('/:id', async (req, res, next) => {
    if(req.session.userDBId == null) {
        res.redirect('/auth/login')
    } else {
        try{
            const foundUser = await User.findById(req.session.userDBId).populate('posts')
            const deletedPost = await Post.findByIdAndRemove(req.params.id)
            const removeUserPost = await foundUser.posts.remove(req.params.id);
            const updatedUser = await foundUser.save()
                    console.log(updatedUser);


            res.redirect('/posts');
    }   catch(e) {
        next(e)
    }
    }
}) //end of destroy route
//edit route
router.get('/:id/edit', async (req, res, next) => {
    if(req.session.userDBId == null) {
        res.redirect('/auth/login')
    } else {

    User.find({}, (err, allUsers) => {
        User.findById(req.session.userDBId)
            .populate({
                path: 'posts',
                match: {
                    _id: req.params.id // get post that matches the post Id user is trying to edit
                }
            })
            .exec((err, foundPostUser) => {
                console.log("\n here is foundPostUser in show route"); 
                console.log(foundPostUser);
            
                if (err) {
                    // res.redirect('/auth/login')
                    next(err)
                } else {
                    res.render('posts/edit.ejs', { //may need to alter route "post" to "posts"
                        post: foundPostUser.posts[0],
                        users: allUsers,
                        postUser: foundPostUser
                    })
                }
            
            })
        })
    } //first else statement end
})

// //update route

router.put('/:id', async (req, res, next) => {

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // set fields on updateDpost according to req.bodyt
        updatedPost.title = req.body.title
        updatedPost.description = req.body.description
        await updatedPost.save()
        //send back to show page
        res.redirect('/posts/' + req.params.id)

    } catch(err) {
        next(err)
    }
}) //end of update route




//export module

module.exports = router;